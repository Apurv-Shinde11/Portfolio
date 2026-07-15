"use client";

import Link from "next/link";
import { useState } from "react";

type Project = {
  title: string;
  description: string;
  tools: string[];
  slug: string;
  github?: string;
  externalLink?: boolean;
  details?: {
    overview: string;
    howItWorks: { step: string; detail: string }[];
    capabilities: string[];
    outcome: string;
  };
};

const projects: Project[] = [
  {
    title: "Economic Research Model",
    description:
      "A Python-based model designed to study macroeconomic regimes and their impact on asset behavior. The model synthesizes macro indicators, market trends, and competitive intelligence to identify how different economic environments influence investment strategies and asset performance.",
    tools: ["Python", "Pandas", "APIs", "Financial markets", "Macroeconomic Analysis"],
    slug: "economic-research-model",
    externalLink: true,
  },
  {
    title: "Income Tax Return (ITR) Automation System",
    description:
      "An automation framework designed to streamline the preparation and processing of Income Tax Returns by structuring financial data inputs and automating repetitive compliance tasks.",
    tools: ["Python", "Process Automation", "Compliance data handling", "Data Handling", "Workflow Automation", "Financial Operations"],
    slug: "itr-automation",
    details: {
      overview:
        "The ITR Automation System eliminates the manual, error-prone process of preparing income tax returns. By structuring raw financial data inputs into a standardized pipeline, the system automates repetitive compliance tasks — reducing preparation time significantly and minimizing the risk of filing errors.",
      howItWorks: [
        { step: "Data Ingestion", detail: "Accepts structured financial inputs — salary slips, investment proofs, bank statements — and normalizes them into a unified schema." },
        { step: "Computation Engine", detail: "Applies current Indian tax slabs, deductions (80C, 80D, HRA), and exemption rules to compute gross tax liability automatically." },
        { step: "Validation Layer", detail: "Cross-checks computed values against input data to flag inconsistencies or missing fields before any filing action." },
        { step: "Output Generation", detail: "Produces a structured, review-ready ITR summary that maps directly to the official form structure, ready for submission or advisor review." },
      ],
      capabilities: [
        "Automates tax slab computation under both old and new regime",
        "Handles multiple deduction categories (80C, 80D, HRA, LTA)",
        "Flags missing or inconsistent data before processing",
        "Reduces manual preparation effort by 60–70%",
        "Generates a structured output ready for filing or advisor review",
      ],
      outcome:
        "Built to solve a real friction point in Indian personal finance — ITR filing is annual, high-stakes, and deeply manual for most individuals. This system makes the process auditable, repeatable, and fast.",
    },
  },
  {
    title: "Sports Recommendation System",
    description:
      "A Python-based recommendation tool that recommends sports based on user inputs and live camera analysis. Final output — the most suitable sport to pursue based on the user's body dimensions.",
    tools: ["Python", "NumPy", "OpenCV", "Computer Vision", "Recommendation Systems", "Streamlit"],
    slug: "recommendation-system",
    details: {
      overview:
        "The Sports Recommendation System uses computer vision and body dimension analysis to recommend the most suitable sports for a user. Rather than relying purely on self-reported preferences, it combines live camera input with a recommendation engine to provide objective, data-backed sport suggestions.",
      howItWorks: [
        { step: "User Input", detail: "User provides basic profile inputs (age, fitness level, preferences) via a Streamlit interface." },
        { step: "Camera Analysis", detail: "OpenCV captures a live frame and estimates body proportions — height, limb ratios, and build classification using pose estimation." },
        { step: "Scoring Engine", detail: "NumPy-based scoring model weighs body dimensions against sport-specific physical profiles (e.g. height for basketball, endurance build for cycling)." },
        { step: "Recommendation Output", detail: "Returns a ranked list of suitable sports with match scores, along with the single most recommended sport and rationale." },
      ],
      capabilities: [
        "Live camera-based body dimension estimation via OpenCV",
        "Multi-factor scoring across 15+ sports categories",
        "Combines subjective preferences with objective physical data",
        "Streamlit UI — no installation required for end users",
        "Extensible sport profile database",
      ],
      outcome:
        "A unique project at the intersection of computer vision and recommendation systems — demonstrates applied ML thinking beyond standard classification tasks.",
    },
  },
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio website designed to showcase projects, technical skills, and analytical work — the site you are currently viewing.",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    slug: "portfolio-website",
    details: {
      overview:
        "Designed and built from scratch as a living showcase of technical and analytical work. The site prioritizes clean information hierarchy, responsive design, and a dual dark/light theme system — all deployed on Vercel with automatic GitHub CI/CD.",
      howItWorks: [
        { step: "Framework", detail: "Built on Next.js 15 with TypeScript for type-safe component development and file-based routing across all project pages." },
        { step: "Styling", detail: "Tailwind CSS with a custom CSS variable system powering a fully responsive dark/light theme toggle — no flash on load thanks to an inline hydration script." },
        { step: "Content", detail: "Project data is managed through typed data files (data/projects.ts, data/site.ts), keeping content and presentation cleanly separated." },
        { step: "Deployment", detail: "Connected to GitHub via Vercel — every push to main triggers an automatic production build and deploy to apurvashinde.com within ~60 seconds." },
      ],
      capabilities: [
        "Dark/light theme toggle with localStorage persistence and no flash",
        "Fully responsive across mobile, tablet, and desktop",
        "Pixel-accurate custom CSS design system with CSS variables",
        "Automatic CI/CD via GitHub → Vercel pipeline",
        "Optimized image delivery via Next.js Image component",
      ],
      outcome:
        "The portfolio itself is a project — demonstrating frontend engineering, design thinking, and deployment discipline in one place.",
    },
  },
  {
    title: "Flight Planning Optimizer",
    description:
      "Uses Dijkstra's algorithm to determine shortest air routes between two airports — optimizing time, fuel consumption, and operational efficiency.",
    tools: ["Python", "Data Structures & Algorithms", "Streamlit", "Aviation"],
    slug: "flight-planning-optimizer",
    github: "https://github.com/Apurv-Shinde11/Air-Travel-Optimization",
    details: {
      overview:
        "The Flight Planning Optimizer applies graph theory to the real-world problem of route optimization in aviation. Using Dijkstra's shortest path algorithm on a network of airports and routes, it computes the most efficient flight path between any two airports — minimizing distance, time, or fuel cost depending on the selected optimization parameter.",
      howItWorks: [
        { step: "Graph Construction", detail: "Airport nodes and flight route edges are loaded into a weighted graph structure, with edge weights representing distance or flight time." },
        { step: "Algorithm Execution", detail: "Dijkstra's algorithm traverses the graph from the origin airport, computing cumulative costs to all reachable nodes until the destination is reached." },
        { step: "Path Extraction", detail: "The optimal path is traced back from destination to origin using a parent node map, producing the full route sequence." },
        { step: "Streamlit Output", detail: "Results are displayed in an interactive Streamlit UI showing the optimal route, total distance, estimated flight time, and comparison with alternative routes." },
      ],
      capabilities: [
        "Dijkstra's algorithm on a real airport-route graph",
        "Supports optimization by distance, time, or fuel proxy",
        "Interactive origin-destination airport selector",
        "Displays full route sequence with intermediate stops",
        "Compares optimal vs. alternative routes",
      ],
      outcome:
        "A clean demonstration of DSA fundamentals applied to a real-world logistics problem — showing that algorithmic thinking directly translates to operational efficiency gains.",
    },
  },
  {
    title: "Heart Risk Prediction Model",
    description:
      "Predicts the risk of heart disease based on patient data including age, cholesterol, blood pressure, and lifestyle factors using machine learning.",
    tools: ["Python", "Predictive Modeling", "Medical Data Analysis", "Machine Learning", "XGBoost"],
    slug: "heart-risk-prediction-model",
    github: "https://github.com/Apurv-Shinde11/Heart-Disease-XGBoost",
    details: {
      overview:
        "The Heart Risk Prediction Model uses XGBoost — a gradient-boosted decision tree algorithm — to classify patients as high or low risk for heart disease based on clinical indicators. Trained on medical datasets, the model provides risk assessments with data-backed accuracy to support early intervention and preventive care decisions.",
      howItWorks: [
        { step: "Data Preparation", detail: "Patient records are cleaned, missing values handled, and categorical variables (chest pain type, ECG results) encoded for model input." },
        { step: "Feature Engineering", detail: "Key clinical features are selected and normalized: age, resting BP, cholesterol, max heart rate, ST depression, and exercise-induced angina." },
        { step: "Model Training", detail: "XGBoost classifier trained with cross-validation and hyperparameter tuning (learning rate, max depth, n_estimators) to optimize AUC-ROC." },
        { step: "Risk Output", detail: "Model outputs a binary risk classification (high/low) with a confidence probability score, enabling clinicians to prioritize follow-up." },
      ],
      capabilities: [
        "XGBoost classifier with cross-validated AUC-ROC optimization",
        "Handles 13 clinical input features from standard diagnostic tests",
        "Outputs risk classification with confidence probability",
        "Feature importance visualization to explain predictions",
        "Tested on UCI Heart Disease dataset benchmarks",
      ],
      outcome:
        "Demonstrates applied machine learning in healthcare — a domain where model interpretability and accuracy both matter. The feature importance layer ensures predictions aren't black-box.",
    },
  },
];

