"use client";

import Image from "next/image";
import {
  BrainCircuit,
  BriefcaseBusiness,
  ChartColumnIncreasing,
  ChartPie,
  FileSearch,
  FileSpreadsheet,
  GitBranch,
  Globe,
  Search,
  Target,
  type LucideIcon,
} from "lucide-react";

type Skill =
  | { name: string; logo: string }
  | { name: string; icon: LucideIcon; iconColor?: string };

const skills: Skill[] = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Data Analysis", icon: ChartColumnIncreasing, iconColor: "#3b82f6" },
  { name: "Excel", icon: FileSpreadsheet },
  { name: "Financial Analysis", icon: ChartPie, iconColor: "#10b981" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Business Analysis", icon: BriefcaseBusiness, iconColor: "#f59e0b" },
  { name: "Power BI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
  { name: "Business Research", icon: FileSearch, iconColor: "#8b5cf6" },
  { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "Strategic Analysis", icon: Target, iconColor: "#6366f1" },
  { name: "AI / ML", icon: BrainCircuit, iconColor: "#a855f7" },
  { name: "Decision Support", icon: GitBranch, iconColor: "#06b6d4" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Market Research", icon: Search, iconColor: "#f97316" },
  { name: "APIs", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Macroeconomic Research", icon: Globe, iconColor: "#0ea5e9" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24" style={{ backgroundColor: "var(--background)" }}>

      <div className="mx-auto max-w-6xl px-6 mb-16 text-center">
        <h2 className="text-3xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
          Core Skills &amp; Tools
        </h2>
      </div>

      <div className="mx-auto max-w-6xl px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-12">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center justify-center gap-3 text-center group"
          >
            <div className="flex h-12 w-12 items-center justify-center transition-transform duration-200 group-hover:scale-110">
              {"logo" in skill ? (
                <Image
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  width={48}
                  height={48}
                  unoptimized
                />
              ) : (
                <skill.icon
                  size={34}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  style={{
                    color: skill.iconColor
                      ? `color-mix(in srgb, ${skill.iconColor} 78%, var(--foreground) 22%)`
                      : "var(--foreground-muted)",
                  }}
                />
              )}
            </div>
            <p
              className="text-sm transition"
              style={{ color: "var(--foreground-muted)" }}
            >
              {skill.name}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
