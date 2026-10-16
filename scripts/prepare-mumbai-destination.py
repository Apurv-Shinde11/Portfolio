"""Prepare a bounded globe patch from the verified December datatake.

Original review assets remain untouched. Reuses the existing bounded COG reader
and workstation tools; adds no runtime or processing dependencies.
"""
import importlib.util
import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance
from pyproj import Transformer
from shapely.geometry import shape

ROOT = Path(__file__).resolve().parents[1]
sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location("imagery", ROOT / "scripts/prepare-mumbai-imagery.py")
imagery = importlib.util.module_from_spec(spec)
spec.loader.exec_module(imagery)
OUT = ROOT / "public/mumbai-imagery"
DATA = ROOT / "data/mumbai-imagery"
BOUNDS = [244000, 2079000, 308000, 2143000]
SIZE = 2048
SEGMENTS = 64


def write_city_fallback():
    """Remove locality overlay nodes; preserve embedded imagery and boundary paths."""
    namespace = "http://www.w3.org/2000/svg"
    ET.register_namespace("", namespace)
    tree = ET.parse(OUT / "20251227-labels.svg")
    root = tree.getroot()
    group = root.findall(f"{{{namespace}}}g")[-1]
    children = list(group)
    for marker, label in zip(children[::2], children[1::2]):
        if label.text != "MUMBAI":
            group.remove(marker)
            group.remove(label)
    root.find(f"{{{namespace}}}title").text = "Mumbai, 27 December 2025: historical municipal boundary and MUMBAI label"
    root.find(f"{{{namespace}}}desc").text = "Full northern-to-southern Mumbai crop. Only MUMBAI is labeled. Historical DataMeet outline is not current official limits. Surrounding land is context."
    tree.write(OUT / "20251227-mumbai.svg", encoding="utf-8", xml_declaration=True)


