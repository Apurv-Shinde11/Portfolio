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
    title: "Automated Balance Sheet Generator",
    description:
      "A web-based financial automation tool that generates structured balance sheets from live company data. The application fetches financial statements, processes key metrics across Assets, Liabilities, and Equity, and renders a clean interactive output through a deployed web interface.",
    tools: ["Python", "GitHub", "Web app deployment", "Financial Data Analysis", "Data Processing"],
    slug: "automated-balance-sheet-generator",
    github: "https://github.com/Apurv-Shinde11/Balance-Sheet-Generator",
    details: {
      overview:
        "The Automated Balance Sheet Generator removes the manual effort of compiling financial statements. It fetches live company data via financial APIs, processes key accounting metrics across Assets, Liabilities, and Equity, and renders a clean, structured balance sheet through a deployed web interface — all in real time.",
      howItWorks: [
        { step: "Data Fetching", detail: "Connects to financial data APIs to pull live income statements, balance sheet line items, and key accounting figures for a given company ticker." },
        { step: "Data Processing", detail: "Cleans and categorizes raw financial data into standardized accounting buckets — Current Assets, Non-Current Assets, Current Liabilities, Long-Term Debt, and Equity." },
        { step: "Balance Sheet Construction", detail: "Applies double-entry accounting logic to verify that Assets = Liabilities + Equity, flagging any discrepancies automatically." },
        { step: "Web Output", detail: "Renders the final structured balance sheet through a deployed web interface — clean, readable, and exportable for further analysis." },
      ],
      capabilities: [
        "Fetches live financial data for any publicly listed company",
        "Automatically categorizes line items into standard accounting structure",
        "Validates the fundamental accounting equation before output",
        "Renders an interactive balance sheet through a deployed web app",
        "Reduces manual financial statement preparation time by 80%+",
      ],
      outcome:
        "Demonstrates the intersection of financial domain knowledge and engineering — automating a task that typically takes analysts hours of manual compilation into a real-time, on-demand output.",
    },
  },
  {
    title: "Market Research & Competitive Analysis",
    description:
      "A structured market analysis document that evaluates industry trends, competitive positioning, and business opportunities using data-driven research methods. Synthesizes qualitative and quantitative insights to support strategic decision-making.",
    tools: ["Business Intelligence", "Market Research", "Competitive Analysis", "Data Interpretation", "Strategic Analysis", "Research Methodology"],
    slug: "market-research",
    details: {
      overview:
        "This project delivers a comprehensive market research and competitive analysis framework — evaluating industry trends, competitor positioning, and whitespace opportunities using structured research methodology. The output is a decision-ready document that translates scattered market signals into a coherent strategic picture.",
      howItWorks: [
        { step: "Scope Definition", detail: "Defined the target market, key competitors, and research questions — establishing clear boundaries for what the analysis would and would not cover." },
        { step: "Data Collection", detail: "Gathered quantitative data (market size, growth rates, pricing) and qualitative signals (customer sentiment, positioning language, feature comparisons) from primary and secondary sources." },
        { step: "Competitive Mapping", detail: "Plotted competitors across key dimensions — pricing, target segment, feature depth, distribution channels — to identify positioning gaps and differentiation opportunities." },
        { step: "Insight Synthesis", detail: "Consolidated findings into a structured report with actionable recommendations, supported by data visualizations and a prioritized opportunity matrix." },
      ],
      capabilities: [
        "End-to-end market sizing and segmentation analysis",
        "Competitor feature and positioning matrix",
        "Qualitative + quantitative research synthesis",
        "Strategic opportunity identification and prioritization",
        "Executive-ready report structure with supporting visuals",
      ],
      outcome:
        "Demonstrates the ability to structure ambiguous market questions into a systematic research process — and translate findings into clear, decision-driving strategic recommendations.",
    },
  },
  {
    title: "Feedback Analysis to Drive Airline Services",
    description:
      "Analyzed passenger feedback to uncover trends in satisfaction, delays, cabin service, and overall experience. The dashboard provides clear insights to help airlines focus on what truly matters to passengers.",
    tools: ["Data Analysis", "Power BI", "Data Visualization", "Customer Feedback Analysis"],
    slug: "feedback-analysis",
    details: {
      overview:
        "This project transforms raw airline passenger feedback into a structured Power BI dashboard that surfaces satisfaction trends, pain points, and service gaps. The goal is to give airline operations and service teams a clear, data-backed view of what passengers actually experience — across routes, cabin classes, and service categories.",
      howItWorks: [
        { step: "Data Cleaning", detail: "Processed raw passenger feedback data — handling missing values, standardizing rating scales, and categorizing free-text responses into service dimensions (delays, cabin crew, food, boarding)." },
        { step: "Metric Framework", detail: "Defined KPIs across five service dimensions: on-time performance, cabin service quality, in-flight amenities, boarding experience, and overall NPS." },
        { step: "Dashboard Design", detail: "Built an interactive Power BI dashboard with slicers for route, cabin class, and time period — enabling drill-down from airline-level to route-level insights." },
        { step: "Insight Extraction", detail: "Identified the top 3 drivers of passenger dissatisfaction and the service categories with the highest correlation to overall satisfaction scores." },
      ],
      capabilities: [
        "Multi-dimensional passenger satisfaction analysis across 5 service categories",
        "Interactive Power BI dashboard with route and cabin class filters",
        "NPS trend tracking over time",
        "Correlation analysis between service factors and overall satisfaction",
        "Actionable insight summary for airline operations teams",
      ],
      outcome:
        "Demonstrates end-to-end analytical thinking — from messy feedback data to a dashboard that directly informs service improvement decisions. The kind of work that translates directly into BFSI and operations analytics roles.",
    },
  },
  {
    title: "Bank Operation Workflow Analysis",
    description:
      "An interactive operations analytics dashboard monitoring 12+ workforce and operational KPIs — including transaction volume, SLA breaches, backlog aging, and agent productivity. Reduced manual reporting effort by 30%.",
    tools: ["Power BI", "Data Visualization", "Operational & Workforce Analytics", "KPI Framework design", "Business Intelligence", "Data Integration", "Performance Monitoring", "Process Optimization"],
    slug: "bank-operation-workflow-analytics",
    github: "https://github.com/Apurv-Shinde11/Banking-Operations-DashBoard",
    details: {
      overview:
        "Built an enterprise-grade operations analytics dashboard for a banking workflow context — tracking 12+ KPIs across workforce productivity, transaction throughput, SLA compliance, and backlog management. The system integrates multiple operational datasets and automates recurring performance reporting, replacing manual Excel-based processes.",
      howItWorks: [
        { step: "Data Integration", detail: "Consolidated data from multiple operational sources — transaction logs, agent activity records, SLA tracking sheets — into a unified Power BI data model." },
        { step: "KPI Framework Design", detail: "Designed a 12+ KPI framework covering transaction volume, SLA breach rate, backlog aging buckets, agent productivity scores, resolution time, and workload distribution." },
        { step: "Dashboard Architecture", detail: "Structured the dashboard across three layers: executive summary (headline KPIs), operational drill-down (team and agent level), and trend analysis (week-on-week, month-on-month)." },
        { step: "Automation", detail: "Configured automated data refresh and report distribution — eliminating 30% of manual reporting effort previously spent on weekly performance summaries." },
      ],
      capabilities: [
        "12+ KPI framework across workforce and operational dimensions",
        "SLA breach detection with aging bucket classification",
        "Agent-level productivity tracking and workload distribution analysis",
        "Automated data refresh replacing manual weekly reporting",
        "30% reduction in manual reporting effort",
        "Multi-dataset integration into a unified Power BI model",
      ],
      outcome:
        "This project directly mirrors the kind of operational analytics work done in BFSI back-office and operations teams — demonstrating the ability to design KPI frameworks, integrate messy operational data, and deliver dashboards that drive real process decisions.",
    },
  },
  {
    title: "Macro Economic Intelligence",
    description:
      "An interactive dashboard that analyzes key macroeconomic indicators such as interest rates, inflation, and liquidity trends to provide structured insights into potential movements across major asset classes including equities, bonds, and gold.",
    tools: ["Economic Analysis", "Data Visualization", "Python", "Pandas", "Economic Indicators", "API Integration"],
    slug: "macro-economic-intelligence",
    externalLink: true,
  },
];

export default function AnalysisProjects() {
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
                        href={`/projects/analysis/${project.slug}`}
                        className="text-sm font-medium transition whitespace-nowrap"
                        style={{ color: "var(--link-accent)" }}
                      >
                        View Case Study →
                      </Link>
                    ) : (
                      <button
                        onClick={() => toggle(project.slug)}
                        className="text-sm font-medium transition whitespace-nowrap text-left"
                        style={{ color: "var(--link-accent)" }}
                      >
                        {expandedSlug === project.slug ? "Close ↑" : "View Case Study →"}
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
