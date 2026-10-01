import Hero from "@/components/sections/Hero";
import JourneyTeaser from "@/components/sections/JourneyTeaser";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Collaboration from "@/components/sections/Collaboration";
import MyWorld from "@/components/sections/MyWorld";

export default function Home() {
  return (
    <main id="content" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <Hero />
      <JourneyTeaser />
      <MyWorld />
      <Projects />
      <Skills />
      <Collaboration />
    </main>
  );
}
