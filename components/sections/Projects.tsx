"use client";

import Link from "next/link";
import {
  analyticsProjectIdentities,
  codingProjectIdentities,
} from "@/data/project-identities";

const analyticsProjects = analyticsProjectIdentities;
const codingProjects = codingProjectIdentities;

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">

      <div className="mb-12 max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
          Featured Projects
        </h2>
      </div>

      <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
        <div>
          <Link
            href="/projects/analysis"
            className="group block rounded-2xl p-8 transition hover:-translate-y-1"
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
          <ul className="mt-3 space-y-2" aria-label="Selected analytics projects">
            {analyticsProjects.map(({ name, accent, icon: Icon }) => (
              <li
                key={name}
                className="flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm"
                style={{
                  borderColor: `color-mix(in srgb, ${accent} 26%, var(--card-border))`,
                  backgroundColor: `color-mix(in srgb, ${accent} 10%, var(--background))`,
                  color: "var(--foreground-muted)",
                }}
              >
                <span className="pr-2 leading-relaxed">{name}</span>
                <Icon
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: accent }}
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Link
            href="/projects/coding"
            className="group block rounded-2xl p-8 transition hover:-translate-y-1"
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
          <ul className="mt-3 space-y-2" aria-label="Selected coding projects">
            {codingProjects.map(({ name, accent, icon: Icon }) => (
              <li
                key={name}
                className="flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm"
                style={{
                  borderColor: `color-mix(in srgb, ${accent} 26%, var(--card-border))`,
                  backgroundColor: `color-mix(in srgb, ${accent} 10%, var(--background))`,
                  color: "var(--foreground-muted)",
                }}
              >
                <span className="pr-2 leading-relaxed">{name}</span>
                <Icon
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: accent }}
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
