# Shared Earth → Mumbai destination integration

Preview: `http://localhost:3100/my-world-zoom-prototype` when the local dev server
uses port 3100. Standard `npm run dev` uses port 3000 instead. Both development
preview routes return `notFound()` outside development; the homepage journey is enabled.
The actual homepage now uses the approved journey through the same shared hook as
the development preview. No second renderer, map service or new dependency. This
is local integration only; nothing has been committed, pushed or deployed.

## Source verification and preserved originals

Uses the verified 27 December 2025 Sentinel-2C datatake:
- S2C_43QBB_20251227_0_L2A
- S2C_43QBA_20251227_0_L2A

Source URLs, acquisition timestamps and processing metadata remain in the original
STAC JSON files and `review.json`. All nine original review WebP hashes remain
unchanged. Source RGB is producer-rendered TCI B04/B03/B02, not raw reflectance.
The original review and portable historical/label SVGs are preserved.

The 26 × 46km review crop cannot cover the original 280 × 260 globe viewport at
the existing full-city camera distance without exposing edges. The destination
therefore uses a **64 × 64km context crop from the same verified source tiles**.
It does not stretch the original rectangle, invent imagery, or frame the MMR as
the destination. The camera still fits the same full historical Mumbai extent.

## Seam investigation and correction

The hard join was at northing **2,090,220m** (EPSG:32643), the northern tile's lower
edge. Both tiles have valid same-overpass imagery in the overlap. The original
TCI pixels already differ there; the seam is not introduced by our common colour
correction or absent coverage. Exact upstream atmospheric/radiometric cause has
not been established; do not attribute it to one specific processing stage.

Across 256,000 sampled overlap pixels, mean absolute RGB differences are roughly
5.46 / 6.65 / 9.52 levels (8-bit). A 4km smoothstep weight blends **the same
geographic locations in the actual source overlap**. It performs no spatial blur,
geographic warp, missing-pixel synthesis or cross-date compositing. North supplies
the northern region, south supplies the southern region, with a continuous blend
in between. Existing restrained global colour processing follows the mosaic.

At the exact old join, mean absolute adjacent-row change falls from **8.86 to
4.46 RGB levels** across the 64km crop. This is a join diagnostic, not a guarantee
of perfect radiometric uniformity. Real water/land variation remains, and historical
source data can still have haze or tonal differences. Originals remain available.

## Registration and curved geometry

- Crop CRS: EPSG:32643, WGS84 / UTM zone 43N.
- Bounds `[west, south, east, north]`: `[244000, 2079000, 308000, 2143000]` metres.
- Desktop: 2048 × 2048, 31.25m output grid; mobile: 1024 × 1024, 62.5m grid.
- Source sampling: the existing approximately 20m TCI overview, bilinear RGB and
  nearest-neighbour SCL. Every output pixel requires valid source coverage/SCL.
- Precompute inverse UTM → CRS84 at a 65 × 65 vertex grid using installed pyproj.
- Runtime maps those exact geographic vertices through the existing Earth
  latitude/longitude → sphere convention. UV north is image top; no mirror/flip.
- 4,225 vertices / 8,192 outward-facing triangles, ~1km local grid spacing.
- Patch radius 1.000002 Earth radii; boundary 1.000004. Transparent patch does not
  write depth; existing globe remains behind it. No replacement of global textures.
- All five historical municipal rings survive: two disconnected polygon exteriors
  and their interior rings. No connecting segments or simplified/invented coastline.

Raycast tests at Colaba, Bandra, Borivali and Andheri agree with independently
calculated source UV coordinates to <0.05m numerically. **This measures internal
mesh/projection interpolation only**, not Sentinel geolocation accuracy or the
currency of historical ward limits. Camera tests at 280px and 212px canvas widths
confirm every boundary point is within the 20% fit margin and all viewport corner
rays hit full-strength imagery beyond the edge feather.

The existing globe is spherical, not terrain/ellipsoidal Earth. This patch uses
that same convention for continuity. No 3D buildings, terrain or live weather.

## Transition and lifecycle

The same IDLE_EARTH / APPROACHING_MUMBAI / HOLDING_MUMBAI / RESETTING machine remains.
5.2 seconds of active animation time; existing quintic ease and logarithmic altitude
interpolation. Entry requires 30% of min(section height, viewport height); exit
requires leaving by >64px. Minor threshold scrolling does not restart the journey.
Sections taller than the viewport work. Reset is immediate while the section is
offscreen; re-entry starts from Earth. No automatic reverse, scrubbing or loop.

