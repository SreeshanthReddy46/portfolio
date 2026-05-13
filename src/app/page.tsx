import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import TextScramble from "@/components/TextScramble";
import MagneticButton from "@/components/MagneticButton";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Education />

      <Footer />
    </main>
  );
}
