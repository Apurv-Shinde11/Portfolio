import { projects } from "@/data/projects";
import Link from "next/link";

export default function FurtherWork() {
  const oneDay = projects.filter((p) => p.effort === "One Day Build").slice(0, 4);
  const larger = projects
    .filter((p) => p.effort === "Larger Project")
    .slice(0, 4);

  return (
    <section
      id="further-work"
      className="border-t border-zinc-900/80 bg-zinc-950/95"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 md:px-10 lg:px-12 lg:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Further Work
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
              Quick builds and deeper systems work.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
            Inspired by how{" "}
            <a
              href="https://www.sld.codes/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-zinc-200 underline underline-offset-4 decoration-zinc-700/60 hover:decoration-zinc-300"
            >
              sld.codes
            </a>{" "}
            groups projects: fast experiments vs projects that take weeks.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-50">
                  One Day Builds
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Fast prototypes, experiments, and focused deliverables.
                </p>
              </div>
              <Link
                href="/projects"
                className="text-xs font-semibold text-zinc-300 hover:text-zinc-50"
              >
                See all →
              </Link>
            </div>

            <ul className="mt-4 space-y-3">
              {oneDay.map((p) => (
                <li key={p.slug} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-zinc-200">
                      {p.title}
                    </span>
                    <span className="rounded-full border border-zinc-800/80 bg-zinc-950/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                      {p.category}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400">{p.summary}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-50">
                  Larger Projects
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Systems designed for repeatability, validation, and scale.
                </p>
              </div>
              <Link
                href="/projects"
                className="text-xs font-semibold text-zinc-300 hover:text-zinc-50"
              >
                See all →
              </Link>
            </div>

            <ul className="mt-4 space-y-3">
              {larger.map((p) => (
                <li key={p.slug} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-zinc-200">
                      {p.title}
                    </span>
                    <span className="rounded-full border border-zinc-800/80 bg-zinc-950/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                      {p.category}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400">{p.summary}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

