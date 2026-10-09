import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "View and download Apurva Shinde's resume.",
};

const linkStyle = "inline-flex min-h-11 items-center rounded-full border px-5 py-2.5 text-sm font-medium hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--link-accent)]";

export default function ResumePage() {
  return (
    <main id="content" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <section className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10 lg:px-12 lg:py-16" aria-labelledby="resume-title">
        <Link href="/about" className="text-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--link-accent)]" style={{ color: "var(--link-accent)" }}>Back to About Me</Link>
        <h1 id="resume-title" className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">Resume</h1>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--foreground-muted)" }}>View my resume below, or open and download the PDF.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={site.resumeHref} target="_blank" rel="noopener noreferrer" className={linkStyle} style={{ borderColor: "var(--card-border)", color: "var(--link-accent)" }}>Open PDF <span className="sr-only">in a new tab</span></a>
          <a href={site.resumeHref} download className={linkStyle} style={{ borderColor: "var(--card-border)", backgroundColor: "var(--foreground)", color: "var(--background)" }}>Download PDF</a>
        </div>
        <iframe
          src={site.resumeHref}
          title="Apurva Shinde resume PDF viewer"
          className="mt-8 block w-full rounded-xl border"
          style={{ height: "70dvh", borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
        />
        <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
          If the preview is unavailable or difficult to read, <a href={site.resumeHref} className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--link-accent)]" style={{ color: "var(--link-accent)" }}>open the resume PDF directly</a>.
        </p>
      </section>
    </main>
  );
}
