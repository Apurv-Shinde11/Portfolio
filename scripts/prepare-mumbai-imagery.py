"""Reproduce the development imagery review with existing Python GIS/image tools.

Uses Pillow, numpy, scipy, pyproj and shapely already present in the workstation.
No whole-scene TIFF download: only the necessary public COG overview tiles.
Source downloads are cached in the OS temporary directory, outside the repository.
"""
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from hashlib import sha256
from io import BytesIO
from pathlib import Path
from base64 import b64encode
from xml.sax.saxutils import escape
import json
import math
import tempfile
import urllib.request
import zlib

import numpy as np
from PIL import Image, ImageEnhance
from pyproj import Transformer
from scipy.ndimage import map_coordinates
from shapely.geometry import shape, mapping, Point
from shapely.ops import transform, unary_union

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "mumbai-imagery"
DATA = ROOT / "data" / "mumbai-imagery"
CACHE = Path(tempfile.gettempdir()) / "portfolio-sentinel-cogs"
API = "https://earth-search.aws.element84.com/v1"
DATES = [("20251227", "S2C"), ("20260225", "S2C"), ("20260312", "S2B")]
# Metres in WGS84 / UTM 43N: square ground pixels, not a stretched viewport crop.
BOUNDS = [264000, 2089000, 290000, 2135000]
HEIGHT = 2048
WIDTH = round(HEIGHT * (BOUNDS[2]-BOUNDS[0]) / (BOUNDS[3]-BOUNDS[1]))
WARD_URL = "https://raw.githubusercontent.com/datameet/Municipal_Spatial_Data/c0e247f8e2ea3222965c445154122ab06ff49857/Mumbai/BMC_Wards.geojson"
LABELS = [
    {"name": "Mumbai", "lat": 19.08206655074858, "lng": 72.8780322242897, "source": "Historical BMC envelope centre; composition label, not an official city centroid"},
    {"name": "Borivali", "lat": 19.23496, "lng": 72.85976, "source": "https://www.geonames.org/1275248"},
    {"name": "Andheri", "lat": 19.130862, "lng": 72.852583, "source": "https://www.geonames.org/search.html?q=Mumbai"},
    {"name": "Bandra", "lat": 19.0666667, "lng": 72.8333333, "source": "https://www.geonames.org/1332494/bandra.html"},
    {"name": "Colaba", "lat": 18.906944, "lng": 72.810556, "source": "https://www.geonames.org/1273862/colaba.html"},
]


def fetch(url, start=None, size=None):
    """Persist only network cache outside the repository; validate range responses."""
    key = sha256(f"{url}:{start}:{size}".encode()).hexdigest()
    cached = CACHE / key
    if cached.exists():
        return cached.read_bytes()
    headers = {"User-Agent": "Portfolio-Mumbai-imagery-review/1.0"}
    if start is not None:
        headers["Range"] = f"bytes={start}-{start+size-1}"
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=90) as response:
        if start is not None and (response.status != 206 or not response.headers.get("Content-Range", "").startswith(f"bytes {start}-")):
            raise RuntimeError("Server did not honor a byte-range request")
        data = response.read()
    if start is not None and len(data) != size:
        raise RuntimeError("Incomplete COG range")
    cached.write_bytes(data)
    return data


