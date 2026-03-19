"use client";

import { useInView, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

export default function CountUp({
    to,
    from = 0,
    direction = "up",
    delay = 0,
    duration = 2,
    className = "",
    startWhen = true,
    separator = ",",
    onStart,
    onEnd,
}: any) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const motionValue = useMotionValue(direction === "down" ? to : from);

    const damping = 20 + 40 * (1 / duration);
    const stiffness = 100 * (1 / duration);

    const springValue = useSpring(motionValue, {
        damping,
        stiffness,
    });

    const isInView = useInView(ref, { once: true });

    const formatValue = useCallback(
        (latest: number | string) => {
            const num = Number(latest);
            return Intl.NumberFormat("en-US", {
                useGrouping: true,
            }).format(num);
        },
        []
    );

    useEffect(() => {
        if (isInView && startWhen) {
            if (onStart) onStart();

            const timeout = setTimeout(() => {
                motionValue.set(direction === "down" ? from : to);
            }, delay * 1000);

            return () => clearTimeout(timeout);
        }
    }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = formatValue(Number(latest));
            }
        });

        return () => unsubscribe();
    }, [springValue, formatValue]);

    return <span ref={ref} className={className} />;
}