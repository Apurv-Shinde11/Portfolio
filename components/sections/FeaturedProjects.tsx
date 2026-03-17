"use client";

import { projects, type ProjectCategory } from "@/data/projects";
import { useMemo, useState } from "react";

export default function FeaturedProjects() {
  const [category, setCategory] = useState<"All" | ProjectCategory>("All");

  const visible = useMemo(() => {
    if (category === "All") return projects;
    return projects.filter((p) => p.category === category);
  }, [category]);

  return (
    <section
      id="projects"
      className="border-t border-zinc-900/80 bg-zinc-950/95"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 md:px-10 lg:px-12 lg:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Featured Work
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
              Coding + data analysis projects with real outputs.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
            A selection of systems where I combined{" "}
            <span className="font-medium text-zinc-100">
              data modeling, automation, and business context
            </span>{" "}
            to remove friction from real workflows.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(["All", "Coding", "Data Analysis"] as const).map((value) => {
            const active = category === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setCategory(value)}
                className={[
                  "rounded-full border px-4 py-1.5 text-xs font-medium transition",
                  active
                    ? "border-zinc-400/80 bg-zinc-50 text-zinc-950"
                    : "border-zinc-800/80 bg-zinc-950/60 text-zinc-200 hover:border-zinc-500/80 hover:bg-zinc-900/60",
                ].join(" ")}
              >
                {value}
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-4 transition hover:-translate-y-1 hover:border-zinc-500/80 hover:bg-zinc-900/80"
            >
              <div>
                <h3 className="text-sm font-semibold text-zinc-50 md:text-base">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400 md:text-sm">
                  {project.summary}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-900/80 px-2 py-0.5 text-[10px] font-medium text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-zinc-800/80 bg-zinc-950/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                    {project.category}
                  </span>
                  {project.effort ? (
                    <span className="rounded-full border border-zinc-800/80 bg-zinc-950/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                      {project.effort}
                    </span>
                  ) : null}
                </div>
              </div>

              {project.highlights?.length ? (
                <ul className="mt-4 space-y-1.5 text-xs text-zinc-400">
                  {project.highlights.slice(0, 3).map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {project.links?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/60 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-zinc-500/80 hover:bg-zinc-900/60"
                    >
                      {link.label}
                      <span aria-hidden className="text-zinc-500">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