def cog_window(asset, x, y, classification=False):
    """Read only needed Deflate TIFF tiles. Fail rather than guess TIFF semantics."""
    url = asset["href"]
    header = fetch(url, 0, 131072)
    with Image.open(BytesIO(header)) as image:
        # First overview is ~20m TCI. SCL is already 20m: use its base image.
        if not classification:
            image.seek(1)
        tags = image.tag_v2
        width, height = image.size
        samples = tags.get(277, 1)
        bits = tuple(tags.get(258, (8,)))
        if tags.get(259) != 8 or tags.get(284, 1) != 1 or any(b != 8 for b in bits):
            raise RuntimeError("Unsupported TIFF encoding; do not silently misdecode")
        tile_w, tile_h = tags[322], tags[323]
        offsets, sizes = tags[324], tags[325]
        predictor = tags.get(317, 1)
        if predictor not in (1, 2):
            raise RuntimeError("Unsupported TIFF predictor")
    # Metadata transform describes base pixels; overviews cover the same footprint.
    a, _, origin_x, _, e, origin_y = asset["proj:transform"]
    base_h, base_w = asset["proj:shape"]
    px = (x-origin_x)/(a*base_w/width)-.5
    py = (y-origin_y)/(e*base_h/height)-.5
    valid = (px >= 0) & (px <= width-1) & (py >= 0) & (py <= height-1)
    if not np.any(valid):
        return None, valid
    left = max(0, int(np.floor(px[valid].min())))
    right = min(width, int(np.ceil(px[valid].max()))+2)
    top = max(0, int(np.floor(py[valid].min())))
    bottom = min(height, int(np.ceil(py[valid].max()))+2)
    tx0, ty0 = left//tile_w, top//tile_h
    tx1, ty1 = (right-1)//tile_w, (bottom-1)//tile_h
    mosaic = np.zeros(((ty1-ty0+1)*tile_h, (tx1-tx0+1)*tile_w, samples), dtype=np.uint8)
    columns = math.ceil(width/tile_w)
    coords = [(tx, ty) for ty in range(ty0, ty1+1) for tx in range(tx0, tx1+1)]

    def read_tile(coord):
        tx, ty = coord
        index = ty*columns+tx
        raw = zlib.decompress(fetch(url, offsets[index], sizes[index]))
        tile = np.frombuffer(raw, dtype=np.uint8).reshape(tile_h, tile_w, samples)
        if predictor == 2:
            tile = np.cumsum(tile, axis=1, dtype=np.uint8)
        return tx, ty, tile

    with ThreadPoolExecutor(max_workers=4) as pool:
        for tx, ty, tile in pool.map(read_tile, coords):
            mosaic[(ty-ty0)*tile_h:(ty-ty0+1)*tile_h, (tx-tx0)*tile_w:(tx-tx0+1)*tile_w] = tile
    sample_x = px-tx0*tile_w
    sample_y = py-ty0*tile_h
    result = np.stack([map_coordinates(mosaic[:, :, c], [sample_y, sample_x], order=0 if classification else 1, mode="nearest", prefilter=False) for c in range(samples)], axis=-1)
    return result, valid


def save_webp(image, path):
    image.save(OUT / path, "WEBP", quality=90, method=6)
    return {"path": f"/mumbai-imagery/{path}", "width": image.width, "height": image.height, "bytes": (OUT/path).stat().st_size, "sha256": sha256((OUT/path).read_bytes()).hexdigest()}


def save_overlay_previews(rings):
    """Portable SVG previews embed the chosen image; licences remain per layer."""
    raster = b64encode((OUT / "20251227-desktop.webp").read_bytes()).decode("ascii")
    paths = "".join('<path d="M' + "L".join(f"{x},{y}" for x, y in ring) + 'Z"/>' for ring in rings)
    labels = ""
    for label in LABELS:
        x, y = label["x"], label["y"]
        text_x = x-20 if label["name"] == "Bandra" else x+20
        anchor = "end" if label["name"] == "Bandra" else "start"
        size = 88 if label["name"] == "Mumbai" else 76
        name = "MUMBAI" if label["name"] == "Mumbai" else label["name"]
        labels += f'<circle cx="{x}" cy="{y}" r="9" fill="white"/><text x="{text_x}" y="{y-18}" text-anchor="{anchor}" font-size="{size}">{escape(name)}</text>'
    for kind in ["historical-outline", "labels"]:
        svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}" role="img" aria-labelledby="title description">
