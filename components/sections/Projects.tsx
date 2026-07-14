"use client";

import Link from "next/link";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">

      <div className="mb-12 max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
          Projects
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">

        <Link
          href="/projects/analysis"
          className="group rounded-2xl p-8 transition hover:-translate-y-1"
          style={{ border: "1px solid var(--card-border)", backgroundColor: "var(--card-bg)" }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--card-hover-border)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--card-border)")}
        >
          <h3 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>
            Analytics Projects
          </h3>
          <p className="mt-3 text-sm" style={{ color: "var(--foreground-muted)" }}>
            Data analysis, dashboards, financial modeling, and decision-driven analytical systems.
          </p>
          <span className="mt-6 inline-block text-sm transition" style={{ color: "var(--link-accent)" }}>
            View Analytics Projects →
          </span>
        </Link>

        <Link
          href="/projects/coding"
          className="group rounded-2xl p-8 transition hover:-translate-y-1"
          style={{ border: "1px solid var(--card-border)", backgroundColor: "var(--card-bg)" }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--card-hover-border)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--card-border)")}
        >
          <h3 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>
            Coding Projects
          </h3>
          <p className="mt-3 text-sm" style={{ color: "var(--foreground-muted)" }}>
            Python tools, automation systems, data pipelines, and software-based analytics applications.
          </p>
          <span className="mt-6 inline-block text-sm transition" style={{ color: "var(--link-accent)" }}>
            View Coding Projects →
          </span>
        </Link>

      </div>
    </section>
  );
}
