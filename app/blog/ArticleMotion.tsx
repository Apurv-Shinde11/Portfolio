"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./blog.module.css";

// Observe once; CSS owns the animation and the reduced-motion fallback.
function useOnceInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { ref, entered };
}

export function BlockAssembly() {
  const { ref, entered } = useOnceInView();
  return (
    <div ref={ref} className={`${styles.assembly} ${entered ? styles.entered : ""}`} aria-hidden="true">
      <svg viewBox="0 0 200 88" width="200" height="88" focusable="false">
        <g className={styles.block}>
          <rect x="18" y="55" width="76" height="22" rx="3" />
          <rect x="28" y="49" width="14" height="6" rx="2" />
          <rect x="66" y="49" width="14" height="6" rx="2" />
        </g>
        <g className={styles.block}>
          <rect x="100" y="55" width="76" height="22" rx="3" />
          <rect x="110" y="49" width="14" height="6" rx="2" />
          <rect x="148" y="49" width="14" height="6" rx="2" />
        </g>
        <g className={styles.block}>
          <rect x="59" y="27" width="76" height="22" rx="3" />
          <rect x="69" y="21" width="14" height="6" rx="2" />
          <rect x="107" y="21" width="14" height="6" rx="2" />
        </g>
      </svg>
    </div>
  );
}

export function QuestionShift({ children }: { children: ReactNode }) {
  const { ref, entered } = useOnceInView();
  return <div ref={ref} className={`${styles.question} ${entered ? styles.entered : ""}`}><p>{children}</p></div>;
}
