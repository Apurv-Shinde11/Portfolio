"use client";

import Link from "next/link";

const projects = [
  {
    title: "Automated Balance Sheet Generator",
    description:
      "A web-based financial automation tool that generates structured balance sheets from live company data. The application fetches financial statements, processes key metrics across Assets, Liabilities, and Equity, and renders a clean interactive output through a deployed web interface.",
    tools: ["Python", "GitHub", "Web app deployment", "Financial Data Analysis", "Data Processing"],
    slug: "automated-balance-sheet-generator",
    github: "https://github.com/Apurv-Shinde11/Balance-Sheet-Generator",
  },
  {
    title: "Market Research & Competitive Analysis",
    description:
      "A structured market analysis document that evaluates industry trends, competitive positioning, and business opportunities using data-driven research methods. The project synthesizes qualitative and quantitative insights to support strategic decision-making and product-market evaluation.",
    tools: ["Business Intelligence", "Market Research", "Competitive Analysis", "Data Interpretation", "Strategic Analysis", "Research Methodology"],
    slug: "market-research",
  },
  {
    title: "Feedback Analysis to Drive Airline Services",
    description:
      "Feedback to uncover trends in satisfaction, delays, cabin service, and overall experience. The dashboard provides clear insights to help airlines focus on what truly matters to passengers.",
    tools: ["Data Analysis", "Power BI", "Data Visualization", "Customer Feedback Analysis"],
    slug: "feedback-analysis",
  },
  {
    title: "Bank Operation Workflow Analysis",
    description:
      "Developed an interactive operations analytics dashboard to monitor 12+ key workforce and operational KPIs, including transaction volume, SLA breaches, backlog aging, agent productivity, resolution time, and workload distribution. The system integrated multiple datasets and automated recurring performance reports, enabling teams to detect operational bottlenecks, track productivity trends, and reduce manual reporting effort by 30% while improving decision-making visibility.",
    tools: ["Power BI", "Data Visualization", "Operational & Workforce Analytics", "KPI Framework design", "Business Intelligence", "Data Integration", "Performance Monitoring", "Process Optimization"],
    slug: "bank-operation-workflow-analytics",
    github: "https://github.com/Apurv-Shinde11/Banking-Operations-DashBoard",
  },
  {
    title: "Macro Economic Intelligence",
    description:
      "An interactive dashboard that analyzes key macroeconomic indicators such as interest rates, inflation, and liquidity trends to provide structured insights into potential movements across major asset classes including equities, bonds, and gold.",
    tools: ["Economic Analysis", "Data Visualization", "Python", "Pandas", "Economic Indicators", "API Integration"],
    slug: "macro-economic-intelligence",
  },
];

export default function AnalysisProjects() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-24">

        {/* Page Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-sm font-medium mb-3" style={{ color: "var(--link-accent)" }}>
            Analytics
          </p>
          <h1 className="text-4xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
            Data Projects
          </h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
            Data analysis, dashboards, financial modeling, and decision-driven analytical systems.
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
                    href={`/projects/analysis/${project.slug}`}
                    className="text-sm font-medium transition whitespace-nowrap"
                    style={{ color: "var(--link-accent)" }}
                  >
                    View Case Study →
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
