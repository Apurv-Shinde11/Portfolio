"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateVisibility = () => setIsVisible(window.scrollY > 320);

        updateVisibility();
        window.addEventListener("scroll", updateVisibility, { passive: true });
        return () => window.removeEventListener("scroll", updateVisibility);
    }, []);

    function scrollToTop() {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "instant" : "smooth",
        });
    }

    return (
        <button
            type="button"
            aria-label="Go to top"
            aria-hidden={!isVisible}
            tabIndex={isVisible ? 0 : -1}
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border shadow-md transition-[opacity,transform,background-color,color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--link-accent)] sm:bottom-8 sm:right-8 ${isVisible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-2 opacity-0"
                }`}
            style={{
                borderColor: "var(--card-border)",
                backgroundColor: "var(--card-bg)",
                color: "var(--foreground)",
            }}
        >
            <ArrowUp size={18} aria-hidden="true" />
        </button>
    );
}