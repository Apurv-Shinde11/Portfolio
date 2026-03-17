import Link from "next/link";

export default function Projects() {
    return (
        <section
            id="projects"
            className="mx-auto max-w-6xl px-6 py-24"
        >

            {/* Section Title */}
            <div className="mb-12 max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-tight">
                    Projects
                </h2>

                <p className="mt-3 text-zinc-400">
                    Two directions of my work: analytics systems and software-driven data solutions.
                </p>
            </div>

            {/* Project Type Cards */}
            <div className="grid gap-8 md:grid-cols-2">

                {/* Analytics Projects */}
                <Link
                    href="/projects/analysis"
                    className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 transition hover:-translate-y-1 hover:border-blue-400"
                >
                    <h3 className="text-xl font-semibold">
                        Analytics Projects
                    </h3>

                    <p className="mt-3 text-sm text-zinc-400">
                        Data analysis, dashboards, financial modeling, and decision-driven analytical systems.
                    </p>

                    <span className="mt-6 inline-block text-sm text-blue-400 group-hover:text-blue-300">
                        View Analytics Projects →
                    </span>
                </Link>

                {/* Coding Projects */}
                <Link
                    href="/projects/coding"
                    className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 transition hover:-translate-y-1 hover:border-blue-400"
                >
                    <h3 className="text-xl font-semibold">
                        Coding Projects
                    </h3>

                    <p className="mt-3 text-sm text-zinc-400">
                        Python tools, automation systems, data pipelines, and software-based analytics applications.
                    </p>

                    <span className="mt-6 inline-block text-sm text-blue-400 group-hover:text-blue-300">
                        View Coding Projects →
                    </span>
                </Link>

            </div>

        </section>
    );
}