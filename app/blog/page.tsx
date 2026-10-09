import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPostDate, getPublishedPosts } from "@/data/posts";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Ideas in Progress",
  description: "Personal reflections on curiosity, building things, and figuring things out along the way.",
};

export default function BlogIndexPage() {
  return (
    <main id="content" className={styles.blog}>
      <section className="border-b" style={{ borderColor: "var(--section-border)" }}>
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 lg:px-12 lg:py-20">
          <p className={styles.eyebrow}>BLOG / NOTES & REFLECTIONS</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Ideas in progress.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
            A space for thoughts, ideas, and questions I&apos;m researching, exploring, and thinking through.
          </p>
        </div>
      </section>
      <section aria-labelledby="published-heading" className="mx-auto w-full max-w-6xl px-6 py-14 md:px-10 lg:px-12 lg:py-20">
        <h2 id="published-heading" className={styles.eyebrow}>THE WRITING</h2>
        <div className="mt-7 space-y-6">
          {getPublishedPosts().map((post) => (
            <article key={post.slug} className={styles.postCard}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs" style={{ color: "var(--foreground-muted)" }}>
                <span style={{ color: "var(--link-accent)" }}>{post.category}</span>
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                {post.readingTime && <span>{post.readingTime} read</span>}
              </div>
              <h3 className="mt-6 max-w-2xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                <Link href={`/blog/${post.slug}`} className={styles.titleLink}>{post.title}</Link>
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: "var(--foreground-muted)" }}>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className={`${styles.textLink} mt-8 inline-flex items-center gap-2 text-sm font-medium`} aria-label={`Read ${post.title}`}>
                Read the story <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
