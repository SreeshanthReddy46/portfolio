"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  { 
    title: "GSAP MACBOOK", 
    category: "Showcase Website", 
    client: "Frontend",
    desc: "A modern GSAP-powered MacBook showcase website with smooth scroll animations, immersive transitions, and premium Apple-inspired UI interactions.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    link: "https://gsap-macbook-page-lac.vercel.app/"
  },
  { 
    title: "INTERVPREP AI", 
    category: "AI Platform", 
    client: "Fullstack",
    desc: "An AI-powered interview preparation platform designed to help users practice, improve communication skills, and prepare confidently for real-world interviews.",
    year: "2024",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
    link: "https://intervprep-ai.lovable.app"
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;

      const getScrollAmount = () => {
        const amount = wrapper.scrollWidth - window.innerWidth;
        return amount > 0 ? amount : window.innerWidth; // Fallback
      };

      gsap.to(wrapper, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollAmount() * 1.5}`, // Multiply by 1.5 to make scrolling smoother and give time to read the last project
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const skewAmount = Math.max(-15, Math.min(15, velocity / -200));
            
            gsap.to(".project-card", {
              skewX: skewAmount,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto"
            });
            
            gsap.to(".project-card", {
              skewX: 0,
              duration: 0.8,
              ease: "power3.out",
              delay: 0.1
            });
          }
        }
      });
    }, containerRef);

    // Force recalculation after layout settles to prevent overlap
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-background overflow-hidden relative border-t border-foreground/5">
      <div className="absolute top-24 left-12 z-10 mix-blend-difference text-white">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
          Selected <br/> Works
        </h2>
      </div>

      <div ref={scrollWrapperRef} className="flex flex-nowrap w-max h-full items-center pl-[30vw] pr-[20vw]">
        {projects.map((project, i) => (
          <div key={i} className="project-card w-[80vw] md:w-[50vw] h-[60vh] flex-shrink-0 mx-8 relative group cursor-pointer">
            <div className="w-full h-full relative overflow-hidden bg-foreground/5 border border-foreground/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-all duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                style={{ clipPath: "inset(10% 10% 10% 10%)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLImageElement).style.clipPath = "inset(0% 0% 0% 0%)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLImageElement).style.clipPath = "inset(10% 10% 10% 10%)";
                }}
              />
              <div className="absolute inset-0 border border-foreground/20 m-8 group-hover:m-0 group-hover:border-transparent transition-all duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
            </div>

            <div className="absolute -bottom-12 left-0 right-0 flex justify-between items-end mix-blend-difference text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:-translate-y-4 transition-all duration-500 ease-out z-20">
              <div className="max-w-xl">
                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">{project.title}</h3>
                <p className="text-sm uppercase tracking-widest text-white/70 mb-4">{project.category} // {project.client}</p>
                <p className="text-sm text-white/80 line-clamp-2 md:line-clamp-3">{project.desc}</p>
              </div>
              <MagneticButton>
                <a href={project.link} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/20 hover:bg-white hover:text-black transition-colors duration-300 pointer-events-auto">
                  <ArrowUpRight className="w-6 h-6" />
                </a>
              </MagneticButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
