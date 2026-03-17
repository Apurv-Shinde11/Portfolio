export type ProjectCategory = "Coding" | "Data Analysis";

export type ProjectEffort = "One Day Build" | "Larger Project";

export type ProjectLink = {
  label: "GitHub" | "Live" | "Case Study";
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  effort?: ProjectEffort;
  tags: string[];
  highlights?: string[];
  links?: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "automated-balance-sheet-generator",
    title: "Automated Balance Sheet Generator",
    summary:
      "Transforms raw financial entries into structured balance sheets in minutes, not hours.",
    category: "Data Analysis",
    effort: "Larger Project",
    tags: ["Python", "Automation", "Financial Modeling", "Excel"],
    highlights: [
      "Input validation + guardrails to catch inconsistent entries early.",
      "Repeatable templates so the output stays consistent month to month.",
      "Designed to reduce manual copy/paste and reconciliation time.",
    ],
  },
  {
    slug: "itr-automation-system",
    title: "ITR Automation System",
    summary:
      "Streamlines income tax return preparation with rule-based checks and data validation.",
    category: "Coding",
    effort: "Larger Project",
    tags: ["Python", "Data Validation", "Workflow Automation"],
    highlights: [
      "Rule-based checks to reduce preventable errors.",
      "Standardized inputs to speed up preparation and review.",
    ],
  },
  {
    slug: "ai-financial-advisory-market-research",
    title: "AI Financial Advisory Market Research",
    summary:
      "Combines domain data and AI to map advisory opportunities and risk profiles.",
    category: "Data Analysis",
    effort: "One Day Build",
    tags: ["AI", "Research", "Data Analysis"],
    highlights: [
      "Synthesized market + domain inputs into decision-ready themes.",
      "Focused on pragmatic use-cases (summarize/classify/recommend).",
    ],
  },
  {
    slug: "alphapilot-trading-bot",
    title: "Trading Bot · AlphaPilot",
    summary:
      "Experimented with systematic strategies and backtesting to evaluate trading hypotheses.",
    category: "Coding",
    effort: "One Day Build",
    tags: ["Python", "Backtesting", "Automation"],
    highlights: [
      "Backtesting loop to validate hypotheses before live execution.",
      "Emphasis on repeatable evaluation rather than single-run results.",
    ],
  },
  {
    slug: "sports-recommendation-system",
    title: "Sports Recommendation System",
    summary:
      "Recommends players/content based on performance metrics and engagement signals.",
    category: "Coding",
    effort: "Larger Project",
    tags: ["Machine Learning", "Python", "Recommendation"],
    highlights: [
      "Feature design grounded in measurable performance signals.",
      "Recommendation outputs focused on explainability and usability.",
    ],
  },
  {
    slug: "reference-data-ops-suite",
    title: "Reference Data Ops Suite",
    summary:
      "Prototype toolkit for cleaning, standardizing, and monitoring reference data quality.",
    category: "Data Analysis",
    effort: "One Day Build",
    tags: ["Data Ops", "Python", "Quality Monitoring"],
    highlights: [
      "Standardization patterns to reduce downstream mismatches.",
      "Quality monitoring concepts (basic checks + trend visibility).",
    ],
  },
];

