"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MumbaiGlobe from "@/components/ui/Globe";
import { Github, Linkedin, Mail, Instagram, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import styles from "./MyWorld.module.css";

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

        <div className={styles.layout} data-my-world-cards>

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

          <div className={styles.showcase} aria-labelledby="find-me-heading">
            <div className={styles.intro}>
              <h3 id="find-me-heading">Find Me Here</h3>
              <p>What I build, what I share, and life in between.</p>
            </div>
            <div className={styles.socialGrid}>
              <a href="https://github.com/Apurv-Shinde11" target="_blank" rel="noopener noreferrer" className={`${styles.preview} ${styles.github}`}>
                <div className={styles.label}><Github size={18} aria-hidden="true" /><span>GitHub</span><ArrowUpRight size={16} aria-hidden="true" /></div>
                <p className={styles.caption}>Apurv-Shinde11 / Building in public</p>
                <div className={`${styles.imageFrame} ${styles.githubFrame}`}>
                  <Image src="/socials/github-contributions.png" alt="GitHub contribution calendar for Apurv-Shinde11, with authentic green activity squares across the year." width={1120} height={222} sizes="(min-width: 1024px) 650px, (min-width: 640px) 85vw, 90vw" loading="lazy" className={styles.screenshot} />
                </div>
                <span className="sr-only">Opens GitHub in a new tab.</span>
              </a>
              <a href="https://linkedin.com/in/apurv-shinde" target="_blank" rel="noopener noreferrer" className={`${styles.preview} ${styles.linkedin}`}>
                <div className={styles.label}><Linkedin size={18} aria-hidden="true" /><span>LinkedIn</span><ArrowUpRight size={16} aria-hidden="true" /></div>
                <p className={styles.caption}>Professional life &amp; perspectives</p>
                <div className={`${styles.imageFrame} ${styles.linkedinFrame}`}>
                  <Image src="/socials/linkedin-profile.png" alt="Apurva Shinde's LinkedIn profile header, portrait, and Strategy Analyst role in Mumbai." width={900} height={585} sizes="(min-width: 1024px) 350px, (min-width: 640px) 50vw, 90vw" loading="lazy" className={styles.screenshot} />
                </div>
                <span className="sr-only">Opens LinkedIn in a new tab.</span>
              </a>
              <a href="https://www.instagram.com/_apurvshinde_/" target="_blank" rel="noopener noreferrer" className={`${styles.preview} ${styles.instagram}`}>
                <div className={styles.label}><Instagram size={18} aria-hidden="true" /><span>Instagram</span><ArrowUpRight size={16} aria-hidden="true" /></div>
                <p className={styles.caption}>_apurvshinde_ / Just for fun</p>
                <div className={`${styles.imageFrame} ${styles.instagramFrame}`}>
                  <Image src="/socials/instagram-profile.png" alt="Apurv's Instagram profile, showing the portrait, public post and follower counts, and Just for fun bio." width={720} height={248} sizes="(min-width: 1024px) 290px, (min-width: 640px) 40vw, 90vw" loading="lazy" className={styles.screenshot} />
                </div>
                <span className="sr-only">Opens Instagram in a new tab.</span>
              </a>
              <a href={`mailto:${site.email}`} className={`${styles.preview} ${styles.email}`}>
                <div className={styles.label}><Mail size={18} aria-hidden="true" /><span>Let&apos;s connect</span><ArrowUpRight size={16} aria-hidden="true" /></div>
                <p className={styles.emailAddress}>{site.email}</p>
                <p className={styles.caption}>An idea, a question, or a simple hello.</p>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
