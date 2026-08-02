"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/data/site";

const highlights = [
  { label: "Degree", value: "MCA — AI & ML, Chandigarh University (2025)" },
  { label: "Background", value: "BSc Computer Science, Mumbai University" },
  { label: "Currently", value: "AI Intern & Researcher at Zenith (BabyDino)" },
  { label: "Building", value: "EconIQ — B2B WealthTech for Indian financial advisors" },
  { label: "Based in", value: "Mumbai, India" },
  { label: "Open to", value: "AI Engineer · GenAI · Python Developer roles" },
];

const certifications = [
  {
    id: "python-specialization",
    title: "Python Programming Specialization",
    issuer: "University of Michigan · Coursera",
    year: "2023",
    tag: "5 Courses",
    pdfPath: "/certificates/Coursera__python_basics-1_.pdf",
    courses: [
      { name: "Python Basics", pdf: "/certificates/Coursera__python_basics-1_.pdf" },
      { name: "Python Functions, Files & Dictionaries", pdf: "/certificates/Python_Certificate_2.pdf" },
      { name: "Data Collection & Processing with Python", pdf: "/certificates/Python_Certificate_3.pdf" },
      { name: "Python Classes & Inheritance", pdf: "/certificates/Python_Certificate_-_4.pdf" },
      { name: "Python Project: pillow, tesseract & opencv", pdf: "/certificates/Python_Certificate_-5.pdf" },
    ],
  },
  {
    id: "generative-ai",
    title: "Introduction to Generative AI",
    issuer: "Google Cloud · Coursera",
    year: "2023",
    tag: "AI",
    pdfPath: "/certificates/Generative_AI_Certificate__Google_cloud_.pdf",
  },
  {
    id: "data-analytics-ibm",
    title: "Introduction to Data Analytics",
    issuer: "IBM · Coursera",
    year: "2024",
    tag: "Analytics",
    pdfPath: "/certificates/Data_Analytics__IBM_.pdf",
  },
  {
    id: "bi-analytics",
    title: "Business Intelligence & Data Analytics",
    issuer: "Macquarie University · Coursera",
    year: "2024",
    tag: "BI",
    pdfPath: "/certificates/Coursera__Business_Intelligence_and_Data_Analytics_.pdf",
  },
  {
    id: "javascript",
    title: "JavaScript",
    issuer: "Infosys Springboard",
    year: "2024",
    tag: "Dev",
    pdfPath: "/certificates/JavaScript__Infosys_certificate_.pdf",
  },
  {
    id: "react-native",
    title: "React Native",
    issuer: "Infosys Springboard",
    year: "2024",
    tag: "Dev",
    pdfPath: "/certificates/React_Native__infosys_certificate_.pdf",
  },
];

export default function About() {
  const [expandedCert, setExpandedCert] = useState<string | null>(null);

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-24">

        {/* ── TOP SECTION ── */}
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
                AI / GenAI Engineer · Python Developer · Founder
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-3">
              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                I build end-to-end AI solutions — document intelligence systems, predictive models, and automation pipelines. My work sits at the intersection of AI engineering, financial modeling, and data systems, designing tools that make complex information immediately actionable.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                Outside of client work, I co-founded EconIQ — a B2B WealthTech platform giving Indian financial advisors macroeconomic intelligence to manage client portfolios with more confidence. Currently expanding into LLMs, RAG systems, and scalable AI APIs.
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
                style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
              >
                View Resume
              </a>
              <a
                href={site.resumeHref}
                download
                className="rounded-full px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5"
                style={{ border: "1px solid var(--card-border)", color: "var(--foreground-muted)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--card-hover-border)"; e.currentTarget.style.color = "var(--link-accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--card-border)"; e.currentTarget.style.color = "var(--foreground-muted)"; }}
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

        {/* ── CERTIFICATIONS SECTION ── */}
        <div className="mt-24">

          {/* Section header */}
          <div className="mb-10">
            <p className="text-sm font-medium mb-2" style={{ color: "var(--link-accent)" }}>
              Credentials
            </p>
            <h2 className="text-3xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
              Certifications
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
              {certifications.length} certifications across AI, data analytics, and software development.
            </p>
          </div>

          {/* Certifications grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="rounded-2xl overflow-hidden transition"
                style={{
                  border: `1px solid ${expandedCert === cert.id ? "var(--card-hover-border)" : "var(--card-border)"}`,
                  backgroundColor: "var(--card-bg)",
                }}
              >
                {/* Certificate PDF preview */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ height: 180, backgroundColor: "var(--social-hover-bg)" }}
                >
                  <iframe
                    src={`${cert.pdfPath}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    className="w-full h-full pointer-events-none"
                    style={{ transform: "scale(1)", transformOrigin: "top left" }}
                    title={cert.title}
                  />
                </div>

                {/* Card body */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
                      {cert.title}
                    </h3>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: "var(--social-hover-bg)",
                        border: "1px solid var(--card-border)",
                        color: "var(--link-accent)",
                      }}
                    >
                      {cert.tag}
                    </span>
                  </div>
                  <p className="text-xs mb-1" style={{ color: "var(--foreground-muted)" }}>
                    {cert.issuer}
                  </p>
                  <p className="text-xs mb-4" style={{ color: "var(--foreground-muted)" }}>
                    {cert.year}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <a
                      href={cert.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium transition"
                      style={{ color: "var(--link-accent)" }}
                    >
                      View Certificate ↗
                    </a>

                    {/* Expand for specialization */}
                    {cert.courses && (
                      <button
                        onClick={() => setExpandedCert(expandedCert === cert.id ? null : cert.id)}
                        className="text-xs transition"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        {expandedCert === cert.id ? "Hide courses ↑" : "See all 5 courses →"}
                      </button>
                    )}
                  </div>

                  {/* Expanded course list for Python Specialization */}
                  {expandedCert === cert.id && cert.courses && (
                    <div className="mt-4 space-y-2">
                      {cert.courses.map((course, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg px-3 py-2"
                          style={{
                            backgroundColor: "var(--social-hover-bg)",
                            border: "1px solid var(--card-border)",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono" style={{ color: "var(--link-accent)" }}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-xs" style={{ color: "var(--foreground)" }}>
                              {course.name}
                            </span>
                          </div>
                          <a
                            href={course.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs transition flex-shrink-0"
                            style={{ color: "var(--foreground-muted)" }}
                          >
                            ↗
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