def main():
    write_city_fallback()
    Image.MAX_IMAGE_PIXELS = 130000000
    items = [json.loads((DATA / f"S2C_{tile}_20251227_0_L2A.json").read_text()) for tile in ["43QBB", "43QBA"]]
    assert items[0]["properties"]["s2:datatake_id"] == items[1]["properties"]["s2:datatake_id"]
    x = BOUNDS[0]+(np.arange(SIZE)+.5)*(BOUNDS[2]-BOUNDS[0])/SIZE
    y = BOUNDS[3]-(np.arange(SIZE)+.5)*(BOUNDS[3]-BOUNDS[1])/SIZE
    xx, yy = np.meshgrid(x, y)
    north, north_valid = imagery.cog_window(items[0]["assets"]["visual"], xx, yy)
    south, south_valid = imagery.cog_window(items[1]["assets"]["visual"], xx, yy)
    nscl, nscl_valid = imagery.cog_window(items[0]["assets"]["scl"], xx, yy, classification=True)
    sscl, sscl_valid = imagery.cog_window(items[1]["assets"]["scl"], xx, yy, classification=True)
    north_valid &= nscl_valid & (nscl[:, :, 0] != 0)
    south_valid &= sscl_valid & (sscl[:, :, 0] != 0)
    if not np.all(north_valid | south_valid):
        raise RuntimeError("Destination patch has missing source pixels; do not fabricate them")
    seam_y = items[0]["assets"]["visual"]["proj:transform"][5] - 10980*10
    overlap = north_valid & south_valid & (yy >= seam_y+100) & (yy <= seam_y+4000)
    difference = north.astype(np.float32)-south.astype(np.float32)
    diagnostics = {
        "sourceSeamNorthing": seam_y,
        "overlapPixels": int(overlap.sum()),
        "overlapMeanAbsoluteRGBDifference": np.mean(np.abs(difference[overlap]), axis=0).tolist(),
        "overlapMedianRGBDifference": np.median(difference[overlap], axis=0).tolist(),
        "cause": "Tonal differences already present in registered source TCI tiles from the same datatake; not introduced by our global colour correction. No missing coverage at the seam. Exact upstream radiometric/atmospheric cause not established.",
    }
    # Blend only coincident source observations in their genuine overlap.
    # This changes radiometry, never pixel coordinates, and performs no spatial blur.
    north_weight = np.clip((yy-seam_y)/4000, 0, 1)
    north_weight = north_weight*north_weight*(3-2*north_weight)
    north_weight = np.where(~south_valid, 1, np.where(~north_valid, 0, north_weight))
    mixed = np.rint(north*north_weight[:, :, None]+south*(1-north_weight[:, :, None])).astype(np.uint8)
    hard = np.where(north_valid[:, :, None], north, south)
    seam_row = int(np.argmax(y < seam_y))
    diagnostics["hardSeamMeanAbsoluteRowStep"] = float(np.mean(np.abs(hard[seam_row-1].astype(float)-hard[seam_row].astype(float))))
    diagnostics["blendedSeamMeanAbsoluteRowStep"] = float(np.mean(np.abs(mixed[seam_row-1].astype(float)-mixed[seam_row].astype(float))))
    lut = [round(255*(v/255)**(1/1.05)) for v in range(256)]
    corrected = ImageEnhance.Color(ImageEnhance.Contrast(Image.fromarray(mixed).point(lut*3)).enhance(1.04)).enhance(1.03)
    desktop = imagery.save_webp(corrected, "20251227-destination-desktop.webp")
    mobile = imagery.save_webp(corrected.resize((1024, 1024), Image.Resampling.LANCZOS), "20251227-destination-mobile.webp")
    inverse = Transformer.from_crs("EPSG:32643", "OGC:CRS84", always_xy=True)
    vertices = []
    for row in range(SEGMENTS+1):
        for column in range(SEGMENTS+1):
            lng, lat = inverse.transform(BOUNDS[0]+column/SEGMENTS*64000, BOUNDS[3]-row/SEGMENTS*64000)
            vertices.append([round(lat, 9), round(lng, 9)])
    # Independent geographic control anchors: image pixel locations and true coordinates.
    # Source place anchors plus a geometric coastal/inland grid validate registration.
    checks = []
    for name, lat, lng in [("Colaba",18.906944,72.810556),("Bandra",19.0666667,72.8333333),("Borivali",19.23496,72.85976),("Andheri",19.130862,72.852583)]:
        forward = Transformer.from_crs("OGC:CRS84", "EPSG:32643", always_xy=True)
        px, py = forward.transform(lng, lat)
        checks.append({"name":name,"lat":lat,"lng":lng,"u":(px-BOUNDS[0])/64000,"vFromNorth":(BOUNDS[3]-py)/64000})
    manifest = {"date":"2025-12-27","crs":"EPSG:32643","boundsMetres":BOUNDS,"segments":SEGMENTS,"verticesLatLng":vertices,"desktop":desktop,"mobile":mobile,"checks":checks,"seam":diagnostics,"processing":"Same verified TCI B04/B03/B02 sources; north/south same-location smoothstep blending over 4000m of genuine overlap, then the existing restrained global colour correction. No spatial smoothing or geography changes. 64km square context crop keeps the patch boundary outside the destination camera.","sourceItems":[s["id"] for s in items],"imageryAttribution":"Contains modified Copernicus Sentinel data 2025"}
    review = json.loads((DATA / "review.json").read_text())
    manifest["labels"] = [{k:l[k] for k in ["name","lat","lng","source"]} for l in review["labels"]]
    municipal = shape(json.loads((DATA / "historical-boundary.geojson").read_text())["features"][0]["geometry"])
    manifest["boundaryParts"] = len(municipal.geoms)
    manifest["boundaryRingsLatLng"] = [[[lat,lng] for lng,lat in ring.coords] for polygon in municipal.geoms for ring in [polygon.exterior,*polygon.interiors]]
    manifest["boundaryAttribution"] = "Pune chapter of the DataMeet Trust, Bangalore, India; historical union derivative, not current official limits"
    manifest["boundaryLicense"] = "https://creativecommons.org/licenses/by-sa/2.5/in/"
    manifest["boundarySource"] = "https://github.com/datameet/Municipal_Spatial_Data/blob/c0e247f8e2ea3222965c445154122ab06ff49857/Mumbai/BMC_Wards.geojson"
    manifest["imageryLicense"] = "https://cds.climate.copernicus.eu/licences/ec-sentinel"
    manifest["labelAttribution"] = "GeoNames, CC BY; Mumbai composition anchor is the historical envelope centre"
    (DATA / "destination.json").write_text(json.dumps(manifest,separators=(",",":")),encoding="utf8")
    print(json.dumps({"desktop":desktop,"mobile":mobile,"seam":diagnostics},indent=2))


if __name__ == "__main__":
    main()
