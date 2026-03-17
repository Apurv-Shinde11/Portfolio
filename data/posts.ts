export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  category: "dev" | "data" | "career" | "misc";
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "building-automation-first-analytics",
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

