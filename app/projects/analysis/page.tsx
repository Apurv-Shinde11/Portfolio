import Link from "next/link";

const projects = [
    {
        title: "Automated Balance Sheet Generator",
        description:
            "A web-based financial automation tool that generates structured balance sheets from live company data. The application fetches financial statements, processes key metrics across Assets, Liabilities, and Equity, and renders a clean interactive output through a deployed web interface.",
        tools: ["Python", "GitHub", "Web app deployment", "Financial Data Analysis", "Data Processing"],
        slug: "automated-balance-sheet-generator",
    },
    {
        title: "Market Research & Competitive Intelligence Analysis",
        description:
            "A structured market analysis project that evaluates industry trends, competitive positioning, and business opportunities using data-driven research methods. The project synthesizes qualitative and quantitative insights to support strategic decision-making and product-market evaluation.",
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
        title: "Bank Operation Workflow Analytics",
        description:
            "Developed an interactive operations analytics dashboard to monitor 12+ key workforce and operational KPIs, including transaction volume, SLA breaches, backlog aging, agent productivity, resolution time, and workload distribution. The system integrated multiple datasets and automated recurring performance reports, enabling teams to detect operational bottlenecks, track productivity trends, and reduce manual reporting effort by 30% while improving decision-making visibility.",
        tools: ["Power BI", "Data Visualization", "Operational & Workforce Analytics", "KPI Framework design", "Business Intelligence", "Data Integration", "Performance Monitoring", "Process Optimization"],
        slug: "bank-operation-workflow-analytics",
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
        <main className="mx-auto max-w-6xl px-6 py-24">

            {/* Page Title */}
            <div className="mb-16 max-w-2xl">
                <h1 className="text-4xl font-semibold tracking-tight">
                    Data Projects
                </h1>
                <p className="mt-4 text-zinc-400">

                </p>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-8 md:grid-cols-2">

                {projects.map((project) => (
                    <div
                        key={project.slug}
                        className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-600"
                    >

                        <h3 className="text-xl font-semibold">{project.title}</h3>

                        <p className="mt-3 text-zinc-400 text-sm">
                            {project.description}
                        </p>

                        {/* Tools */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.tools.map((tool) => (
                                <span
                                    key={tool}
                                    className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>

                        {/* Link */}
                        <Link
                            href={`/projects/analysis/${project.slug}`}
                            className="mt-6 inline-block text-sm font-medium text-blue-400 group-hover:text-blue-300"
                        >
                            View Case Study →
                        </Link>

                    </div>
                ))}

            </div>

        </main>
    );
}