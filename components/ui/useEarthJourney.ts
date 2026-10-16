"use client";

import { useEffect, useRef, useState } from "react";
import type { JourneyState } from "./earth-journey";

/** Shared renderer lifecycle for the homepage and development preview. */
export function useEarthJourney(overview = false) {
  const host = useRef<HTMLDivElement>(null);
  const restart = useRef(() => {});
  const [state, setState] = useState<JourneyState>("IDLE_EARTH");
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const [imagery, setImagery] = useState<"loading" | "ready" | "failed">("loading");
  useEffect(() => {
    const element = host.current, section = element?.closest("section");
    if (!element || !section) return;
    const abort = new AbortController();
    let dispose: (() => void) | undefined;
    const fallback = () => {
      if (!abort.signal.aborted) { setStatus("fallback"); setImagery("failed"); }
    };
    let started = false;
    const start = () => {
      if (started || abort.signal.aborted) return;
      started = true;
      import("./earth-renderer").then(async ({ createEarth }) => {
        if (abort.signal.aborted) return;
        const cleanup = await createEarth(element, fallback, abort.signal, {
          journey: { section, overview, onState: setState, onImagery: setImagery, registerRestart: fn => { restart.current = fn; } },
        });
        if (abort.signal.aborted) cleanup();
        else { dispose = cleanup; setStatus("ready"); }
      }).catch(fallback);
    };
    // Prepare before section entry without competing with the initial hero load.
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { preload.disconnect(); start(); }
    }, { rootMargin: "600px 0px" });
    preload.observe(section);
    return () => { abort.abort(); preload.disconnect(); dispose?.(); };
  }, [overview]);
  return { host, restart, state, status, imagery };
}
