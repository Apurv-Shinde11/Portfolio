"use client";

import { navLinks, site } from "@/data/site";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState({ open: false, pathname });
  const isMenuOpen = menuState.open && menuState.pathname === pathname;

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuState(previous => ({ ...previous, open: false }));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  function isActiveRoute(href: string) {
    if (href === "/") return pathname === "/";
    if (href.includes("#")) return false;
    return pathname === href;
  }

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
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--social-hover-bg)] md:hidden"
            style={{ color: "var(--foreground)" }}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuState({ open: !isMenuOpen, pathname })}
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
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

      <div
        id="mobile-navigation"
        className={`absolute left-0 right-0 top-full border-b px-6 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-[opacity,transform] duration-150 md:hidden ${isMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        style={{
          borderColor: "var(--header-border)",
          backgroundColor: "var(--header-bg)",
        }}
        inert={!isMenuOpen}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition hover:bg-[var(--social-hover-bg)]"
              style={{
                color: isActiveRoute(link.href) ? "var(--foreground)" : "var(--nav-text)",
                backgroundColor: isActiveRoute(link.href) ? "var(--social-hover-bg)" : "transparent",
              }}
              aria-current={isActiveRoute(link.href) ? "page" : undefined}
              onClick={() => setMenuState(previous => ({ ...previous, open: false }))}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
