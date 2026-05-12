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

      {/* Footer CTA */}
      <footer
        id="contact"
        className="relative w-full min-h-[70vh] md:min-h-[80vh] pt-20 md:pt-32 pb-10 md:pb-12 flex flex-col items-center justify-between bg-foreground text-background overflow-hidden z-10 border-t border-background/10"
      >
        {/* Radial glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.5)_0,transparent_50%)] pointer-events-none mix-blend-overlay" />

        {/* Big CTA text */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full mt-8 md:mt-16 px-5">
          <TextScramble
            text="LET'S TALK"
            className="text-[15vw] md:text-[13vw] font-bold tracking-tighter leading-none uppercase text-center cursor-pointer text-background hover:text-primary transition-colors duration-500"
          />
          <a
            href="mailto:sreeshanthreddy21@gmail.com"
            className="mt-6 md:mt-8 text-lg md:text-2xl lg:text-3xl font-medium tracking-tight border-b-2 border-transparent hover:border-background transition-colors duration-300 break-all text-center px-4"
          >
            sreeshanthreddy21@gmail.com
          </a>
        </div>

        {/* Bottom bar */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center px-5 md:px-12 mt-16 md:mt-32 text-xs md:text-sm uppercase tracking-widest font-medium border-t border-background/20 pt-6 md:pt-8 z-10 gap-4 sm:gap-0">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} Sreeshanth Reddy</p>
          <div className="flex gap-5 md:gap-8">
            <MagneticButton>
              <a
                href="https://github.com/SreeshanthReddy46"
                target="_blank"
                rel="noreferrer"
                className="relative group p-2 block"
              >
                <span>GitHub</span>
                <span className="absolute left-0 right-0 bottom-0 h-px bg-background scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="relative group p-2 block"
              >
                <span>LinkedIn</span>
                <span className="absolute left-0 right-0 bottom-0 h-px bg-background scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="relative group p-2 block"
              >
                <span>Twitter</span>
                <span className="absolute left-0 right-0 bottom-0 h-px bg-background scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </MagneticButton>
          </div>
        </div>
      </footer>
    </main>
  );
}