<title id="title">Mumbai, 27 December 2025: historical municipal {kind} preview</title>
<desc id="description">Full northern-to-southern Mumbai crop. Historical DataMeet outline is not current official limits. Surrounding land is context.</desc>
<metadata>Imagery: Contains modified Copernicus Sentinel data 2025; https://cds.climate.copernicus.eu/licences/ec-sentinel . Boundary: Pune chapter of the DataMeet Trust, Bangalore, India; dissolved/projected derivative CC BY-SA 2.5 India; https://creativecommons.org/licenses/by-sa/2.5/in/ . Locality anchors: GeoNames CC BY. These layers retain separate licences. See README.md and data/mumbai-imagery/review.json for provenance.</metadata>
<image href="data:image/webp;base64,{raster}" width="{WIDTH}" height="{HEIGHT}"/>
<g fill="none" stroke="#f8dfa6" stroke-width="5" stroke-linejoin="round">{paths}</g>
<g fill="white" font-family="Arial,sans-serif" font-weight="600" stroke="#0a1420" stroke-width="10" stroke-linejoin="round" paint-order="stroke">{labels if kind == "labels" else ""}</g>
</svg>'''
        (OUT / f"20251227-{kind}.svg").write_text(svg, encoding="utf8")


def main():
    for directory in (OUT, DATA, CACHE):
        directory.mkdir(parents=True, exist_ok=True)
    # Permit this known 10980-square metadata header, without loading a full image.
    Image.MAX_IMAGE_PIXELS = 130000000
    to_utm = Transformer.from_crs("OGC:CRS84", "EPSG:32643", always_xy=True)
    to_geo = Transformer.from_crs("EPSG:32643", "OGC:CRS84", always_xy=True)
    ward_source = json.loads(fetch(WARD_URL))
    polygons = [shape(f["geometry"]) for f in ward_source["features"]]
    if len(polygons) != 24 or not all(g.is_valid for g in polygons):
        raise RuntimeError("Unexpected historical ward geometry")
    municipal = unary_union(polygons)
    projected = transform(to_utm.transform, municipal)
    minx, miny, maxx, maxy = projected.bounds
    if not (BOUNDS[0] < minx and BOUNDS[1] < miny and BOUNDS[2] > maxx and BOUNDS[3] > maxy):
        raise RuntimeError("Crop omits part of the historical municipal union")
    derived = {"type": "FeatureCollection", "name": "Historical DataMeet BMC ward union; not current official limits", "source": WARD_URL, "license": "https://creativecommons.org/licenses/by-sa/2.5/in/", "features": [{"type": "Feature", "properties": {"source_file_commit_date": "2016-08-19", "processing": "Union of all 24 valid ward multipolygons; no simplification or filled gaps", "parts": len(municipal.geoms)}, "geometry": mapping(municipal)}]}
    derived["attribution"] = "Pune chapter of the DataMeet Trust, Bangalore, India"
    (DATA / "historical-boundary.geojson").write_text(json.dumps(derived, separators=(",", ":")), encoding="utf8")
    # Compact projected rings for the review SVG. All disconnected parts survive.
    rings = []
    for polygon in projected.geoms:
        for ring in [polygon.exterior, *polygon.interiors]:
            rings.append([[round((x-BOUNDS[0])/(BOUNDS[2]-BOUNDS[0])*WIDTH, 3), round((BOUNDS[3]-y)/(BOUNDS[3]-BOUNDS[1])*HEIGHT, 3)] for x, y in ring.coords])
    for label in LABELS:
        x, y = to_utm.transform(label["lng"], label["lat"])
        label["x"] = (x-BOUNDS[0])/(BOUNDS[2]-BOUNDS[0])*WIDTH
        label["y"] = (BOUNDS[3]-y)/(BOUNDS[3]-BOUNDS[1])*HEIGHT
        label["insideHistoricalUnion"] = municipal.covers(Point(label["lng"], label["lat"]))
    x = BOUNDS[0]+(np.arange(WIDTH)+.5)*(BOUNDS[2]-BOUNDS[0])/WIDTH
    y = BOUNDS[3]-(np.arange(HEIGHT)+.5)*(BOUNDS[3]-BOUNDS[1])/HEIGHT
    xx, yy = np.meshgrid(x, y)
    candidates = []
    for date, platform in DATES:
        sources = []
        rgb = np.zeros((HEIGHT, WIDTH, 3), dtype=np.uint8)
        classification = np.zeros((HEIGHT, WIDTH), dtype=np.uint8)
        covered = np.zeros((HEIGHT, WIDTH), dtype=bool)
        # North tile has priority in overlap; south only supplies the missing strip.
        for grid in ["43QBB", "43QBA"]:
            scene = f"{platform}_{grid}_{date}_0_L2A"
            item_url = f"{API}/collections/sentinel-2-l2a/items/{scene}"
            item = json.loads(fetch(item_url))
            if item["properties"]["proj:epsg"] != 32643:
                raise RuntimeError("Unexpected CRS")
            (DATA / f"{scene}.json").write_text(json.dumps(item, indent=2), encoding="utf8")
            pixels, valid = cog_window(item["assets"]["visual"], xx, yy)
            scl, scl_valid = cog_window(item["assets"]["scl"], xx, yy, classification=True)
            use = valid & scl_valid & ~covered
            if pixels is not None:
                if np.any(scl[:, :, 0][use] == 0):
                    raise RuntimeError(f"No-data pixels within selected crop: {scene}, SCL0={np.count_nonzero(scl[:, :, 0][use] == 0)}")
                rgb[use] = pixels[use]
                classification[use] = scl[:, :, 0][use]
            covered |= use
            sources.append({"id": scene, "datetime": item["properties"]["datetime"], "product": item["properties"]["s2:product_uri"], "datatake": item["properties"]["s2:datatake_id"], "itemUrl": item_url, "visualUrl": item["assets"]["visual"]["href"], "sceneCloudPercent": item["properties"]["eo:cloud_cover"]})
        if not np.all(covered) or sources[0]["datatake"] != sources[1]["datatake"]:
            raise RuntimeError("Incomplete crop or mixed overpasses")
        raw = Image.fromarray(rgb)
        # Deliberately restrained, global adjustments; no local edits or sharpening.
        lut = [round(255*(v/255)**(1/1.05)) for v in range(256)]
        corrected = ImageEnhance.Color(ImageEnhance.Contrast(raw.point(lut*3)).enhance(1.04)).enhance(1.03)
        candidate = {"date": f"{date[:4]}-{date[4:6]}-{date[6:]}", "sources": sources, "raw": save_webp(raw, f"{date}-source-rgb.webp"), "desktop": save_webp(corrected, f"{date}-desktop.webp"), "mobile": save_webp(corrected.resize((round(WIDTH/2), HEIGHT//2), Image.Resampling.LANCZOS), f"{date}-mobile.webp"), "cropSclPercent": {str(c): round(float(np.mean(classification == c)*100), 6) for c in range(12)}}
        candidates.append(candidate)
        print(json.dumps(candidate), flush=True)
    corners = [list(to_geo.transform(x, y)) for x, y in [(BOUNDS[0], BOUNDS[3]), (BOUNDS[2], BOUNDS[3]), (BOUNDS[2], BOUNDS[1]), (BOUNDS[0], BOUNDS[1])]]
    manifest = {"generatedAt": datetime.now(timezone.utc).isoformat(), "width": WIDTH, "height": HEIGHT, "crs": "EPSG:32643", "boundsMetres": BOUNDS, "geographicCornersNW_NE_SE_SW": corners, "historicalBoundaryParts": len(municipal.geoms), "boundaryRings": rings, "labels": LABELS, "candidates": candidates, "rejected": [{"date": "2026-01-16", "scene": "S2C_43QBA_20260116_0_L2A", "reason": "63690 sampled crop pixels classified SCL 0 (no data) in southern fill; not repaired or substituted"}], "processing": {"bands": "Source true-colour image: B04 (red), B03 (green), B02 (blue), producer-rendered uint8, not raw reflectance", "resampling": "Bilinear sampling from first TCI COG overview (~20m); nearest-neighbour SCL; Lanczos mobile downsample", "projection": "No reprojection: both source tiles and output are EPSG:32643. Geographic overlays transformed from CRS84 using pyproj always_xy=True. North-up metric grid with square ground pixels (rounded output width).", "color": "Source RGB retained separately; candidate: common gamma 1/1.05, Pillow contrast 1.04 then colour 1.03. No sharpening, compositional edits or AI.", "seam": "43QBB priority; same-datatake 43QBA fills only south strip below north tile footprint", "compression": "WebP quality 90, method 6"}}
    manifest["recommendedDate"] = "2025-12-27"
    manifest["overlayPreviews"] = ["/mumbai-imagery/20251227-historical-outline.svg", "/mumbai-imagery/20251227-labels.svg"]
    save_overlay_previews(rings)
    (DATA / "review.json").write_text(json.dumps(manifest, separators=(",", ":")), encoding="utf8")


if __name__ == "__main__":
    main()
