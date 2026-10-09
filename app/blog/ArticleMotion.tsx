"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./blog.module.css";

// Observe once; CSS owns the animation and the reduced-motion fallback.
function useOnceInView<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let observer: IntersectionObserver;
    let finished = false;
    const observeReadingArea = () => {
      observer?.disconnect();
      if (finished) return;
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          finished = true;
          setEntered(true);
          observer.disconnect();
          window.removeEventListener("resize", observeReadingArea);
        }
      }, {
        threshold: 0.6,
        // Wait until the treatment is mostly visible above the viewport's lower edge.
        rootMargin: `-64px 0px -${Math.round(window.innerHeight * 0.18)}px 0px`,
      });
      observer.observe(element);
    };
    observeReadingArea();
    window.addEventListener("resize", observeReadingArea);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observeReadingArea);
    };
  }, []);
  return { ref, entered };
}

export function BlockAssembly() {
  const { ref, entered } = useOnceInView();
  return (
    <div ref={ref} className={`${styles.assembly} ${entered ? styles.entered : ""}`} aria-hidden="true">
      <svg viewBox="0 0 144 56" width="144" height="56" focusable="false">
        <g className={styles.block}>
          <rect x="12" y="22" width="32" height="14" rx="2" />
          <rect x="17" y="18" width="7" height="4" rx="1" />
          <rect x="32" y="18" width="7" height="4" rx="1" />
        </g>
        <g className={styles.block}>
          <rect x="54" y="17" width="32" height="14" rx="2" />
          <rect x="59" y="13" width="7" height="4" rx="1" />
          <rect x="74" y="13" width="7" height="4" rx="1" />
        </g>
        <g className={styles.block}>
          <rect x="96" y="28" width="32" height="14" rx="2" />
          <rect x="101" y="24" width="7" height="4" rx="1" />
          <rect x="116" y="24" width="7" height="4" rx="1" />
        </g>
      </svg>
    </div>
  );
}

export function ParagraphReveal({ children }: { children: ReactNode }) {
  const { ref, entered } = useOnceInView();
  return <div ref={ref} className={`${styles.reveal} ${entered ? styles.entered : ""}`}><p>{children}</p></div>;
}

export function QuestionShift({ children }: { children: ReactNode }) {
  const { ref, entered } = useOnceInView();
  return <div ref={ref} className={`${styles.question} ${entered ? styles.entered : ""}`}><p>{children}</p></div>;
}

export function ClosingUnderline({ children }: { children: ReactNode }) {
  const { ref, entered } = useOnceInView<HTMLSpanElement>();
  return (
    <p className={`${styles.closing} ${entered ? styles.entered : ""}`}>
      <span className={styles.closingText}>
        {children}
        <span ref={ref} className={styles.closingUnderline} aria-hidden="true" />
      </span>
    </p>
  );
}
