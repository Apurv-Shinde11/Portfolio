"use client";

import { useRef, useState } from "react";
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
        role: "Strategy Analyst · Corporate Strategy",
        period: "2026 — Present",
        description:
            "Working across financial analysis, business research and decision-support within housing finance.",
        tags: ["Strategy", "Financial Analysis", "Business Research", "Decision Support"],
        current: true,
    },
    {
        company: "BabyDino / Zenith",
        role: "AI Intern & Researcher",
        period: "2025",
        description:
            "Explored AI/ML applications through research, experimentation and technical projects.",
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
    const start = index === 0 ? 0.02 : 0.6;
    const end = index === 0 ? 0.16 : 0.78;
    const reveal = useTransform(progress, [start, end], [0, 1]);
    const y = useTransform(reveal, [0, 1], [18, 0]);
    const onLeft = index % 2 === 1;

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
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 md:justify-start md:gap-y-3">
                    <p
                        className="text-xs font-medium uppercase"
                        style={{ color: "var(--link-accent)" }}
                    >
                        {experience.period}
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
                    className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl"
                    style={{ color: "var(--foreground)" }}
                >
                    {experience.company}
                </h2>
                <p className="mt-1 text-sm font-medium" style={{ color: "var(--foreground-muted)" }}>
                    {experience.role}
                </p>
                <p
                    className="mt-4 text-sm leading-relaxed"
                    style={{ color: "var(--foreground-muted)" }}
                >
                    {experience.description}
                </p>
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
        const nextActiveIndex = progress >= 0.6 ? 1 : progress >= 0.02 ? 0 : -1;
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
                className="relative flex flex-col gap-y-14 md:gap-y-24"
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