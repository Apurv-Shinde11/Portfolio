export const site = {
  name: "Apurva Shinde",
  title: "Data Analyst",
  headline: "Data-driven systems. Automation-first analytics.",
  summary:
    "I design data-driven solutions that transform business inefficiencies into automated analytical systems—blending analytics, financial modeling, and AI to deliver measurable, real-world impact.",
  email: "apurv350@gmail.com",

  // URL-encode spaces so the link works reliably
  resumeHref: "/Apurva%20Shinde%20-%20Analyst%20Resume.pdf",

  socials: {
    linkedin: "https://www.linkedin.com/in/apurv-shinde/",
    github: "https://github.com/Apurv-Shinde11",
    instagram: "https://www.instagram.com/_apurvshinde_/?hl=en",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "About Me", href: "/about" },
] as const;