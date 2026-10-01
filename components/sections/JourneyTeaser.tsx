import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function JourneyTeaser() {
    return (
        <section className="mx-auto w-full max-w-6xl px-6 py-6 md:px-10 lg:px-12">
            <div
                className="relative overflow-hidden rounded-2xl border px-5 py-5 md:px-6 md:py-6"
                style={{
                    borderColor: "var(--card-border)",
                    backgroundColor: "var(--card-bg)",
                }}
            >
                <div className="absolute left-5 top-0 h-full w-px" style={{ backgroundColor: "var(--section-border)" }} />
                <div
                    className="absolute left-[18px] top-6 h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: "var(--link-accent)" }}
                />

                <div className="flex flex-col gap-4 pl-7 md:flex-row md:items-end md:justify-between md:pl-8">
                    <div className="space-y-2">
                        <p
                            className="text-[10px] font-medium uppercase tracking-[0.22em]"
                            style={{ color: "var(--foreground-muted)" }}
                        >
                            CURRENTLY
                        </p>
                        <p className="text-lg font-medium tracking-tight sm:text-xl" style={{ color: "var(--foreground)" }}>
                            Strategy Analyst · Nido Home Finance
                        </p>
                        <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                            Mumbai · September, 2026 — Present
                        </p>
                    </div>

                    <Link
                        href="/professional-journey"
                        className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
                        style={{ color: "var(--link-accent)" }}
                    >
                        Follow my journey
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
