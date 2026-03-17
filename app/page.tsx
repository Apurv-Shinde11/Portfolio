import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Collaboration from "@/components/sections/Collaboration";
import MyWorld from "@/components/sections/MyWorld";
import AboutMe from "@/components/sections/AboutSnapshot";

export default function Home() {
  return (
    <main id="content" className="bg-[#0A0F1C] text-zinc-50">
      <Hero />
      <MyWorld />
      <Projects />
      <Skills />
      <Collaboration />
    </main>
  );
}