"use client";

import { site } from "@/data/site";
import Image from "next/image";
import Squares from "@/components/ui/Squares";
import TextType from "@/components/ui/TextType";

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" className="fill-current" />
      <path
        d="M8.1 17.25V10.5h-2.2v6.75h2.2Zm-1.1-7.7c.75 0 1.36-.6 1.36-1.35 0-.77-.61-1.37-1.36-1.37-.77 0-1.37.6-1.37 1.37 0 .75.6 1.35 1.37 1.35ZM18.9 17.25V13.4c0-1.93-1.03-2.83-2.4-2.83-1.1 0-1.59.6-1.86 1.03v-1.1h-2.2v6.75h2.2v-3.7c0-.98.57-1.6 1.37-1.6.82 0 1.2.52 1.2 1.6v3.7h2.69Z"
        className="fill-zinc-900"
      />
    </svg>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        className="fill-current"
        d="M12 .5C5.65.5.7 5.44.7 11.79c0 5 3.24 9.23 7.73 10.73.57.1.78-.25.78-.55 0-.27-.01-1.15-.02-2.08-3.14.68-3.8-1.33-3.8-1.33-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.17-3.03-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.16a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.47 3.15-1.16 3.15-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.03 0 4.33-2.63 5.29-5.14 5.57.41.36.77 1.08.77 2.18 0 1.57-.01 2.83-.01 3.21 0 .31.21.66.79.55 4.48-1.5 7.72-5.73 7.72-10.73C23.3 5.44 18.35.5 12 .5Z"
      />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="6" className="fill-current" />
      <circle cx="12" cy="12" r="4" className="fill-zinc-900" />
      <circle cx="17.5" cy="6.5" r="1.2" className="fill-zinc-900" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#020617]">

      {/* Animated Squares Background */}
      <div className="absolute inset-0 z-0">
        <Squares
          direction="diagonal"
          speed={0.3}
          squareSize={60}
          borderColor="rgba(255,255,255,0.06)"
          hoverFillColor="rgba(255,255,255,0.08)"
        />
      </div>

      {/* Subtle lighting gradient */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,rgba(30,64,175,0.25),transparent_60%)]" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-24">

        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">

          {/* TEXT */}
          <div className="max-w-2xl space-y-6">

            <h1 className="text-4xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Hi there!
            </h1>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              I am Apurva Shinde
            </h1>

            {/* Typing animation */}
            <p className="text-zinc-300 text-lg flex items-center">
              <span className="mr-2">I am into</span>

              <TextType
                text={[
                  "Artificial Intelligence",
                  "Data Analysis",
                  "Entrepreneurship",
                  "Finance",
                  "Geopolitics",
                  "Cycling",
                ]}
                typingSpeed={60}
                pauseDuration={2000}
                deletingSpeed={40}
                loop={true}
                showCursor={true}
                cursorCharacter="|"
                className="font-medium text-white"
              />
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-4">

              <a
                href="/about"
                className="rounded-full bg-zinc-50 px-6 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white transition"
              >
                About Me
              </a>

              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-400"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>

              <a
                href={site.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-400"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>

              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-400"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>

            </div>

            {/* Resume hint */}
            <p className="text-xs text-zinc-500 pt-1">
              Resume available inside the About Me button.
            </p>

          </div>

          {/* IMAGE */}
          <div className="relative w-full max-w-sm">

            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 shadow-[0_24px_80px_rgba(0,0,0,0.7)]">

              <Image
                src="/pic 3.png"
                alt="Portrait of Apurva Shinde"
                width={682}
                height={1024}
                className="w-full h-full object-cover"
                priority
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}