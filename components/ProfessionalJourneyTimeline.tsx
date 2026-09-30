"use client";

import { useRef, useState } from "react";
import { Blocks, BriefcaseBusiness } from "lucide-react";
import {
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useTransform,
    type MotionValue,
} from "motion/react";

const experiences = [
    {
        company: "Nido Home Finance",
        role: "Strategy Analyst",
        type: "WORK EXPERIENCE",
        period: "15 Sep 2026 — Present",
        location: "Mumbai",
        description:
            "Building an understanding of housing finance, real estate and corporate strategy while learning how financial analysis, market research and business performance inform decision-making within a financial institution.",
        highlights: [
            "Developing an understanding of housing finance and real-estate business fundamentals.",
            "Learning how business performance, market research and financial analysis support strategic decision-making.",
            "Building familiarity with the processes and operating environment of a large financial institution.",
        ],
        tags: ["Strategy", "Financial Analysis", "Business Research", "Decision Support"],
        current: true,
    },
    {
        company: "EconIQ",
        role: "Builder & Co-Founder",
        type: "RESEARCH & STARTUP",
        period: "Feb 2026 — Present",
        location: "",
        description:
            "Building a quantitative economic-intelligence platform designed to bring macroeconomic research, market signals and decision-relevant context into one coherent environment without overwhelming the user.",
        highlights: [
            "Building Sentinel, the core economic-research dashboard, alongside Atlas, PE Intel, Geopolitical Watch, Simulator and Portfolio Layer.",
            "Translating macroeconomic signals, policies and market data into structured intelligence for understanding the Indian economy and investment environment.",
            "Developing the product as an intelligence system rather than a direct advisory tool, with the MVP currently being discussed with prospective users and investors.",
        ],
        tags: ["Economic Research", "Macro Analysis", "Quantitative Analysis", "Product Development"],
        current: false,
    },
    {
        company: "BabyDino / Zenith",
        role: "AI Intern & Researcher",
        type: "WORK EXPERIENCE",
        period: "10 Jul 2025 — 30 Mar 2026",
        location: "Remote",
        description:
            "Worked across AI research, experimentation and development, translating problem statements into practical Python and machine-learning workflows.",
        highlights: [
            "Developed an Income Tax Return Automation System to structure financial-data inputs and automate repetitive compliance workflows.",
            "Built a Sports Recommendation System combining user inputs and live-camera analysis to recommend suitable sports based on physical characteristics.",
            "Worked with Python, machine-learning libraries, data-processing workflows and AI/ML techniques across research and development.",
        ],
        tags: ["AI / ML", "Python", "Research", "Data"],
        current: false,
    },
] as const;

type Experience = (typeof experiences)[number];

