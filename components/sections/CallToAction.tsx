import { site } from "@/data/site";

export default function CallToAction() {
  return (
    <section
      id="contact"
      className="border-t border-zinc-900/80 bg-zinc-950/95"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center md:px-10 lg:px-12 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Next Collaboration
        </p>
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
          Let&apos;s build smarter systems—not just prettier spreadsheets.
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
          If you&apos;re hiring for{" "}
          <span className="font-medium text-zinc-100">
            Data Analyst, Business Analyst, or automation‑focused roles
          </span>
          , I&apos;d love to walk you through the systems I&apos;ve already
          built.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-zinc-50 px-6 py-2.5 text-sm font-medium text-zinc-950 shadow-[0_0_40px_rgba(250,250,250,0.25)] transition hover:-translate-y-0.5 hover:bg-white"
          >
            Contact Me
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/60 px-6 py-2.5 text-sm font-medium text-zinc-100 transition hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-900"
          >
            Let&apos;s Collaborate
          </a>
        </div>
      </div>
    </section>
  );
}

