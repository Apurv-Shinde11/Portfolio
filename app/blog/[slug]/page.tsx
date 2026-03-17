import { posts } from "@/data/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

function toDateLabel(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <main id="content" className="bg-zinc-950 text-zinc-50">
      <section className="border-b border-zinc-900/80 bg-zinc-950/95">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16 md:px-10 lg:px-12 lg:py-20">
          <div className="flex flex-col gap-3">
            <Link
              href="/blog"
              className="text-xs font-semibold text-zinc-400 hover:text-zinc-50"
            >
              ← Back to blog
            </Link>
            <div className="flex items-center gap-3 text-[11px] text-zinc-500">
              <span className="rounded-full border border-zinc-800/80 bg-zinc-950/60 px-2 py-0.5 font-semibold uppercase tracking-wide text-zinc-400">
                {post.category}
              </span>
              <span>{toDateLabel(post.date)}</span>
            </div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
              {post.title}
            </h1>
            <p className="text-sm leading-relaxed text-zinc-400">
              {post.excerpt}
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-zinc-200">
            {post.content.map((p) => (
              <p key={p} className="text-zinc-300">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

