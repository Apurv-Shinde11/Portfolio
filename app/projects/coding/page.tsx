"use client";

import Link from "next/link";

const projects = [
  {
    title: "Economic Research Model",
    description:
      "A Python-based model designed to study macroeconomic regimes and their impact on asset behavior. The model synthesizes macro indicators, market trends, and competitive intelligence to identify how different economic environments influence investment strategies and asset performance.",
    tools: ["Python", "Pandas", "APIs", "Financial markets", "Macroeconomic Analysis"],
    slug: "economic-research-model",
  },
  {
    title: "Income Tax Return (ITR) Automation System",
    description:
      "An automation framework designed to streamline the preparation and processing of Income Tax Returns by structuring financial data inputs and automating repetitive compliance tasks. The system focuses on improving efficiency, reducing manual effort, and organizing financial information for faster tax filing workflows.",
    tools: ["Python", "Process Automation", "Compliance data handling", "Data Handling", "Workflow Automation", "Financial Operations"],
    slug: "itr-automation",
  },
  {
    title: "Sports Recommendation System",
    description:
      "A Python-based recommendation tool that recommends sports based on user inputs and live camera analysis. The recommendation is a list of sports suitable according to the user's body dimensions. Final output — most suitable sport to pursue.",
    tools: ["Python", "NumPy", "OpenCV", "Computer Vision", "Recommendation Systems", "Streamlit"],
    slug: "recommendation-system",
  },
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio website designed to showcase my projects, technical skills, and analytical work — the site you are currently viewing.",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion", "Vercel"],
    slug: "portfolio-website",
  },
  {
    title: "Flight Planning Optimizer",
    description:
      "Data Structure & Algorithm based experimentation that uses Dijkstra's algorithm to determine shortest air routes between two airports. This helps optimize time, fuel consumption, and operational efficiency for airlines and travelers.",
    tools: ["Python", "Data Structures & Algorithms", "Streamlit", "Aviation"],
    slug: "flight-planning-optimizer",
    github: "https://github.com/Apurv-Shinde11/Air-Travel-Optimization",
  },
  {
    title: "Heart Risk Prediction Model",
    description:
      "An algorithm that predicts the risk of heart disease based on patient data, including age, cholesterol levels, blood pressure, and lifestyle factors. The model uses machine learning techniques to analyze patterns in the data and provide risk assessments to support early intervention and preventive care with data-backed accuracy.",
    tools: ["Python", "Predictive Modeling", "Medical Data Analysis", "Machine Learning", "XGBoost"],
    slug: "heart-risk-prediction-model",
    github: "https://github.com/Apurv-Shinde11/Heart-Disease-XGBoost",
  },
];

export default function CodingProjects() {
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
              className="group rounded-2xl p-7 transition hover:-translate-y-0.5"
              style={{
                border: "1px solid var(--card-border)",
                backgroundColor: "var(--card-bg)",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--card-hover-border)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--card-border)")}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                {/* Left — number + title + description */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-mono font-medium"
                      style={{ color: "var(--link-accent)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--foreground-muted)" }}>
                    {project.description}
                  </p>

                  {/* Tool pills */}
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
                  <Link
                    href={`/projects/coding/${project.slug}`}
                    className="text-sm font-medium transition whitespace-nowrap"
                    style={{ color: "var(--link-accent)" }}
                  >
                    View Project →
                  </Link>
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
