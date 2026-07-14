import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Collaboration from "@/components/sections/Collaboration";
import MyWorld from "@/components/sections/MyWorld";

export default function Home() {
  return (
    <main id="content" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <Hero />
      <MyWorld />
      <Projects />
      <Skills />
      <Collaboration />
    </main>
  );
}
