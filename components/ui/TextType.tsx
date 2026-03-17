"use client";

import { useEffect, useState } from "react";

type TextTypeProps = {
    text: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    loop?: boolean;
    showCursor?: boolean;
    cursorCharacter?: string;
    className?: string;
};

export default function TextType({
    text,
    typingSpeed = 60,
    deletingSpeed = 40,
    pauseDuration = 2000,
    loop = true,
    showCursor = true,
    cursorCharacter = "|",
    className = "",
}: TextTypeProps) {

    const [displayText, setDisplayText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {

        const currentText = text[textIndex];

        let timeout: NodeJS.Timeout;

        if (!isDeleting) {

            if (charIndex < currentText.length) {

                timeout = setTimeout(() => {
                    setDisplayText(currentText.slice(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                }, typingSpeed);

            } else {

                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, pauseDuration);

            }

        } else {

            if (charIndex > 0) {

                timeout = setTimeout(() => {
                    setDisplayText(currentText.slice(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                }, deletingSpeed);

            } else {

                setIsDeleting(false);

                const nextIndex = textIndex + 1;

                if (nextIndex < text.length) {
                    setTextIndex(nextIndex);
                } else if (loop) {
                    setTextIndex(0);
                }

            }

        }

        return () => clearTimeout(timeout);

    }, [charIndex, isDeleting, textIndex, text, typingSpeed, deletingSpeed, pauseDuration, loop]);

    return (
        <span className={`inline-flex items-center ${className}`}>
            {displayText}

            {showCursor && (
                <span className="ml-1 animate-pulse">
                    {cursorCharacter}
                </span>
            )}

        </span>
    );
}