import React from "react";

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" {...props}>
            <path
                fill="currentColor"
                d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v14h-4V8zm7 0h3.8v1.9h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.66 4.8 6.12V22h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V22h-4V8z"
            />
        </svg>
    );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" {...props}>
            <path
                fill="currentColor"
                d="M12 .5C5.65.5.7 5.44.7 11.79c0 5 3.24 9.23 7.73 10.73.57.1.78-.25.78-.55
        0-.27-.01-1.15-.02-2.08-3.14.68-3.8-1.33-3.8-1.33-.52-1.33-1.27-1.68-1.27-1.68
        -1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.68 1.24 3.33.95
        .1-.74.4-1.24.72-1.53-2.5-.28-5.13-1.25-5.13-5.57
        0-1.23.44-2.24 1.17-3.03-.12-.29-.51-1.45.11-3.02
        0 0 .96-.31 3.15 1.16a10.9 10.9 0 0 1 2.87-.39
        c.97 0 1.95.13 2.87.39 2.19-1.47 3.15-1.16 3.15-1.16
        .62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.03
        0 4.33-2.63 5.29-5.14 5.57.41.36.77 1.08.77 2.18
        0 1.57-.01 2.83-.01 3.21
        0 .31.21.66.79.55 4.48-1.5 7.72-5.73 7.72-10.73
        C23.3 5.44 18.35.5 12 .5Z"
            />
        </svg>
    );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" {...props}>
            <path
                fill="currentColor"
                d="M2 4h20v16H2V4zm10 9L3 6v12h18V6l-9 7z"
            />
        </svg>
    );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" {...props}>
            <path
                fill="currentColor"
                d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm6-1.75a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 18 5.75z"
            />
        </svg>
    );
}

export default function Collaboration() {
    return (
        <section id="contact" className="py-32 px-6 border-t border-zinc-800">

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-start">

                {/* LEFT COLUMN */}
                <div className="md:col-span-1">

                    <h3 className="text-1xl sm:text-3xl font-semibold tracking-tight mb-4">
                        Let's Build Something Intelligent Impactful
                    </h3>

                    <p className="text-zinc-400 leading-relaxed">
                        Thank you for visiting my portfolio. Connect with me over socials.
                    </p>
                    <p className="text-zinc-400 leading-relaxed">
                        If you're working on something meaningful in this space,
                        let's connect.
                    </p>

                </div>

                {/* Spacer column */}
                <div className="hidden md:block"></div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-4 text-zinc-300">

                    <p className="text-3xl font-semibold">Reach me out on</p>

                    <p className="text-zinc-400">
                        apurv350@gmail.com
                    </p>

                    <p className="text-zinc-400">
                        Mumbai, India — 400094
                    </p>

                    {/* Social icons */}
                    <div className="flex gap-5 pt-3">

                        <a
                            href="https://www.linkedin.com/in/apurv-shinde/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white transition"
                        >
                            <LinkedInIcon className="w-5 h-5" />
                        </a>

                        <a
                            href="https://github.com/Apurv-Shinde11"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white transition"
                        >
                            <GitHubIcon className="w-5 h-5" />
                        </a>

                        <a
                            href="mailto:apurv350@gmail.com"
                            className="hover:text-white transition"
                        >
                            <MailIcon className="w-5 h-5" />
                        </a>

                        <a
                            href="https://www.instagram.com/_apurvshinde_/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white transition"
                        >
                            <InstagramIcon className="w-5 h-5" />
                        </a>

                    </div>

                </div>

            </div>

        </section>
    );
}