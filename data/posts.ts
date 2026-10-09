export type InlineText = string | { text: string; emphasis: true };
export type PostParagraph = {
  text: InlineText[];
  treatment?: "block-assembly" | "paragraph-reveal" | "question-shift" | "closing" | "signature";
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  category: "dev" | "data" | "career" | "misc" | "Personal / Reflections";
  status: "draft" | "published";
  subtitle?: string;
  readingTime?: string;
  content: (string | PostParagraph)[];
};

export const posts: Post[] = [
  {
    slug: "ive-always-liked-building-things",
    title: "Beyond the Manual",
    subtitle: "On curiosity, growing up, and figuring things out along the way.",
    excerpt: "From LEGO pieces to code, datasets, and dashboards — the tools change. The curiosity remains.",
    date: "2026-10-09",
    category: "Personal / Reflections",
    readingTime: "1 min",
    status: "published",
    content: [
      { text: ["As a kid, I loved LEGO. The manual showed how to build a house, but I wanted ships, aircraft, trucks, and whatever else I could imagine."], treatment: "block-assembly" },
      { text: ["The fun wasn't following instructions. It was discovering what else was possible."], treatment: "paragraph-reveal" },
      "Between cycling with friends and playing gully cricket, I was always curious. How do things work? Why? Could they work differently?",
      "Growing up complicated those questions. Suddenly, curiosity had to fit into a career path. My interests stretched across technology, AI, finance, economics, and aviation. Sometimes exciting, sometimes confusing.",
      "But perhaps not everything needs to connect immediately.",
      "Eventually, LEGO pieces became code, datasets, and dashboards. The tools changed, but the satisfaction of building something from nothing remained.",
      { text: ["My questions evolved too. From ", { text: "How does it work?", emphasis: true }, " to ", { text: "Why does it matter?", emphasis: true }], treatment: "question-shift" },
      "That shift eventually led me toward business and corporate strategy, where understanding information matters as much as using it to make decisions.",
      "Now, I'm adding writing to the mix. Not because I've figured everything out, but because I haven't.",
      "A space to explore ideas, document experiences, and connect seemingly unrelated interests.",
      "After all, why limit yourself to what the manual says?",
      { text: ["The tools change. The curiosity remains."], treatment: "closing" },
      { text: ["So, this is where I begin."], treatment: "signature" },
    ],
  },
  {
    slug: "building-automation-first-analytics",
    status: "draft",
    title: "Building automation-first analytics",
    excerpt:
      "Why I focus on repeatable systems (pipelines, checks, templates) rather than one-off dashboards.",
    date: "2026-02-27",
    category: "data",
    content: [
      "Dashboards are useful, but many teams lose time upstream: collecting inputs, reconciling numbers, and repeating the same checks every week.",
      "My default approach is to build small systems: a data model, validation rules, templates, and a repeatable runbook. The result is analysis you can trust and reuse.",
      "In upcoming posts I’ll break down projects from raw inputs → cleaned datasets → decision-ready outputs.",
    ],
  },
  {
    slug: "how-i-choose-projects",
    status: "draft",
    title: "How I choose portfolio projects",
    excerpt:
      "A simple checklist for picking projects that demonstrate both coding and business impact.",
    date: "2026-02-20",
    category: "career",
    content: [
      "The best portfolio projects show intent: what problem exists, why it matters, and how you measured improvement.",
      "I aim for projects that combine data modeling + automation + a clear output (report, statement, recommendation, or workflow).",
      "If you can explain trade-offs and validation, your project reads like real work—not a tutorial.",
    ],
  },
];

export function getPublishedPosts() {
  return posts.filter((post) => post.status === "published").sort((a, b) => b.date.localeCompare(a.date));
}

export function getPublishedPost(slug: string) {
  return posts.find((post) => post.slug === slug && post.status === "published");
}

export function formatPostDate(iso: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
