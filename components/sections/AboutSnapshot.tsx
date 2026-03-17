"use client";

import Image from "next/image";

export default function Resume() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">

      <div className="grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE - PHOTO */}
        <div className="max-w-sm">

          <div className="overflow-hidden rounded-3xl border border-zinc-800">
            <Image
              src="/pic 3.png"
              alt="Apurva Shinde"
              width={682}
              height={1024}
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* RIGHT SIDE - TEXT */}
        <div className="space-y-5">

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            I am Apurva
          </h1>

          <p className="text-xl text-zinc-300">
            Data Analyst
          </p>

          <p className="text-zinc-400 leading-relaxed max-w-xl">
            I am a data analyst focused on building structured analytical
            systems that transform raw data into meaningful insights.
            My work combines data analysis, automation, and visualization
            to support better decision-making. I enjoy exploring complex
            datasets, identifying patterns, and building tools that make
            analytical workflows more efficient.
          </p>

          <p className="text-zinc-300">
            email : apurv350@gmail.com
          </p>

          <p className="text-zinc-400">
            place : Mumbai, India - 400094
          </p>

          {/* Download Resume Button */}
          <div className="pt-4">
            <a
              href="/resume.pdf"
              className="inline-block border border-zinc-700 px-6 py-3 rounded-lg hover:border-zinc-400 transition"
            >
              Download Resume
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}