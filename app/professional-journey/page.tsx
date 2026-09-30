import type { Metadata } from "next";
import Link from "next/link";
import ProfessionalJourneyTimeline from "@/components/ProfessionalJourneyTimeline";

export const metadata: Metadata = {
    title: "Professional Journey",
    description:
        "A journey through the work, ideas and ventures shaping how I understand problems — from AI and economic research to financial strategy.",
};

export default function ProfessionalJourneyPage() {
    return (
        <main id="content" style={{ color: "var(--foreground)" }}>
            <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-20 md:px-10 md:pt-24 lg:px-12">
                <p
                    className="text-xs font-semibold uppercase"
                    style={{ color: "var(--link-accent)" }}
                >
                    Professional Journey
                </p>
                <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
                    Built with code. Shaped by data. Driven by decisions.
                </h1>
                <p
                    className="mt-5 max-w-2xl text-base leading-relaxed"
                    style={{ color: "var(--foreground-muted)" }}
                >
                    A journey through the work, ideas and ventures shaping how I understand
                    problems — from AI and economic research to financial strategy.
                </p>
            </section>

            <section
                className="mx-auto w-full max-w-6xl px-6 pb-20 pt-12 md:px-10 md:pb-28 lg:px-12"
                aria-label="Professional experience timeline"
            >
                <ProfessionalJourneyTimeline />
            </section>

            <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-4 md:px-10 lg:px-12">
                <div
                    className="border-t pt-10 md:pt-12"
                    style={{ borderColor: "var(--section-border)" }}
                >
                    <p className="text-2xl font-medium tracking-tight sm:text-3xl">
                        And this is only the beginning.
                    </p>
                    <Link
                        href="/projects"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-75"
                        style={{ color: "var(--link-accent)" }}
                    >
                        View my work <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </section>
        </main>
    );
}