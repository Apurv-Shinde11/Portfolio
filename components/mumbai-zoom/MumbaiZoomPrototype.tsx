"use client";

import Image from "next/image";
import { useState } from "react";
import MyWorld from "@/components/sections/MyWorld";
import { useEarthJourney } from "@/components/ui/useEarthJourney";
import framing from "@/data/mumbai-framing.json";
import styles from "./MumbaiZoomPrototype.module.css";

function JourneyGlobe() {
  const [overview, setOverview] = useState(false);
  const { host, restart, state, status, imagery } = useEarthJourney(overview);
  return <figure className={styles.figure} aria-label="Earth to full-city Mumbai development framing study">
    <div ref={host} className={styles.stage} data-mumbai-journey>
      {status!=="ready"&&<div className={styles.fallback}><Image src={status==="fallback"?"/mumbai-imagery/20251227-mumbai.svg":"/earth/day.webp"} width={status==="fallback"?1158:2048} height={status==="fallback"?2048:1024} alt={status==="fallback"?"Static daylight satellite map covering the full Mumbai extent, with historical municipal outline and a single MUMBAI label.":"NASA global Earth map preview."} sizes="280px" unoptimized />{status!=="fallback"&&<p>Loading Earth…</p>}</div>}
    </div>
    <figcaption className={styles.diagnostics}>
      <output aria-live="polite">State: {state}</output>
      <output aria-live="polite">Imagery: {imagery}{imagery==="failed"?(status==="fallback"?" — interactive Earth unavailable; static Mumbai view.":" — Earth overview retained; city zoom disabled."):""}</output>
      <button disabled={status!=="ready"||imagery!=="ready"} onClick={()=>restart.current()}>Restart journey</button>
      <label><input type="checkbox" checked={overview} onChange={e=>setOverview(e.target.checked)} />Conservative overview (diagnostic; city will be very small)</label>
      <p>Outline: historical DataMeet BMC ward union, not current official limits. Nearby cities are context, not destinations.</p>
      <p>Daylight destination: Contains modified Copernicus Sentinel data 2025. <a href="/mumbai-imagery-review">Imagery review and licences</a>. Historical boundary: DataMeet, CC BY-SA 2.5 India. Locality anchors: GeoNames, CC BY.</p>
    </figcaption>
  </figure>;
}

export default function MumbaiZoomPrototype() {
  return <>
    <header className={styles.intro}>
      <p>DEVELOPMENT ONLY / GEOGRAPHY &amp; LIFECYCLE STUDY</p>
      <h1>Earth → Mumbai → Hold</h1>
      <p>Scroll into My World to begin. Leave the entire section by more than 64px to reset, then return. Minor edge scrolling does not restart the journey.</p>
      <p>This development preview introduces the verified 27 December 2025 Sentinel-2 imagery as a geographically aligned curved patch, then holds the complete historical Mumbai extent.</p>
    </header>
    <MyWorld globe={<JourneyGlobe />} globeInstructions="Automatic framing preview / swipe vertically to scroll" />
    <section className={styles.notes} aria-label="Framing sources and exit test area">
      <h2>Full-city framing, not South Mumbai or the MMR</h2>
      <p>The camera includes all 24 wards in the historical DataMeet BMC dataset, covering the island city and western/eastern suburbs. Both disconnected parts and interior rings are preserved. This is a full-city view with surrounding context, not a city-only territorial mask or a current official boundary.</p>
      <p>Bounds (west, south, east, north): {framing.bbox.map(n=>n.toFixed(6)).join(", ")}. Geographic centre: 19.082067° N, 72.878032° E.</p>
      <p><a href={framing.source} target="_blank" rel="noopener noreferrer">DataMeet BMC ward source</a> · {framing.creator} · <a href={framing.license} target="_blank" rel="noopener noreferrer">CC BY-SA 2.5 India</a>. Framing coordinates were calculated from the source; no municipal outline is invented.</p>
      <p>Earth imagery: <a href="https://science.nasa.gov/earth/earth-observatory/earth-at-night/maps/" target="_blank" rel="noopener noreferrer">NASA Earth Observatory</a>. The existing historical composites and UTC-based lighting are reused without sharpening or replacement.</p>
      <p>The destination uses a 64km square EPSG:32643 context crop from the same two December scenes. Its curved mesh was transformed to geographic coordinates using pyproj; the imagery is never stretched to the viewport. The original review crops remain unchanged. A 4km overlap blend reduces the source tile seam without moving coastline pixels or spatial smoothing. Residual atmospheric and tonal variation remains possible.</p>
      <p>The Earth retains approximate current solar lighting. The destination deliberately becomes daylight historical imagery for readability; it is not live satellite coverage. If destination loading fails, the camera stays at the usable Earth overview.</p>
      <p>This extra scroll area lets you fully leave My World before returning. Reduced-motion visitors see the static destination directly.</p>
    </section>
  </>;
}
