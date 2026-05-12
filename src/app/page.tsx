import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import TextScramble from "@/components/TextScramble";
import MagneticButton from "@/components/MagneticButton";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Education />
      
      <footer className="relative w-full min-h-[80vh] pt-32 pb-12 flex flex-col items-center justify-between bg-foreground text-background overflow-hidden z-10 border-t border-background/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.5)_0,transparent_50%)] pointer-events-none mix-blend-overlay" />
        
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full mt-16">
          <TextScramble 
            text="LET'S TALK" 
            className="text-[13vw] font-bold tracking-tighter leading-none uppercase text-center cursor-pointer text-background hover:text-primary transition-colors duration-500"
          />
          <a href="mailto:hello@example.com" className="mt-8 text-2xl md:text-3xl font-medium tracking-tight border-b-2 border-transparent hover:border-background transition-colors duration-300">
            hello@example.com
          </a>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center px-12 mt-32 text-sm uppercase tracking-widest font-medium border-t border-background/20 pt-8 z-10">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Awwwards Winner</p>
          <div className="flex gap-4 md:gap-8">
            <MagneticButton>
              <a href="https://github.com" target="_blank" className="relative group p-4 block">
                <span>GitHub</span>
                <span className="absolute left-0 right-0 bottom-2 h-px bg-background scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://linkedin.com" target="_blank" className="relative group p-4 block">
                <span>LinkedIn</span>
                <span className="absolute left-0 right-0 bottom-2 h-px bg-background scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://twitter.com" target="_blank" className="relative group p-4 block">
                <span>Twitter</span>
                <span className="absolute left-0 right-0 bottom-2 h-px bg-background scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </MagneticButton>
          </div>
        </div>
      </footer>
    </main>
  );
}
