import Link from "next/link";

const projects = [
    {
        title: "Asset Intelligence Model",
        description:
            "A Python-based model designed to study macroeconomic regimes and their impact on asset behavior. The model synthesizes macro indicators, market trends, and competitive intelligence to identify how different economic environments influence investment strategies and asset performance.",
        tools: ["Python", "Pandas", "APIs", "Financial markets", "Macroeconomic Analysis"],
        slug: "asset-intelligence",
    },
    {
        title: "Income Tax Return (ITR) automation system",
        description:
            "An automation framework designed to streamline the preparation and processing of Income Tax Returns by structuring financial data inputs and automating repetitive compliance tasks. The system focuses on improving efficiency, reducing manual effort, and organizing financial information for faster tax filing workflows.",
        tools: ["Python", "Process Automation", "Compliance data handling", "Data Handling", "Workflow Automation", "Financial Operations"],
        slug: "itr-automation",
    },
    {
        title: "Sports Recommendation System",
        description:
            "A Python-based recommedation tool that recommends sports based on user inputs, and live camera analysis. The recommendation is a list of sports that are suitable according to users body dimensions. Final output - most suitable sport to pursue.",
        tools: ["Python", "NumPy", "OpenCV", "Computer Vision", "Recommendation Systems", "StreamLit"],
        slug: "recommendation-system",
    },
    {
        title: "Portfolio Website",
        description:
            "Personal portfolio website designed to showcase my projects, technical skills, and analytical work — the site you are currently viewing.",
        tools: ["Next.js", "TypeScript", "Tailwind.CSS", "Three.js", "Framer Motion", "Vercel"],
        slug: "portfolio-website",
    },
    {
        title: "Flight Planning Optimizer",
        description:
            "Data Structure & Algorithm based based experimentation that uses Dijkstra's algorithm to determine shortest air routes between two airports. This helps optimize time, fuel consumption, and operational efficiency for airlines and travelers.",
        tools: ["Python", "Data Structure and Algorithm", "StreamLit", "Aviation"],
        slug: "flight-planning-optimizer",
    },
    {
        title: "Heart Risk Prediction Model",
        description:
            "An algorithm that predicts the risk of heart disease based on patient data, including age, cholesterol levels, blood pressure, and lifestyle factors. The model uses machine learning techniques to analyze patterns in the data and provide risk assessments to support early intervention and preventive care with data-backed accuracy.",
        tools: ["Python", "Predictive Model", "Medical Data Handling & Analysis", "Machine Learning"],
        slug: "heart-risk-prediction-model",
    },
];

export default function CodingProjects() {
    return (
        <main className="mx-auto max-w-6xl px-6 py-24">

            {/* Page Title */}
            <div className="mb-16 max-w-2xl">
                <h1 className="text-4xl font-semibold tracking-tight">
                    Coding Projects
                </h1>

                <p className="mt-4 text-zinc-400">
                    The projects that I have worked on that took weeks, months, and sometimes years!
                </p>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-8 md:grid-cols-2">

                {projects.map((project) => (
                    <div
                        key={project.slug}
                        className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-blue-400"
                    >

                        <h3 className="text-xl font-semibold">
                            {project.title}
                        </h3>

                        <p className="mt-3 text-sm text-zinc-400">
                            {project.description}
                        </p>

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

                        <Link
                            href={`/projects/coding/${project.slug}`}
                            className="mt-6 inline-block text-sm text-blue-400 group-hover:text-blue-300"
                        >
                            View Project →
                        </Link>

                    </div>
                ))}

            </div>

        </main>
    );
}