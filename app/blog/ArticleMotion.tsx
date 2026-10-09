"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./blog.module.css";

// Replay after a genuine scroll-away and return, with separate reset/re-entry distances.
function useScrollReplay<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<"static" | "ready" | "playing">("static");
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let played = false;
    let resetAt: number | null = null;
    let playedAt = window.scrollY;
    let playedCenter = 0;
    let lastScroll = window.scrollY;
    let frame = 0;
    let initialized = false;

    const evaluate = () => {
      frame = 0;
      if (preference.matches) {
        setPhase("static");
        return;
      }
      const y = window.scrollY;
      const scrolled = Math.abs(y - lastScroll) > 1;
      lastScroll = y;
      const box = element.getBoundingClientRect();
      const height = window.innerHeight;
      const center = (box.top + box.bottom) / 2;
      const reading = center >= Math.max(64, height * 0.18) && center <= height * 0.8;
      const visible = box.bottom > 0 && box.top < height;
      const scrollRange = Math.max(0, document.documentElement.scrollHeight - height);
      const awayDistance = Math.max(64, Math.min(Math.max(120, height * 0.22), scrollRange * 0.35));
      if (!initialized) {
        initialized = true;
        setPhase("ready");
      }
      if (played) {
        // Large scroll displacement also works when a short page never fully hides a treatment.
        const movedAwayFromFocus = Math.abs(center - height * 0.5) > Math.abs(playedCenter - height * 0.5) + 48;
        if (scrolled && (!visible || (Math.abs(y - playedAt) >= awayDistance && (!reading || movedAwayFromFocus)))) {
          played = false;
          resetAt = y;
          setPhase("ready");
        }
        return;
      }
      const returning = resetAt === null ||
        (scrolled && Math.abs(y - playedAt) <= Math.abs(resetAt - playedAt) - Math.min(48, awayDistance * 0.4));
      if (reading && returning) {
        played = true;
        playedAt = y;
        playedCenter = center;
        resetAt = null;
        setPhase("playing");
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(evaluate); };
    const resize = () => {
      // Rebase scroll distances without changing phase: resize alone must never replay.
      const delta = window.scrollY - lastScroll;
      playedAt += delta;
      if (resetAt !== null) resetAt += delta;
      lastScroll = window.scrollY;
      if (played) {
        const box = element.getBoundingClientRect();
        playedCenter = (box.top + box.bottom) / 2;
      }
    };
    const preferenceChanged = () => {
      played = false;
      resetAt = null;
      initialized = false;
      schedule();
    };
    const observer = new IntersectionObserver(schedule, { threshold: [0, 0.6, 1] });
    observer.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    preference.addEventListener("change", preferenceChanged);
    schedule();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      preference.removeEventListener("change", preferenceChanged);
    };
  }, []);
  return { ref, entered: phase === "playing", ready: phase !== "static" };
}

export function BlockAssembly() {
  const { ref, entered, ready } = useScrollReplay();
  return (
    <div ref={ref} className={`${styles.assembly} ${ready ? styles.motionReady : ""} ${entered ? styles.entered : ""}`} aria-hidden="true">
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
  const { ref, entered, ready } = useScrollReplay();
  return <div ref={ref} className={`${styles.reveal} ${ready ? styles.motionReady : ""} ${entered ? styles.entered : ""}`}><p>{children}</p></div>;
}

export function QuestionShift({ children }: { children: ReactNode }) {
  const { ref, entered, ready } = useScrollReplay();
  return <div ref={ref} className={`${styles.question} ${ready ? styles.motionReady : ""} ${entered ? styles.entered : ""}`}><p>{children}</p></div>;
}

export function ClosingUnderline({ children }: { children: ReactNode }) {
  const { ref, entered, ready } = useScrollReplay<HTMLParagraphElement>();
  return (
    <p ref={ref} className={`${styles.closing} ${ready ? styles.motionReady : ""} ${entered ? styles.entered : ""}`}>
      <span className={styles.closingText}>
        {children}
        <span className={styles.closingUnderline} aria-hidden="true" />
      </span>
    </p>
  );
}
