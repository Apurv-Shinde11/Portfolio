import { posts } from "@/data/posts";
import Link from "next/link";

function toDateLabel(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main id="content" className="bg-zinc-950 text-zinc-50">
      <section className="border-b border-zinc-900/80 bg-zinc-950/95">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 md:px-10 lg:px-12 lg:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Blog
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
                Writing
              </h1>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
              Posts about building automation-first analytics systems and
              production-style projects.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {sorted.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-4 transition hover:-translate-y-1 hover:border-zinc-500/80 hover:bg-zinc-900/80"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 text-[11px] text-zinc-500">
                    <span className="rounded-full border border-zinc-800/80 bg-zinc-950/60 px-2 py-0.5 font-semibold uppercase tracking-wide text-zinc-400">
                      {post.category}
                    </span>
                    <span>{toDateLabel(post.date)}</span>
                  </div>
                  <h2 className="mt-3 text-base font-semibold text-zinc-50">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium text-zinc-300 underline-offset-4 transition group-hover:text-zinc-50 group-hover:underline"
                  >
                    Read post →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

