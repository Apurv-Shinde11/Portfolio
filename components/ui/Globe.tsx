"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Globe.module.css";

export default function MumbaiGlobe() {
  const host = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  useEffect(() => {
    const controller = new AbortController();
    let dispose: (() => void) | undefined;
    const element = host.current;
    if (!element) return;
    import("./earth-renderer").then(async ({ createEarth }) => {
      if (controller.signal.aborted) return;
      dispose = await createEarth(element, () => setStatus("fallback"), controller.signal);
      if (controller.signal.aborted) dispose();
      else setStatus("ready");
    }).catch(() => { if (!controller.signal.aborted) setStatus("fallback"); });
    return () => { controller.abort(); dispose?.(); };
  }, []);
  return (
    <figure className={styles.figure} aria-label={status === "ready" ? "Mumbai on Earth with approximate current day and night illumination" : "Static world map and Mumbai coordinates"}>
      <div className={styles.stage} data-earth-status={status}>
        {status !== "ready" && (
          <div className={styles.fallback}>
            <Image src="/earth/day.webp" alt="NASA world map. Mumbai is at 19.076 degrees north, 72.8777 degrees east." width={2048} height={1024} sizes="280px" />
            <p>{status === "fallback" ? "Interactive Earth unavailable." : "Earth map preview."} Mumbai, India: 19.076° N, 72.878° E.</p>
          </div>
        )}
        <div ref={host} className={styles.canvasHost} />
      </div>
      <figcaption className={styles.caption}>
        {status === "ready" ? "Approximate solar illumination" : "Static geographic map"} · <a href="https://science.nasa.gov/earth/earth-observatory/earth-at-night/maps/" target="_blank" rel="noopener noreferrer">NASA Earth Observatory<span className="sr-only"> imagery, opens in a new tab</span></a>
      </figcaption>
    </figure>
  );
}
