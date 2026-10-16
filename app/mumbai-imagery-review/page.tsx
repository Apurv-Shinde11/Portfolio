import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import review from "@/data/mumbai-imagery/review.json";
import styles from "./review.module.css";

export const metadata: Metadata = {
  title: "Mumbai satellite imagery — development review",
  robots: { index: false, follow: false },
};

type Asset = { path: string; width: number; height: number; bytes: number };

function Crop({ asset, boundary = false, labels = false, compact = false }: {
  asset: Asset; boundary?: boolean; labels?: boolean; compact?: boolean;
}) {
  return <div className={`${styles.frame} ${compact ? styles.compact : ""}`}>
    <div className={styles.registered} style={{ aspectRatio: `${review.width} / ${review.height}` }}>
      <Image src={asset.path} width={asset.width} height={asset.height}
        alt="Daylight Sentinel-2 RGB crop covering northern Mumbai, western and eastern suburbs, central Mumbai and Colaba, with surrounding sea and land."
        sizes="(max-width: 600px) 80vw, 340px" loading="lazy" unoptimized />
      {(boundary || labels) && <svg viewBox={`0 0 ${review.width} ${review.height}`} aria-hidden="true" className={styles.overlay}>
        {boundary && <g className={styles.boundary}>{review.boundaryRings.map((ring, i) =>
          <path key={i} d={`M${ring.map(p => p.join(",")).join("L")}Z`} />)}</g>}
        {labels && <g className={styles.labels}>{review.labels.map(label => <g key={label.name}>
          <circle cx={label.x} cy={label.y} r={9} />
          <text x={label.x + (label.name === "Bandra" ? -20 : 20)} y={label.y - 18} textAnchor={label.name === "Bandra" ? "end" : "start"} className={label.name === "Mumbai" ? styles.city : undefined}>{label.name === "Mumbai" ? "MUMBAI" : label.name}</text>
        </g>)}</g>}
      </svg>}
    </div>
  </div>;
}

