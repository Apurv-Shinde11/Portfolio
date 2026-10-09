import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatPostDate, getPublishedPost, getPublishedPosts, type InlineText } from "@/data/posts";
import { BlockAssembly, QuestionShift } from "../ArticleMotion";
import styles from "../blog.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPublishedPost((await params).slug);
  if (!post) notFound();
  return {
    title: post.title,
    description: post.subtitle ?? post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.subtitle ?? post.excerpt,
      publishedTime: post.date,
      section: post.category,
    },
    twitter: { card: "summary", title: post.title, description: post.subtitle ?? post.excerpt },
  };
}

function inlineText(parts: InlineText[]) {
  return parts.map((part, index) => typeof part === "string" ? part : <em key={index}>{part.text}</em>);
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPublishedPost((await params).slug);
  if (!post) notFound();
  return (
    <main id="content" className={styles.blog}>
      <article className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-16 md:px-10 lg:py-20" aria-labelledby="article-title">
        <Link href="/blog" className={`${styles.textLink} inline-flex items-center gap-2 text-sm`}>
          <ArrowLeft size={15} aria-hidden="true" /> Back to blog
        </Link>
        <header className="mt-12 border-b pb-10" style={{ borderColor: "var(--section-border)" }}>
          <p className={styles.eyebrow} style={{ color: "var(--link-accent)" }}>{post.category}</p>
          <h1 id="article-title" className="mt-5 text-balance text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--foreground-muted)" }}>{post.subtitle ?? post.excerpt}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs" style={{ color: "var(--foreground-muted)" }}>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {post.readingTime && <span>{post.readingTime} read</span>}
          </div>
        </header>
        <div className={styles.prose}>
          {post.content.map((paragraph, index) => {
            if (typeof paragraph === "string") return <p key={index}>{paragraph}</p>;
            const text = inlineText(paragraph.text);
            switch (paragraph.treatment) {
              case "block-assembly":
                return <div key={index}><BlockAssembly /><p>{text}</p></div>;
              case "question-shift":
                return <QuestionShift key={index}>{text}</QuestionShift>;
              case "closing":
                return <p key={index} className={styles.closing}>{text}</p>;
              case "signature":
                return <p key={index} className={styles.signature}>{text}</p>;
              default:
                return <p key={index}>{text}</p>;
            }
          })}
        </div>
      </article>
    </main>
  );
}
