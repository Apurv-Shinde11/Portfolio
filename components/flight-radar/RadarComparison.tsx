"use client";

import { useState } from "react";
import Hero from "@/components/sections/Hero";
import FlightRadar from "./FlightRadar";
import { SquaresBackground } from "./HeroBackground";
import { aircraftIcons, proposedIcons, refinedIcons } from "./radar-data";
import styles from "./radar.module.css";

export default function RadarComparison() {
  const [mode, setMode] = useState<"squares" | "radar">("radar");
  const [paused, setPaused] = useState(false);
  const [proposed, setProposed] = useState(false);
  const [density, setDensity] = useState({visible:0,target:0});
  return <>
    <aside className={styles.toolbar} aria-label="Prototype comparison controls">
      <span>LOCAL PROTOTYPE · synthetic traffic</span>
      <div role="group" aria-label="Hero background">
        <button aria-pressed={mode === "squares"} onClick={() => setMode("squares")}>Current Squares</button>
        <button aria-pressed={mode === "radar"} onClick={() => setMode("radar")}>FlightRadar</button>
      </div>
      <button disabled={mode !== "radar"} aria-pressed={paused} onClick={() => setPaused(p => !p)}>{paused ? "Resume radar" : "Pause radar"}</button>
      <span className={styles.motionNote}>Reduced-motion preference takes priority.</span>
      <button aria-pressed={proposed} onClick={()=>setProposed(value=>!value)}>{proposed ? "Reviewing proposed icons" : "Try proposed icons"}</button>
      <span role="status">Paired traffic: {density.visible} / {density.target} target. Counts reduce at boundaries or collisions.</span>
    </aside>
    <Hero background={mode === "radar" ? <FlightRadar paused={paused} proposed={proposed} onDensity={setDensity} /> : <SquaresBackground paused={paused} />} />
    <section className={styles.legend} aria-label="Original aircraft icon review">
      <h2>Aircraft symbol review</h2>
      <p>Original shared category symbols, not FR24 replicas or individual model identifiers. All traffic is synthetic.</p>
      <p>Proposed symbols await your visual approval. FR24 reference images have not been visually inspected; no exact fidelity is claimed.</p>
      <div className={styles.key} aria-label="Tracking detail legend">
        <span><svg viewBox="0 0 70 16" aria-hidden="true"><path className={styles.planned} d="M0 8H70" /></svg>Planned route</span>
        <span><svg viewBox="0 0 70 16" aria-hidden="true"><path className={styles.trail} d="M0 8H70" /></svg>Recent trail</span>
        <span><svg viewBox="0 0 70 16" aria-hidden="true"><path className={styles.waypoint} d="M35 3l5 5-5 5-5-5Z" /></svg>Waypoint</span>
      </div>
      <h3>Actual radar sizes · 24–34px</h3>
      <div className={styles.iconList}>{aircraftIcons.map(icon => <figure key={icon.name}>
        <svg width={icon.size} height={icon.size} viewBox="-17 -17 34 34" role="img" aria-label={icon.name}><path d={icon.path} fill="currentColor" /></svg>
        <figcaption>{icon.name} · {icon.size}px</figcaption>
      </figure>)}</div>
      <h3>Enlarged silhouette inspection · 112px</h3>
      <div className={styles.enlarged}>{aircraftIcons.map(icon => <figure key={icon.name}>
        <svg width="112" height="112" viewBox="-17 -17 34 34" role="img" aria-label={`${icon.name}, enlarged`}><path d={icon.path} fill="currentColor" /></svg>
        <figcaption>{icon.name}</figcaption>
      </figure>)}</div>
      <h2>Current / proposed icon design lab</h2>
      {aircraftIcons.map((icon,i)=><article className={styles.labRow} key={icon.name}>
        <h3>{icon.name}</h3>
        {[{name:"Current",icon},{name:"Previous proposal",icon:proposedIcons[i]},{name:"Refined family · pending approval",icon:refinedIcons[i]}].map(version=><div key={version.name}>
          <p>{version.name}</p><div className={styles.labSamples}>{[24,32,48,112].map(size=><figure key={size}>
            <svg width={size} height={size} viewBox="-17 -17 34 34" role="img" aria-label={`${icon.name}, ${version.name}, ${size}px`}><path d={version.icon.path} fill="currentColor" /></svg>
            <figcaption>{size}px</figcaption>
          </figure>)}</div>
        </div>)}
      </article>)}
    </section>
  </>;
}
