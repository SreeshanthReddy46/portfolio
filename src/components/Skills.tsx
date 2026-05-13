"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const skillsRow1 = [
  "PYTHON", "JAVA", "REACT.JS", "TYPESCRIPT", "JAVASCRIPT",
  "PYTHON", "JAVA", "REACT.JS", "TYPESCRIPT", "JAVASCRIPT",
];
const skillsRow2 = [
  "TAILWIND CSS", "FRAMER MOTION", "THREE.JS", "GSAP",
  "TAILWIND CSS", "FRAMER MOTION", "THREE.JS", "GSAP",
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scroll-driven marquee — responsive speed
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -3500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-3500, 0]);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-48 w-full overflow-hidden bg-background relative flex flex-col justify-center gap-6 md:gap-16 border-t border-foreground/5"
    >
      {/* Center label */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs md:max-w-2xl text-center z-10 pointer-events-none mix-blend-difference text-white px-4"
      >
        <h2 className="text-base md:text-2xl font-medium tracking-widest uppercase mb-2 md:mb-4 opacity-50">
          Core Arsenal
        </h2>
        <p className="text-xs md:text-base opacity-30">Technologies driving the experience.</p>
      </motion.div>

      {/* Row 1 — scrolls left */}
      <motion.div
        style={{ x: x1 }}
        className="flex whitespace-nowrap gap-8 md:gap-32 will-change-transform opacity-90"
      >
        {skillsRow1.map((skill, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-32">
            <span
              className="text-[12vw] md:text-[10vw] font-bold tracking-tighter leading-none text-transparent transition-all duration-500 hover:text-foreground cursor-default opacity-30 hover:opacity-100"
              style={{ WebkitTextStroke: "1.5px var(--foreground)" }}
            >
              {skill}
            </span>
            <span className="text-[3vw] md:text-[2vw] text-foreground/20">✦</span>
          </div>
        ))}
      </motion.div>

      {/* Row 2 — scrolls right */}
      <motion.div
        style={{ x: x2 }}
        className="flex whitespace-nowrap gap-8 md:gap-32 will-change-transform opacity-90"
      >
        {skillsRow2.map((skill, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-32">
            <span
              className="text-[12vw] md:text-[10vw] font-bold tracking-tighter leading-none text-transparent transition-all duration-500 hover:text-foreground cursor-default opacity-30 hover:opacity-100"
              style={{ WebkitTextStroke: "1.5px var(--foreground)" }}
            >
              {skill}
            </span>
            <span className="text-[3vw] md:text-[2vw] text-foreground/20">✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