export default function MumbaiImageryReview() {
  if (process.env.NODE_ENV !== "development") notFound();
  // Selection is provisional and documented; the other dates remain reviewable.
  const chosen = review.candidates.find(c => c.date === review.recommendedDate)!;
  const comparisons = [
    { title: "1 / Source-rendered RGB", asset: chosen.raw, boundary: false, labels: false, description: "Producer true-colour B04/B03/B02, cropped and resampled; no additional colour correction. This is not raw sensor reflectance." },
    { title: "2 / Restrained colour candidate", asset: chosen.desktop, boundary: false, labels: false, description: "Common gamma 1/1.05; contrast ×1.04; colour ×1.03. No sharpening or local edits." },
    { title: "3 / Historical municipal outline", asset: chosen.desktop, boundary: true, labels: false, description: "Union of all 24 historical DataMeet wards. Both disconnected polygon parts preserved; not current official limits." },
    { title: "4 / Geographic label study", asset: chosen.desktop, boundary: true, labels: true, description: "WGS84 anchors transformed to the image's UTM grid. Mumbai is the historical envelope-centre composition label." },
  ];
  return <main id="content" className={styles.page}>
    <header className={styles.intro}>
      <p className={styles.eyebrow}>DEVELOPMENT ONLY / ASSET REVIEW</p>
      <h1>Mumbai, from north to south</h1>
      <p>Daylight Sentinel-2 imagery candidates for the existing Earth-to-Mumbai prototype. No cinematic integration or production replacement. Surrounding regions are context, not destination highlights.</p>
      <p>Selected for review: <strong>{chosen.date}</strong>, two overlapping tiles from one verified datatake. Compare the other dates below before approval.</p>
      <p>December is the provisional preference for its relatively even, clear urban detail. February has localized haze; March has a broader hazy veil. All three retain a visible tile-tone seam near the southern image edge. This is an honest review candidate, not a seamless production texture.</p>
      <nav aria-label="Review sections"><a href="#comparison">Large comparison</a><a href="#actual-size">Actual display size</a><a href="#dates">Acquisition dates</a><a href="#provenance">Sources and licences</a></nav>
    </header>
    <section id="comparison" aria-label="Four imagery treatments" className={styles.grid}>
      {comparisons.map(c => <figure key={c.title} className={styles.card}>
        <h2>{c.title}</h2><Crop {...c} /><figcaption>{c.description}</figcaption>
        <a href={c.boundary ? review.overlayPreviews[c.labels ? 1 : 0] : c.asset.path} target="_blank" rel="noopener noreferrer">Open full-resolution {c.boundary ? "overlay preview" : "image"}</a>
      </figure>)}
    </section>
    <section id="actual-size" className={styles.section}>
      <h2>Actual destination display: 280 × 260 CSS pixels</h2>
      <p>The full crop fits without stretching. These previews use the desktop and mobile files separately; source colours remain identical in both portfolio themes.</p>
      <div className={styles.sizeGrid}>
        <figure><Crop asset={chosen.desktop} boundary labels compact /><figcaption>Desktop source · {chosen.desktop.width} × {chosen.desktop.height}</figcaption></figure>
        <figure><Crop asset={chosen.mobile} boundary labels compact /><figcaption>Mobile source · {chosen.mobile.width} × {chosen.mobile.height}</figcaption></figure>
      </div>
    </section>
    <section id="dates" className={styles.section}>
      <h2>Three acquisition dates</h2>
      <p>Cloud percentages below are scene-wide metadata and crop-specific SCL classification, not proof of haze-free imagery.</p>
      <div className={styles.dateGrid}>{review.candidates.map(candidate => <figure key={candidate.date} className={styles.card}>
        <h3>{candidate.date}</h3><Crop asset={candidate.desktop} compact />
        <figcaption>{candidate.sources.map(s => <span className={styles.source} key={s.id}>{s.id} · cloud {s.sceneCloudPercent.toFixed(4)}% · {s.datetime}</span>)}
          Crop cloud/cirrus classes 8–10: {(Number(candidate.cropSclPercent["8"]) + Number(candidate.cropSclPercent["9"]) + Number(candidate.cropSclPercent["10"])).toFixed(4)}%. No-data: {candidate.cropSclPercent["0"]}%.
        </figcaption>
      </figure>)}</div>
    </section>
    <section id="provenance" className={styles.section}>
      <h2>Geographic registration and provenance</h2>
      <p>EPSG:32643 (WGS84 / UTM zone 43N). Crop [west, south, east, north], metres: {review.boundsMetres.join(", ")}. Output {review.width} × {review.height}; approximately square 22.46m ground pixels. Geographic corner coordinates are retained in data/mumbai-imagery/review.json. This projected rectangle is not a longitude/latitude rectangle.</p>
      <p>North tile 43QBB supplies the overlap; 43QBA supplies the southern strip from the same overpass. No cross-date mosaic, coastline editing, or generative imagery. The displayed outline is historical administrative data and can disagree with today&apos;s reclaimed coastline.</p>
      <ul>{chosen.sources.map(s => <li key={s.id}><a href={s.itemUrl} target="_blank" rel="noopener noreferrer">{s.id} — source metadata</a></li>)}</ul>
      <p>Imagery: Contains modified Copernicus Sentinel data 2025, 2026. Accessed through <a href="https://registry.opendata.aws/sentinel-2-l2a-cogs/" target="_blank" rel="noopener noreferrer">AWS Open Data / Element 84 Earth Search</a>. <a href="https://cds.climate.copernicus.eu/licences/ec-sentinel" target="_blank" rel="noopener noreferrer">Sentinel data legal notice</a>.</p>
      <p>Boundary: Pune chapter of the DataMeet Trust, Bangalore, India. <a href="https://github.com/datameet/Municipal_Spatial_Data/tree/master/Mumbai" target="_blank" rel="noopener noreferrer">DataMeet BMC ward data</a>, file commit 19 August 2016, survey date unknown. Dissolved union and projected derivatives: <a href="https://creativecommons.org/licenses/by-sa/2.5/in/" target="_blank" rel="noopener noreferrer">CC BY-SA 2.5 India</a>. No segments invented; no simplification. Imagery is separately licensed.</p>
      <p>Locality anchors: <a href="https://www.geonames.org/export/" target="_blank" rel="noopener noreferrer">GeoNames, CC BY</a>. Individual source links and original coordinates are retained in the manifest.</p>
      <p>The assets are public static files even though this review page is development-only. Do not treat the development route guard as asset access control.</p>
    </section>
  </main>;
}