While destination data loads, Earth remains usable and the approach clock waits.
Destination module/texture load has a 20-second outer deadline and 15-second image
deadline. Failure disables city zoom and keeps the 3.2-radius Earth overview.
Late texture completions are disposed, not attached to an obsolete renderer.

Patch opacity grows as camera altitude falls from 0.55 to 0.08 Earth radii. A
geographic-UV radial/edge feather avoids a floating rectangle during approach;
the complete destination viewport is fully opaque at arrival. This is a curved,
registered surface, not a screen-space image overlay. Early patch shading follows
the existing solar direction; it gradually becomes intentionally daylight imagery
between 0.16 and 0.02 radius altitude. No claim of live satellite or nighttime data.

Historical outline enters near destination; the single projected MUMBAI label enters later,
using the same camera/coordinates, horizontal HTML text and its original backing
surface and offset. Locality labels, markers and backgrounds are not rendered.
Their source coordinates remain available for alignment checks and attribution.
Accessible captions retain the historical-boundary qualification.

Reduced motion goes directly to the loaded destination. No custom render loop was
added: the existing renderer schedules frames only while the journey/control state
changes. Both canvas-offscreen and genuine hidden-tab pauses stop animation time.
All patch textures, geometry, boundary lines and label nodes are disposed with the
renderer. WebGL failure shows the city-only licensed static Mumbai label SVG (`20251227-mumbai.svg`) with
descriptive alternative text. Restart is disabled when the interactive view is
unavailable. No permanent imagery-loading status is shown on failure.

## Performance observations

- Desktop destination WebP: **874,956 bytes**.
- Mobile destination WebP: **229,982 bytes**.
- Additional GPU RGBA8 texture including mip chain: ~21.33MiB / ~5.33MiB.
- Existing two global maps contribute ~21.33MiB together, excluding renderer buffers.
- Observed final scene: 3 GPU textures, 8 draw calls per rendered frame.
- In headless Chrome, final render count remained unchanged across a 1.5s hold;
  it also remained unchanged while a genuine background tab hid the page.
- Fresh mobile entry selected the 1024px asset and reduced motion reached the
  destination with one visible render. Desktop/tablet select 2048px.
- Texture selection occurs once per renderer instance; resize does not swap textures
  or restart the journey. DPR is capped by the existing renderer at 2.
- These are browser instrumentation/allocation estimates, not physical-device FPS
  guarantees. Real mobile GPU/data/battery testing remains useful.

## Licences and reproduction

Imagery: **Contains modified Copernicus Sentinel data 2025**.
https://cds.climate.copernicus.eu/licences/ec-sentinel

Boundary derivative: Pune chapter of the DataMeet Trust, Bangalore, India,
CC BY-SA 2.5 India. Historical source pinned to commit
`c0e247f8e2ea3222965c445154122ab06ff49857` (19 August 2016, survey date unknown).
https://creativecommons.org/licenses/by-sa/2.5/in/

Localities: GeoNames, CC BY; individual source coordinates/links are retained.
MUMBAI uses the existing historical envelope centre as a composition anchor,
not a claimed official centroid. Imagery and geometry retain separate licences.

Reproduce: `python scripts/prepare-mumbai-destination.py`.
Reuses the existing range-cache decoder and already installed Pillow/numpy/scipy/
pyproj/shapely; no package was installed. Source ranges are cached outside the repo
in the OS temporary directory. `destination.json` preserves hashes, crop metadata,
mesh, labels, source IDs, attribution and seam diagnostics.


## Homepage component integration

`components/ui/useEarthJourney.ts` owns the shared client lifecycle for both
`Globe.tsx` and the development preview. It initializes one renderer when the
section comes within 600px, aborts obsolete initialization, and disposes on unmount.
The existing `earth-journey.ts` remains the only animation/state-machine controller.
Clock-driven parent renders do not recreate it. Re-entry reuses the loaded texture.
The homepage exposes no restart, overview toggle, state output or diagnostic text.
Its visible caption preserves imagery/boundary attribution and historical context.
The 280 ? 260 canvas, two-card grid, social links and Mumbai clock remain intact.
The old drag instruction now describes the automatic Earth-to-Mumbai experience.
