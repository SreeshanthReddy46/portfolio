"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { motion, AnimatePresence } from "framer-motion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    link: "https://gsap-macbook-page-lac.vercel.app/",
  },
  {
    title: "INTERVPREP AI",
    category: "AI Platform",
    client: "Fullstack",
    desc: "An AI-powered interview preparation platform designed to help users practice, improve communication skills, and prepare confidently for real-world interviews.",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
    link: "https://intervprep-ai.lovable.app",
  },
];

/* ─────────────────── Desktop (horizontal GSAP scroll) ─────────────────── */
function DesktopProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;

      const getScrollAmount = () => {
        const amount = wrapper.scrollWidth - window.innerWidth;
        return amount > 0 ? amount : window.innerWidth;
      };

      gsap.to(wrapper, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollAmount() * 1.5}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const skewAmount = Math.max(-15, Math.min(15, velocity / -200));
            gsap.to(".project-card", {
              skewX: skewAmount,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            });
            gsap.to(".project-card", {
              skewX: 0,
              duration: 0.8,
              ease: "power3.out",
              delay: 0.1,
            });
          },
        },
      });
    }, containerRef);

    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div
      id="work"
      ref={containerRef}
      className="hidden md:block h-screen w-full bg-background overflow-hidden relative border-t border-foreground/5"
    >
      <div className="absolute top-24 left-12 z-10 mix-blend-difference text-white">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
          Selected <br /> Works
        </h2>
      </div>

      <div
        ref={scrollWrapperRef}
        className="flex flex-nowrap w-max h-full items-center pl-[30vw] pr-[20vw]"
      >
        {projects.map((project, i) => (
          <div
            key={i}
            className="project-card w-[50vw] h-[60vh] flex-shrink-0 mx-8 relative group cursor-pointer"
          >
            <div className="w-full h-full relative overflow-hidden bg-foreground/5 border border-foreground/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                style={{ clipPath: "inset(10% 10% 10% 10%)" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLImageElement).style.clipPath =
                    "inset(0% 0% 0% 0%)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLImageElement).style.clipPath =
                    "inset(10% 10% 10% 10%)")
                }
              />
              <div className="absolute inset-0 border border-foreground/20 m-8 group-hover:m-0 group-hover:border-transparent transition-all duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
            </div>

            <div className="absolute -bottom-12 left-0 right-0 flex justify-between items-end mix-blend-difference text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:-translate-y-4 transition-all duration-500 ease-out z-20">
              <div className="max-w-xl">
                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">
                  {project.title}
                </h3>
                <p className="text-sm uppercase tracking-widest text-white/70 mb-4">
                  {project.category} // {project.client}
                </p>
                <p className="text-sm text-white/80 line-clamp-3">{project.desc}</p>
              </div>
              <MagneticButton>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/20 hover:bg-white hover:text-black transition-colors duration-300 pointer-events-auto"
                >
                  <ArrowUpRight className="w-6 h-6" />
                </a>
              </MagneticButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── Mobile (tap-to-expand cards) ─────────────────── */
function MobileProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col rounded-2xl overflow-hidden border border-foreground/10 bg-foreground/[0.02] active:scale-[0.98] transition-transform duration-200"
    >
      {/* Image */}
      <div
        className="w-full aspect-video relative overflow-hidden"
        onClick={() => setExpanded((p) => !p)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            expanded ? "grayscale-0 opacity-100 scale-105" : "grayscale opacity-60"
          }`}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Always-visible title on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold tracking-tighter text-white">
            {project.title}
          </h3>
          <p className="text-xs uppercase tracking-widest text-white/60 mt-1">
            {project.category} — {project.client} — {project.year}
          </p>
        </div>

        {/* Expand/collapse indicator */}
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white"
        >
          <ArrowUpRight className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Expandable detail panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4 border-t border-foreground/10">
              <p className="text-sm text-foreground/70 leading-relaxed">
                {project.desc}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-widest active:scale-95 transition-transform"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Visit Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MobileProjects() {
  return (
    <section
      id="work"
      className="md:hidden w-full bg-background border-t border-foreground/5 py-20 px-5"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl font-bold tracking-tighter uppercase leading-none mb-4"
      >
        Selected <br /> Works
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xs uppercase tracking-widest text-foreground/30 mb-10"
      >
        Tap a card to explore
      </motion.p>

      <div className="flex flex-col gap-6">
        {projects.map((project, i) => (
          <MobileProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────── Exports ─────────────────── */
export default function Projects() {
  return (
    <>
      <DesktopProjects />
      <MobileProjects />
    </>
  );
}
