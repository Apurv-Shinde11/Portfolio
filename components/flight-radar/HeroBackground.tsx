"use client";

import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Squares from "@/components/ui/Squares";
import FlightRadar from "./FlightRadar";
import styles from "./HeroBackground.module.css";

export function SquaresBackground({ paused = false }: { paused?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [colors, setColors] = useState({ border: "transparent", hover: "transparent" });
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    if (typeof matchMedia === "undefined" || typeof IntersectionObserver === "undefined" || typeof MutationObserver === "undefined") return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      setActive(visible && !document.hidden && !preference.matches);
      const theme = getComputedStyle(element);
      setColors({ border: theme.getPropertyValue("--hero-grid").trim(), hover: theme.getPropertyValue("--hero-grid-hover").trim() });
    };
    // Unsupported observers leave a static grid rather than a fragile recovery loop.
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    const theme = new MutationObserver(update);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    document.addEventListener("visibilitychange", update);
    preference.addEventListener("change", update);
    return () => { observer.disconnect(); theme.disconnect(); document.removeEventListener("visibilitychange", update); preference.removeEventListener("change", update); };
  }, []);
  return <div ref={host} className={styles.still} style={active && !paused ? { backgroundImage: "none" } : undefined} aria-hidden="true">
    {active && !paused && <Squares direction="diagonal" speed={0.3} squareSize={60} borderColor={colors.border} hoverFillColor={colors.hover} />}
  </div>;
}

class BackgroundBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export default function HeroBackground({ paused }: { paused: boolean }) {
  const [failed, setFailed] = useState(false);
  const fail = useCallback(() => setFailed(true), []);
  const fallback = <SquaresBackground paused={paused} />;
  return <BackgroundBoundary fallback={fallback}>
    {failed ? fallback : <FlightRadar paused={paused} proposed onFailure={fail} />}
  </BackgroundBoundary>;
}
