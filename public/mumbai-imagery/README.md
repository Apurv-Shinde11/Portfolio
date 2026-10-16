# Mumbai Sentinel-2 imagery — review candidates, not approved production textures

Development review: `/mumbai-imagery-review` (404 outside development).
No imagery has been connected to the globe or production My World section.
Static assets in this directory are public even when the review route is guarded.

## Provisional visual choice

**27 December 2025** has relatively even, clear urban detail at the current full-city
display size. Its water is naturally sediment-coloured, not artificially blue.
25 February 2026 has localized atmospheric haze; 12 March 2026 has a broader hazy
veil despite very low cloud metadata. These are visual observations, not aerosol
measurements. None is guaranteed haze-free.

All three retain a visible tonal seam near the southern crop edge where the two
source tiles meet. The seam is outside the historical Mumbai polygon's southern
extent, but remains visible in the surrounding sea. It was not painted out or
hidden by sharpening. Review approval is needed before any cinematic integration.
Uniform radiometric band processing or a carefully registered overlap treatment
would be a separate next step; the source-rendered TCI is not seamless by assumption.

## Real source scenes

Each pair is from one platform, date, orbit and matching `s2:datatake_id`.
The tile acquisition timestamps differ by approximately 14 seconds, not dates.

| Date | Northern tile | Southern tile |
|---|---|---|
| 2025-12-27 | S2C_43QBB_20251227_0_L2A | S2C_43QBA_20251227_0_L2A |
| 2026-02-25 | S2C_43QBB_20260225_0_L2A | S2C_43QBA_20260225_0_L2A |
| 2026-03-12 | S2B_43QBB_20260312_0_L2A | S2B_43QBA_20260312_0_L2A |

Permanent STAC item URLs follow:
`https://earth-search.aws.element84.com/v1/collections/sentinel-2-l2a/items/{scene-id}`.
Exact source asset URLs, SAFE product identifiers, acquisition times, transforms,
processing baselines, and source scene metadata are retained in
`data/mumbai-imagery/*.json` and `data/mumbai-imagery/review.json`.

Authorized public archive:
https://registry.opendata.aws/sentinel-2-l2a-cogs/

Rejected: S2C_43QBA_20260116_0_L2A had 63,690 sampled pixels classified SCL 0
(no data) in the required southern fill. No January image was published, no gap
was invented, and no other date was substituted inside a candidate. Its metadata
is retained for provenance.

## Geographic processing

- Source: Sentinel-2 Level-2A producer-rendered true colour (TCI), RGB = B04/B03/B02.
- `source-rgb` means no **additional** colour correction. It is already rendered
  uint8 true colour, not raw sensor digital numbers or linear reflectance.
- Source and output CRS: WGS84 / UTM zone 43N, **EPSG:32643**.
- Metric crop bounds `[west, south, east, north]`: `[264000, 2089000, 290000, 2135000]`.
- Ground footprint: 26km × 46km; all historical municipal polygon parts fit inside.
- No raster reprojection was required: both input tiles and output share the same
  UTM grid. Pixel-centre affine sampling registers the crop. This asset must not
  later be treated as an equirectangular longitude/latitude texture.
- Geographic NW, NE, SE, SW corners (longitude, latitude):
  - 72.754181753, 19.295018502
  - 73.001483648, 19.297893847
  - 73.006465045, 18.882417965
  - 72.759778373, 18.879609130
- Desktop: **1158 × 2048**, approximately 22.45m × 22.46m pixels (integer rounding).
- Mobile: **579 × 1024**, approximately 44.9m pixels.
- These dimensions preserve the metric aspect ratio instead of stretching to
  1024 × 2048. UTM grid north differs slightly from true north.
- Read bounded byte ranges from the existing ~20m COG TCI overview. Decode Deflate
  tiles and their horizontal predictors, then bilinear sample RGB to the output
  pixel centres. Sample 20m SCL with nearest neighbour; reject any SCL 0 pixels.
- North tile 43QBB has priority in its overlap. Same-datatake 43QBA fills only the
  southern strip. No cross-date mosaics, rotation tricks, coastline editing or AI.
- All accepted crop pixels have source coverage and nonzero SCL. Cloud/shadow
  classifications are retained as diagnostics, not silently removed or inpainted.
- Candidate colour: common channel gamma exponent `1/1.05`, Pillow contrast
  multiplier `1.04`, then colour multiplier `1.03`. No local edits or sharpening.
- Mobile: Lanczos downsample of the corrected desktop image.
- All review images: WebP, quality 90, method 6. `source-rgb` is also a lossy WebP
  review baseline; authoritative source pixels remain in the linked COGs.
