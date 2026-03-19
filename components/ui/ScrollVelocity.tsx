"use client";

import { useRef, useLayoutEffect, useState } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "motion/react";

// ✅ FIXED: Proper typing for nullable ref
function useElementWidth(ref: React.RefObject<HTMLDivElement | null>) {
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        function updateWidth() {
            // ✅ Safe null check
            const width = ref.current ? ref.current.offsetWidth : 0;
            setWidth(width);
        }

        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, [ref]);

    return width;
}

interface ScrollVelocityProps {
    scrollContainerRef?: React.RefObject<HTMLElement>;
    texts?: string[];
    velocity?: number;
    damping?: number;
    stiffness?: number;
    numCopies?: number;
    velocityMapping?: {
        input: [number, number];
        output: [number, number];
    };
    parallaxClassName?: string;
    scrollerClassName?: string;
}

export default function ScrollVelocity({
    scrollContainerRef,
    texts = [],
    velocity = 30,
    damping = 50,
    stiffness = 400,
    numCopies = 6,
    velocityMapping = { input: [0, 1000], output: [0, 5] },
    parallaxClassName = "relative overflow-hidden py-3",
    scrollerClassName = "flex whitespace-nowrap items-center gap-3",
}: ScrollVelocityProps) {
    const baseX = useMotionValue(0);

    const scrollOptions = scrollContainerRef
        ? { container: scrollContainerRef }
        : {};

    const { scrollY } = useScroll(scrollOptions);

    const scrollVelocity = useVelocity(scrollY);

    const smoothVelocity = useSpring(scrollVelocity, {
        damping,
        stiffness,
    });

    const velocityFactor = useTransform(
        smoothVelocity,
        velocityMapping.input,
        velocityMapping.output,
        { clamp: false }
    );

    // ✅ Correct ref typing
    const copyRef = useRef<HTMLDivElement | null>(null);

    const copyWidth = useElementWidth(copyRef);

    function wrap(min: number, max: number, v: number) {
        const range = max - min;
        const mod = (((v - min) % range) + range) % range;
        return mod + min;
    }

    const x = useTransform(baseX, (v) => {
        if (copyWidth === 0) return "0px";
        return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef(1);

    useAnimationFrame((_, delta) => {
        let moveBy = directionFactor.current * velocity * (delta / 1000);

        if (velocityFactor.get() < 0) directionFactor.current = -1;
        else if (velocityFactor.get() > 0) directionFactor.current = 1;

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    const skillRow = (
        <div ref={copyRef} className="flex items-center gap-3">
            {texts.map((text) => (
                <span
                    key={text}
                    className="flex-shrink-0 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-sm text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800"
                >
                    {text}
                </span>
            ))}
        </div>
    );

    const copies = [];

    for (let i = 0; i < numCopies; i++) {
        copies.push(
            <div key={i} className="flex items-center gap-3">
                {skillRow}
            </div>
        );
    }

    return (
        <section>
            <div className={parallaxClassName}>
                <motion.div className={scrollerClassName} style={{ x }}>
                    {copies}
                </motion.div>
            </div>
        </section>
    );
}