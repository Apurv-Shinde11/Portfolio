"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { site } from "@/data/site";
import previews from "@/data/resume-previews.json";
import styles from "./ResumePreview.module.css";

export default function ResumePreview() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreScroll = useRef<(() => void) | null>(null);
  const backdropPointer = useRef(false);

  useEffect(() => () => { restoreScroll.current?.(); }, []);

  function openPreview() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal(); // Native modal dialog makes the rest of the page inert and traps focus.
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    const original = {
      position: body.style.position, top: body.style.top, width: body.style.width,
      overflow: body.style.overflow, paddingRight: body.style.paddingRight,
      htmlOverflow: html.style.overflow,
    };
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbarWidth}px`;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    restoreScroll.current = () => {
      Object.assign(body.style, {
        position: original.position, top: original.top, width: original.width,
        overflow: original.overflow, paddingRight: original.paddingRight,
      });
      html.style.overflow = original.htmlOverflow;
      window.scrollTo({ top: scrollY, behavior: "instant" });
      restoreScroll.current = null;
    };
    const pages = dialog.querySelector<HTMLElement>(`[data-resume-pages]`);
    if (pages) pages.scrollTop = 0;
    closeRef.current?.focus({ preventScroll: true });
  }

  function closePreview() { dialogRef.current?.close(); }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openPreview}
        aria-haspopup="dialog"
        aria-controls="resume-preview"
        className="rounded-full px-6 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--link-accent)]"
        style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
      >View Resume</button>
      <dialog
        ref={dialogRef}
        id="resume-preview"
        className={styles.dialog}
        aria-labelledby="resume-preview-title"
        aria-describedby="resume-preview-description"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex="0"]',
          ));
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onCancel={(event) => { event.preventDefault(); closePreview(); }}
        onClose={() => {
          restoreScroll.current?.();
          triggerRef.current?.focus({ preventScroll: true });
        }}
        onPointerDown={(event) => { backdropPointer.current = event.target === event.currentTarget; }}
        onClick={(event) => {
          if (backdropPointer.current && event.target === event.currentTarget) closePreview();
          backdropPointer.current = false;
        }}
      >
        <div className={styles.shell}>
          <header className={styles.toolbar}>
            <div className={styles.heading}>
              <h2 id="resume-preview-title">Résumé</h2>
              <p id="resume-preview-description">{previews.pages.length} {previews.pages.length === 1 ? "page" : "pages"}. Open the PDF for selectable text and document links.</p>
            </div>
            <div className={styles.controls}>
              <a href={site.resumeHref} target="_blank" rel="noopener noreferrer">Open PDF<span className="sr-only"> in a new tab</span></a>
              <a href={site.resumeHref} download>Download PDF</a>
              <button ref={closeRef} type="button" onClick={closePreview} aria-label="Close résumé preview"><X size={18} aria-hidden="true" /><span>Close</span></button>
            </div>
          </header>
          <div data-resume-pages className={styles.pages} tabIndex={0} role="region" aria-label="Résumé document pages">
            {previews.pages.map((page) => (
              <figure key={page.page} className={styles.document}>
                <Image
                  src={page.src}
                  width={page.width}
                  height={page.height}
                  alt={`Apurva Shinde résumé, page ${page.page} of ${previews.pages.length}. Full document available using Open PDF.`}
                  className={styles.pageImage}
                  unoptimized
                />
                <figcaption className="sr-only">Page {page.page} of {previews.pages.length}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
