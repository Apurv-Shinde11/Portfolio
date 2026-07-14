"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MumbaiGlobe from "@/components/ui/Globe";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export default function MyWorld() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "medium" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-6" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-semibold mb-12" style={{ color: "var(--foreground)" }}>
          My World
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Card 1 — Photo */}
          <div
            className="overflow-hidden rounded-3xl"
            style={{ border: "1px solid var(--card-border)" }}
          >
            <Image
              src="/pic 1.png"
              alt="Apurva Shinde"
              width={400}
              height={400}
              className="rounded-xl object-cover"
            />
          </div>

          {/* Card 2 — Location + Globe */}
          <div
            className="rounded-2xl p-6 flex flex-col items-center text-center hover:scale-[1.02] transition duration-300"
            style={{ border: "1px solid var(--card-border)", backgroundColor: "var(--card-bg)" }}
          >
            <div className="mb-4">
              <p className="text-sm mb-1" style={{ color: "var(--foreground-muted)" }}>
                Swipe the globe to reach
              </p>
              <h3 className="text-xl font-medium" style={{ color: "var(--foreground)" }}>
                Mumbai, India
              </h3>
            </div>
            <div className="my-15">
              <MumbaiGlobe />
            </div>
            <p className="text-md" style={{ color: "var(--foreground)" }}>
              {time}
            </p>
          </div>

          {/* Card 3 — Social Links */}
          <div
            className="rounded-2xl p-6 hover:scale-[1.02] transition duration-300"
            style={{ border: "1px solid var(--card-border)", backgroundColor: "var(--card-bg)" }}
          >
            <p className="text-md mb-8 text-center" style={{ color: "var(--foreground-muted)" }}>
              Find me here
            </p>
            <div className="grid grid-cols-2 gap-8">
              <a
                href="https://github.com/Apurv-Shinde11"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 transition p-4 rounded-lg"
                style={{ color: "var(--foreground)" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--social-hover-bg)"; e.currentTarget.style.color = "var(--foreground-muted)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--foreground)"; }}
              >
                <Github size={36} />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/apurv-shinde"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 transition p-4 rounded-lg"
                style={{ color: "var(--foreground)" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--social-hover-bg)"; e.currentTarget.style.color = "#3b82f6"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--foreground)"; }}
              >
                <Linkedin size={36} />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="mailto:apurv350@gmail.com"
                className="flex flex-col items-center gap-2 transition p-4 rounded-lg"
                style={{ color: "var(--foreground)" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--social-hover-bg)"; e.currentTarget.style.color = "#eab308"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--foreground)"; }}
              >
                <Mail size={36} />
                <span className="text-sm">Email</span>
              </a>
              <a
                href="https://www.instagram.com/_apurvshinde_/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 transition p-4 rounded-lg"
                style={{ color: "var(--foreground)" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--social-hover-bg)"; e.currentTarget.style.color = "#ec4899"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--foreground)"; }}
              >
                <Instagram size={36} />
                <span className="text-sm">Instagram</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
