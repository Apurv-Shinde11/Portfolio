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
            setTime(
                now.toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "medium",
                })
            );
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-[#020617] py-24 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Section Title */}
                <h2 className="text-3xl font-semibold text-white mb-12">
                    My World
                </h2>

                {/* Grid Layout */}
                <div className="grid md:grid-cols-3 gap-6">

                    {/* Card 1 — Photo */}
                    <div className="overflow-hidden rounded-3xl border border-zinc-800">

                        <Image
                            src="/pic 1.png"
                            alt="Apurva Shinde"
                            width={400}
                            height={400}
                            className="rounded-xl object-cover"
                        />

                    </div>

                    {/* Card 2 — Location + Globe */}
                    <div className="rounded-2xl border border-zinc-800 p-6 bg-zinc-900/40 flex flex-col items-center text-center hover:scale-[1.02] transition duration-300">

                        <div className="mb-4">
                            <p className="text-zinc-400 text-sm mb-1">
                                Swipe the globe to reach
                            </p>

                            <h3 className="text-xl text-white font-medium">
                                Mumbai, India
                            </h3>
                        </div>

                        {/* Globe */}
                        <div className="my-15">
                            <MumbaiGlobe />
                        </div>

                        {/* Time */}
                        <p className="text-white text-md">
                            {time}
                        </p>

                    </div>

                    {/* Card 3 — Social Links */}
                    <div className="rounded-2xl border border-zinc-800 p-6 bg-zinc-900/40 hover:scale-[1.02] transition duration-300">

                        <p className="text-zinc-400 text-md mb-8 text-center">
                            Find me here
                        </p>

                        <div className="grid grid-cols-2 gap-8">

                            <a
                                href="https://github.com/Apurv-Shinde11"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2 text-white hover:text-gray-400 transition p-4 rounded-lg hover:bg-zinc-800/60"
                            >
                                <Github size={36} />
                                <span className="text-sm">GitHub</span>
                            </a>

                            <a
                                href="https://linkedin.com/in/apurv-shinde"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2 text-white hover:text-blue-400 transition p-4 rounded-lg hover:bg-zinc-800/60"
                            >
                                <Linkedin size={36} />
                                <span className="text-sm">LinkedIn</span>
                            </a>

                            <a
                                href="mailto:apurv350@gmail.com"
                                className="flex flex-col items-center gap-2 text-white hover:text-yellow-400 transition p-4 rounded-lg hover:bg-zinc-800/60"
                            >
                                <Mail size={36} />
                                <span className="text-sm">Email</span>
                            </a>

                            <a
                                href="https://instagram.com/YOUR_HANDLE"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2 text-white hover:text-pink-400 transition p-4 rounded-lg hover:bg-zinc-800/60"
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