export default function CodingProjects() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  function toggle(slug: string) {
    setExpandedSlug(prev => (prev === slug ? null : slug));
  }

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-24">

        {/* Page Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-sm font-medium mb-3" style={{ color: "var(--link-accent)" }}>
            Engineering
          </p>
          <h1 className="text-4xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
            Coding Projects
          </h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
            Python tools, automation systems, data pipelines, and software-based analytics applications — projects that took weeks, months, and sometimes years.
          </p>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="rounded-2xl transition"
              style={{
                border: `1px solid ${expandedSlug === project.slug ? "var(--card-hover-border)" : "var(--card-border)"}`,
                backgroundColor: "var(--card-bg)",
              }}
            >
              {/* Card Header — always visible */}
              <div className="p-7">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono font-medium" style={{ color: "var(--link-accent)" }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--foreground-muted)" }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full px-3 py-1 text-xs font-medium"
                          style={{
                            border: "1px solid var(--card-border)",
                            color: "var(--foreground-muted)",
                            backgroundColor: "var(--social-hover-bg)",
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right — links */}
                  <div className="flex flex-row md:flex-col items-start gap-3 md:min-w-[140px] md:items-end">
                    {project.externalLink ? (
                      <Link
                        href={`/projects/coding/${project.slug}`}
                        className="text-sm font-medium transition whitespace-nowrap"
                        style={{ color: "var(--link-accent)" }}
                      >
                        View Project →
                      </Link>
                    ) : (
                      <button
                        onClick={() => toggle(project.slug)}
                        className="text-sm font-medium transition whitespace-nowrap text-left"
                        style={{ color: "var(--link-accent)" }}
                      >
                        {expandedSlug === project.slug ? "Close ↑" : "View Project →"}
                      </button>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition whitespace-nowrap"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>

                </div>
              </div>

              {/* Expanded Detail Panel */}
              {expandedSlug === project.slug && project.details && (
                <div
                  className="px-7 pb-8 pt-2"
                  style={{ borderTop: "1px solid var(--card-border)" }}
                >

                  {/* Overview */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--foreground)" }}>
                      Overview
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                      {project.details.overview}
                    </p>
                  </div>

                  {/* How It Works */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: "var(--foreground)" }}>
                      How It Works
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {project.details.howItWorks.map((item, i) => (
                        <div
                          key={i}
                          className="rounded-xl p-4"
                          style={{
                            border: "1px solid var(--card-border)",
                            backgroundColor: "var(--social-hover-bg)",
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-mono" style={{ color: "var(--link-accent)" }}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                              {item.step}
                            </p>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--foreground)" }}>
                      Key Capabilities
                    </h4>
                    <ul className="space-y-2">
                      {project.details.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
                          <span style={{ color: "var(--link-accent)" }}>→</span>
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcome */}
                  <div
                    className="rounded-xl p-4"
                    style={{
                      border: "1px solid var(--card-border)",
                      backgroundColor: "var(--social-hover-bg)",
                    }}
                  >
                    <h4 className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--foreground)" }}>
                      Outcome
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                      {project.details.outcome}
                    </p>
                  </div>

                </div>
              )}

            </div>
          ))}
        </div>

        {/* Back to Home */}
        <div className="mt-20 flex justify-start">
          <Link
            href="/"
            className="rounded-full px-6 py-2 text-sm transition"
            style={{
              border: "1px solid var(--card-border)",
              color: "var(--foreground-muted)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--card-hover-border)";
              e.currentTarget.style.color = "var(--link-accent)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--card-border)";
              e.currentTarget.style.color = "var(--foreground-muted)";
            }}
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}
