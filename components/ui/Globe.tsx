"use client";

import Image from "next/image";
import { useEarthJourney } from "./useEarthJourney";
import styles from "./Globe.module.css";

export default function MumbaiGlobe() {
  const { host, status, imagery } = useEarthJourney();
  return (
    <figure className={styles.figure} aria-label="Earth to Mumbai: daylight satellite destination with historical municipal outline">
      <div className={styles.stage} data-earth-status={status}>
        {status !== "ready" && (
          <div className={styles.fallback}>
            <Image src={status === "fallback" ? "/mumbai-imagery/20251227-mumbai.svg" : "/earth/day.webp"} alt={status === "fallback" ? "Static daylight satellite map of the full Mumbai extent, with historical municipal outline and a single MUMBAI label." : "NASA world map preview."} width={status === "fallback" ? 1158 : 2048} height={status === "fallback" ? 2048 : 1024} sizes="280px" unoptimized />
          </div>
        )}
        <div ref={host} className={styles.canvasHost} />
      </div>
      <figcaption className={styles.caption}>
        <span>Contains modified Copernicus Sentinel data 2025.</span>{" "}
        <a href="https://cds.climate.copernicus.eu/licences/ec-sentinel" target="_blank" rel="noopener noreferrer">Copernicus</a>{" · "}
        <a href="https://science.nasa.gov/earth/earth-observatory/earth-at-night/maps/" target="_blank" rel="noopener noreferrer">NASA</a>{" · "}
        <a href="https://github.com/datameet/Municipal_Spatial_Data/tree/master/Mumbai" target="_blank" rel="noopener noreferrer">DataMeet</a>{" "}
        (<a href="https://creativecommons.org/licenses/by-sa/2.5/in/" target="_blank" rel="noopener noreferrer">CC BY-SA</a>)
        {" · "}<a href="https://www.geonames.org/export/" target="_blank" rel="noopener noreferrer">GeoNames</a>
        <span className={styles.qualifier}>Historical boundary; daylight destination imagery.</span>
        <span className="sr-only" role="status">{status === "fallback" ? "Interactive Earth unavailable. Static Mumbai view." : imagery === "failed" ? "Mumbai imagery unavailable. Earth overview retained." : "Earth transitions to the full Mumbai extent and holds until you leave this section."}</span>
      </figcaption>
    </figure>
  );
}