- Output SHA-256 hashes and exact byte sizes are stored in the manifest.

Coastline and physical locations are not stretched to the viewport. Surrounding
Thane/Navi Mumbai/port areas naturally occur in the rectangle; they are not
destination labels. This is not an image of only Mumbai territory.

## Overlays — separate data and licence

The outline is a union of all 24 historical DataMeet BMC ward MultiPolygons, pinned
to commit `c0e247f8e2ea3222965c445154122ab06ff49857` (19 August 2016).
The actual survey/effective date is unknown. **Not current official limits.**

Source CRS is OGC CRS84 (WGS84 longitude, latitude). All features are valid. Union
preserves **two disconnected polygon parts**, plus interior rings produced by the
union. All five rings survive projection into the review SVG. No simplification,
gap filling, missing-segment invention or joining disconnected parts.

Geographic derived geometry: `data/mumbai-imagery/historical-boundary.geojson`.
Projected review rings: `data/mumbai-imagery/review.json`.

Attribution: **Pune chapter of the DataMeet Trust, Bangalore, India**.
Source: https://github.com/datameet/Municipal_Spatial_Data/tree/master/Mumbai
Derived boundary geometry is shared under **CC BY-SA 2.5 India**:
https://creativecommons.org/licenses/by-sa/2.5/in/
Changes: dissolved internal ward edges; transformed coordinates for the SVG.
Keep attribution, licence link and change notices with distributed derivatives.
This boundary licence does not relicense the separately supplied Sentinel imagery.

Portable full-resolution previews: `20251227-historical-outline.svg` and
`20251227-labels.svg`. Each embeds the prepared WebP, so it can be opened without
external image requests. SVG metadata records the separate imagery, boundary and
label-source licences; these are composite review documents, not one relicensed dataset.

Locality anchors: GeoNames, CC BY (https://www.geonames.org/export/).
Original geographic coordinates and individual source links are in the manifest.
All four locality anchors lie inside the historical union. Label text offsets
prevent collisions; their point anchors are never moved by visual guessing.
MUMBAI is placed at the existing historical envelope centre, explicitly a
composition anchor rather than a claimed official city centroid.

## Sentinel permissions and attribution

**Contains modified Copernicus Sentinel data 2025, 2026.**
For individual images, use the acquisition year of that candidate.
Sentinel data legal notice permits reproduction, distribution, public communication,
adaptation and combination, subject to its conditions and required source notice:
https://cds.climate.copernicus.eu/licences/ec-sentinel

Sentinel-2 Cloud-Optimized GeoTIFFs accessed through AWS Open Data / Element 84
Earth Search. Access time is recorded in the processing manifest.
No Google imagery, proprietary map tiles, paid API, credentials or account used.
No implication of Copernicus, ESA, AWS, Element 84 or DataMeet endorsement.

## Performance and loading

Exact sizes: manifest. Selected December files:
- source RGB: 518,126 bytes
- corrected desktop: 537,912 bytes
- corrected mobile: 153,390 bytes

Estimated RGBA8 GPU memory if uploaded later, including a full mip chain:
- desktop: approximately **12.06MiB**
- mobile: approximately **3.02MiB**
These are texture allocations only, not complete renderer memory measurements.
Only one resolution should be uploaded for a real destination view.

The review is server-rendered, has no custom animation or map renderer, and uses
lazy `next/image` with reserved aspect ratios. Images are `unoptimized` specifically
to compare the exact prepared WebP files without a second image-optimizer encode.
The review loads multiple dates intentionally; a later integration should request
one chosen file. Normal static-file caching applies; no provider requests at runtime.

## Reproduce / preview

`python scripts/prepare-mumbai-imagery.py`

Uses the already installed Pillow, numpy, scipy, pyproj and shapely. This work did
not install them or add application dependencies. Source range cache resides in
the OS temp directory (`portfolio-sentinel-cogs`), not the repository. The script
intentionally fails for unsupported TIFF encoding, no-data pixels, incomplete
coverage, or mismatched datatakes rather than guessing.

`npm run dev` then open `http://localhost:3000/mumbai-imagery-review`.
If using the existing local port: `http://localhost:3100/mumbai-imagery-review`.
Inspect the four treatments, the actual 280 × 260 display frames, all dates,
and both portfolio themes. Open the WebP links to inspect full resolution.

Geographic quality and visual approval remain human review decisions. The historic
outline may disagree with reclamation/new infrastructure in newer satellite data.
No cinematic transition or production integration is included in this phase.
