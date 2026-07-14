"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

const highlights = [
  { label: "Degree", value: "MCA — AI & ML, Chandigarh University (2025)" },
  { label: "Background", value: "BSc Computer Science, Mumbai University" },
  { label: "Currently", value: "Data & Research Intern at Zenith (BabyDino)" },
  { label: "Building", value: "EconIQ — B2B WealthTech for Indian financial advisors" },
  { label: "Based in", value: "Mumbai, India" },
  { label: "Open to", value: "Data Analyst · Business Analyst · AI/Automation roles" },
];

export default function About() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-24">

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT — Photo */}
          <div className="max-w-sm">
            <div
              className="overflow-hidden rounded-3xl"
              style={{ border: "1px solid var(--card-border)" }}
            >
              <Image
                src="/pic 2.png"
                alt="Apurva Shinde"
                width={682}
                height={1024}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="space-y-8">

            {/* Name + role */}
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: "var(--link-accent)" }}>
                About Me
              </p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-3" style={{ color: "var(--foreground)" }}>
                I am Apurva
              </h1>
              <p className="text-lg font-medium" style={{ color: "var(--foreground-muted)" }}>
                Data Analyst · AI/ML Graduate · Founder
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-3">
              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                I build structured analytical systems that transform raw data into decisions. My work sits at the intersection of data engineering, financial modeling, and AI — designing tools that make complex information immediately actionable.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                Outside of client work and internships, I co-founded EconIQ — a B2B WealthTech platform that gives Indian financial advisors macroeconomic intelligence to manage client portfolios with more confidence. It's where I get to combine everything I care about: data, finance, and product.
              </p>
            </div>

            {/* Highlights grid */}
            <div
              className="rounded-2xl p-6 grid gap-4"
              style={{
                border: "1px solid var(--card-border)",
                backgroundColor: "var(--card-bg)",
              }}
            >
              {highlights.map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:gap-4">
                  <span
                    className="text-xs font-mono font-medium uppercase tracking-wide min-w-[110px]"
                    style={{ color: "var(--link-accent)" }}
                  >
                    {item.label}
                  </span>
                  <span className="text-sm" style={{ color: "var(--foreground)" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact row */}
            <div
              className="rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              style={{
                border: "1px solid var(--card-border)",
                backgroundColor: "var(--social-hover-bg)",
              }}
            >
              <div>
                <p className="text-xs font-medium mb-0.5" style={{ color: "var(--foreground-muted)" }}>Email</p>
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>apurv350@gmail.com</p>
              </div>
              <div className="hidden sm:block w-px h-8" style={{ backgroundColor: "var(--card-border)" }} />
              <div>
                <p className="text-xs font-medium mb-0.5" style={{ color: "var(--foreground-muted)" }}>Location</p>
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Mumbai, India — 400094</p>
              </div>
            </div>

            {/* Resume CTAs */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={site.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-6 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
                style={{
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                }}
              >
                View Resume
              </a>
              <a
                href={site.resumeHref}
                download
                className="rounded-full px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5"
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
                Download ↓
              </a>
              <Link
                href="/"
                className="text-sm transition"
                style={{ color: "var(--foreground-muted)" }}
              >
                ← Back to Home
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
