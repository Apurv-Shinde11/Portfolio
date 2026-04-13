import Link from "next/link";

export default function EconomicResearch() {
    return (
        <main className="mx-auto max-w-4xl px-6 py-24">

            {/* Title */}
            <div className="mb-12">
                <h1 className="text-4xl font-semibold tracking-tight">
                    Economic Research Model
                </h1>
                <p className="mt-4 text-zinc-400">
                    A macro-driven system designed to analyze how different economic environments influence asset behavior and investment strategy.
                </p>
            </div>

            {/* Problem */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold">The Problem</h2>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                    India has 400+ registered PMS firms and thousands of wealth managers — most relying on manual research, analyst intuition, and lagging reports.
                </p>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                    Bloomberg and Refinitiv terminals cost ₹15–25L per seat annually — completely out of reach for sub-₹1,000 Cr AUM firms.
                </p>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                    India-specific economic signals — RBI data, GST trends, FII flows, sector PMIs — are scattered across dozens of sources with no unified, actionable view.
                </p>
            </section>

            {/* Our Solution */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold">Our Solution</h2>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                    The Model aggregates macro indicators, sector data, and global signals into a single platform. Our Python-based algorithm processes data continuously, surfaces actionable insights, and generates ready-to-use research narratives — delivered through a clean dashboard and automated reports.
                </p>
            </section>

            {/* System Overview */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold">System Overview</h2>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                    The Research Model is a Python-based analytical system that synthesizes macroeconomic indicators,
                    market trends, and contextual data to classify economic regimes and evaluate how assets behave under each regime.
                </p>
            </section>

            {/* How It Works */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold">How It Works</h2>

                <div className="mt-4 space-y-4 text-zinc-400 leading-relaxed">
                    <p>
                        <span className="text-zinc-200 font-medium">1. Data Input:</span> The system collects macroeconomic data such as inflation rates,
                        interest rates, and liquidity indicators using APIs and structured datasets.
                    </p>

                    <p>
                        <span className="text-zinc-200 font-medium">2. Regime Identification:</span> Based on the data, the model identifies macroeconomic regimes
                        such as inflationary expansion, tightening cycles, or liquidity-driven growth phases.
                    </p>

                    <p>
                        <span className="text-zinc-200 font-medium">3. Asset Behavior Mapping:</span> The system maps how different asset classes
                        (equities, bonds, gold) perform under each identified regime.
                    </p>

                    <p>
                        <span className="text-zinc-200 font-medium">4. Output:</span> Generates structured insights that help understand which assets are likely to perform
                        under current and evolving macro conditions.
                    </p>
                </div>
            </section>

            {/* Insights */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold">Key Capabilities</h2>

                <ul className="mt-4 space-y-3 text-zinc-400">
                    <li>• Translates complex macroeconomic data into simplified insights</li>
                    <li>• Identifies economic regimes dynamically</li>
                    <li>• Maps asset performance to macro conditions</li>
                    <li>• Supports more structured and informed investment decisions</li>
                </ul>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                    India's wealth management industry is growing at a pace that demands better research infrastructure — yet the tools available are either too expensive, too generic, or built for Western markets. EconIntel is the missing layer: affordable, India-specific, and algorithmic. We have the prototype. We have the market. We are looking for the right partners to help us scale it.
                </p>
            </section>

            {/* Tech Stack */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold">Tools & Technologies</h2>

                <div className="mt-4 flex flex-wrap gap-2">
                    {["Python", "Pandas", "APIs", "Macroeconomic Analysis", "Financial Markets"].map((tool) => (
                        <span
                            key={tool}
                            className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                        >
                            {tool}
                        </span>
                    ))}
                </div>
            </section>

            {/* Back Button */}
            <div>
                <Link
                    href="/projects/coding"
                    className="inline-block text-sm text-blue-400 hover:text-blue-300"
                >
                    ← Back to Projects
                </Link>
            </div>

        </main>
    );
}