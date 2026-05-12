"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const skillsRow1 = ["PYTHON", "JAVA", "REACT.JS", "TYPESCRIPT", "JAVASCRIPT", "PYTHON", "JAVA", "REACT.JS", "TYPESCRIPT", "JAVASCRIPT"];
const skillsRow2 = ["TAILWIND CSS", "FRAMER MOTION", "THREE.JS", "GSAP", "TAILWIND CSS", "FRAMER MOTION", "THREE.JS", "GSAP"];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Fast scroll multipliers for dramatic awwwards feel
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -4500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-4500, 0]);

  return (
    <section ref={containerRef} className="py-48 w-full overflow-hidden bg-background relative flex flex-col justify-center gap-8 md:gap-16 border-t border-foreground/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl text-center z-10 pointer-events-none mix-blend-difference text-white">
        <h2 className="text-xl md:text-2xl font-medium tracking-widest uppercase mb-4 opacity-50">Core Arsenal</h2>
        <p className="text-sm md:text-base opacity-30">Technologies driving the experience.</p>
      </div>

      <motion.div style={{ x: x1 }} className="flex whitespace-nowrap gap-16 md:gap-32 will-change-transform opacity-90">
        {skillsRow1.map((skill, i) => (
          <div key={i} className="flex items-center gap-16 md:gap-32">
            <span 
              className="text-[10vw] font-bold tracking-tighter leading-none text-transparent hover-target transition-colors duration-500 hover:text-foreground cursor-default"
              style={{ WebkitTextStroke: "2px currentColor" }}
            >
              {skill}
            </span>
            <span className="text-[2vw] text-foreground/20">✦</span>
          </div>
        ))}
      </motion.div>

      <motion.div style={{ x: x2 }} className="flex whitespace-nowrap gap-16 md:gap-32 will-change-transform opacity-90">
        {skillsRow2.map((skill, i) => (
          <div key={i} className="flex items-center gap-16 md:gap-32">
            <span className="text-[10vw] font-bold tracking-tighter leading-none text-foreground hover-target transition-all duration-500 hover:text-transparent cursor-default"
                  style={{ WebkitTextStroke: "2px currentColor" }}>
              {skill}
            </span>
            <span className="text-[2vw] text-foreground/20">✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
