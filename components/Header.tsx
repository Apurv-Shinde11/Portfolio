"use client";

import { navLinks, site } from "@/data/site";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur"
      style={{
        borderBottom: "1px solid var(--header-border)",
        backgroundColor: "var(--header-bg)",
      }}
    >
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-950"
      >
        Skip to content
      </a>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10 lg:px-12">

        <Link
          href="/"
          className="text-sm font-semibold tracking-tight transition"
          style={{ color: "var(--foreground)" }}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition"
              style={{ color: "var(--nav-text)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--nav-text-hover)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--nav-text)")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-[0_0_40px_rgba(250,250,250,0.18)] transition hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
            }}
          >
            Contact
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>

      </div>
    </header>
  );
}