function ExperienceEntry({
    experience,
    index,
    progress,
    reduceMotion,
    isActive,
}: {
    experience: Experience;
    index: number;
    progress: MotionValue<number>;
    reduceMotion: boolean;
    isActive: boolean;
}) {
    const start = (index / experiences.length) * 0.82;
    const end = start + 0.16;
    const reveal = useTransform(progress, [start, end], [0, 1]);
    const y = useTransform(reveal, [0, 1], [18, 0]);
    const onLeft = index % 2 === 1;
    const ExperienceIcon = experience.type === "RESEARCH & STARTUP" ? Blocks : BriefcaseBusiness;

    return (
        <li className="relative grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-x-4 md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] md:gap-x-6">
            <motion.article
                className={`col-start-2 row-start-1 rounded-2xl border p-6 transition-colors duration-300 sm:p-7 ${onLeft ? "md:col-start-1 md:text-right" : "md:col-start-3"
                    }`}
                style={{
                    opacity: reduceMotion ? 1 : reveal,
                    y: reduceMotion ? 0 : y,
                    borderColor:
                        isActive || experience.current
                            ? "var(--card-hover-border)"
                            : "var(--card-border)",
                    backgroundColor: "var(--card-bg)",
                }}
            >
                <div className="flex justify-end">
                    <span
                        className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase"
                        style={{ color: "var(--foreground-muted)" }}
                    >
                        <ExperienceIcon size={15} strokeWidth={1.8} aria-hidden="true" />
                        {experience.type}
                    </span>
                </div>

                <div className={`mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 ${onLeft ? "md:justify-end" : ""}`}>
                    <p
                        className="text-xs font-medium uppercase"
                        style={{ color: "var(--link-accent)" }}
                    >
                        {experience.period}{experience.location ? ` · ${experience.location}` : ""}
                    </p>
                    {experience.current && (
                        <span
                            className="inline-flex items-center gap-1.5 text-xs font-medium"
                            style={{ color: "var(--foreground-muted)" }}
                        >
                            <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: "var(--link-accent)" }}
                            />
                            Present
                        </span>
                    )}
                </div>

                <h2
                    className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl"
                    style={{ color: "var(--foreground)" }}
                >
                    {experience.role}
                </h2>
                <p className="mt-1 text-sm font-medium" style={{ color: "var(--foreground-muted)" }}>
                    {experience.company}
                </p>
                <p
                    className="mt-4 text-sm leading-relaxed"
                    style={{ color: "var(--foreground-muted)" }}
                >
                    {experience.description}
                </p>
                <p
                    className="mb-2 mt-5 text-[10px] font-medium uppercase"
                    style={{ color: "var(--foreground-muted)" }}
                >
                    Highlights
                </p>
                <ul className={`space-y-2.5 ${onLeft ? "md:text-right" : ""}`} aria-label={`${experience.company} highlights`}>
                    {experience.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2 text-sm leading-relaxed">
                            <span
                                aria-hidden="true"
                                className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full"
                                style={{ backgroundColor: "var(--link-accent)" }}
                            />
                            <span style={{ color: "var(--foreground-muted)" }}>{highlight}</span>
                        </li>
                    ))}
                </ul>
                <ul
                    className={`mt-5 flex flex-wrap gap-2 ${onLeft ? "md:justify-end" : ""}`}
                    aria-label={`${experience.company} focus areas`}
                >
                    {experience.tags.map((tag) => (
                        <li
                            key={tag}
                            className="rounded-full border px-3 py-1 text-xs"
                            style={{
                                borderColor: "var(--card-border)",
                                color: "var(--foreground-muted)",
                                backgroundColor: "var(--social-hover-bg)",
                            }}
                        >
                            {tag}
                        </li>
                    ))}
                </ul>
            </motion.article>

            <div className="relative col-start-1 row-start-1 flex justify-center pt-5 md:col-start-2">
                <span
                    aria-hidden="true"
                    className="absolute left-6 top-[1.65rem] h-px w-10 bg-[var(--card-border)] md:hidden"
                />
                <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[1.65rem] hidden h-px bg-[var(--card-border)] md:block"
                />
                <motion.span
                    aria-hidden="true"
                    className="relative z-10 h-3.5 w-3.5 rounded-full border-2"
                    style={{
                        opacity: reduceMotion ? 1 : reveal,
                        borderColor: isActive
                            ? "var(--link-accent)"
                            : "var(--card-border)",
                        backgroundColor: isActive
                            ? "var(--link-accent)"
                            : "var(--background)",
                    }}
                />
            </div>
        </li>
    );
}

export default function ProfessionalJourneyTimeline() {
    const timelineRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const reduceMotion = useReducedMotion() ?? false;
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 75%", "end 25%"],
    });

    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        const nextActiveIndex = experiences.reduce((activeIndex, _, index) => {
            const activationPoint = (index / experiences.length) * 0.82 + 0.08;
            return progress >= activationPoint ? index : activeIndex;
        }, -1);
        setActiveIndex((current) =>
            current === nextActiveIndex ? current : nextActiveIndex
        );
    });

    return (
        <div ref={timelineRef} className="relative">
            <div
                aria-hidden="true"
                className="absolute bottom-5 left-6 top-5 w-px bg-[var(--card-border)] md:left-1/2 md:-translate-x-px"
            >
                <motion.div
                    className="h-full w-full origin-top bg-[var(--link-accent)]"
                    style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
                />
            </div>

            <ol
                className="relative flex flex-col gap-y-16 md:gap-y-24"
                aria-label="Professional experience, newest first"
            >
                {experiences.map((experience, index) => (
                    <ExperienceEntry
                        key={experience.company}
                        experience={experience}
                        index={index}
                        progress={scrollYProgress}
                        reduceMotion={reduceMotion}
                        isActive={reduceMotion || activeIndex === index}
                    />
                ))}
            </ol>
        </div>
    );
}