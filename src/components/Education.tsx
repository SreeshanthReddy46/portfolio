"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const educationItems = [
  {
    year: "PRESENT",
    title: "B.Tech in Computer Science Engineering (4th Sem)",
    institution: "Sree Dattha Group of Institutions",
    desc: "Currently pursuing degree. Current CGPA: 8.07.",
    tags: ["Computer Science", "Engineering", "CGPA 8.07"],
  },
];

function SectionTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="overflow-hidden mb-12 md:mb-24">
      <motion.h2
        ref={ref}
        initial={{ y: "110%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-6xl font-bold tracking-tighter uppercase"
      >
        Academic <br />{" "}
        <span className="text-foreground/50 italic font-normal">&amp; Honors</span>
      </motion.h2>
    </div>
  );
}

function EducationRow({
  item,
  index,
}: {
  item: (typeof educationItems)[0];
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  // Touch-friendly: toggle active on tap, hover on desktop
  const [active, setActive] = useState(false);

  // Spotlight state
  const [spotlight, setSpotlight] = useState<{ x: number; y: number } | null>(null);

  const toggle = () => setActive((p) => !p);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight(null);
  }, []);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={toggle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`edu-row group relative flex flex-col md:flex-row justify-between py-10 md:py-12 border-t border-foreground/10 cursor-pointer overflow-hidden select-none ${
        active ? "edu-active" : ""
      }`}
    >
      {/* Hover fill sweep — also triggers on .edu-active (touch tap) */}
      <div className="edu-fill absolute inset-0 bg-foreground translate-y-[101%] transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />

      {/* Mouse spotlight radial glow */}
      {spotlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute z-[1] transition-opacity duration-300"
          style={{
            left: spotlight.x,
            top: spotlight.y,
            transform: "translate(-50%, -50%)",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,240,255,0.55) 0%, rgba(138,43,226,0.35) 35%, rgba(255,0,127,0.10) 60%, transparent 75%)",
            filter: "blur(6px)",
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* Left: year + institution */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="edu-left relative z-10 flex flex-col md:w-1/3 mb-6 md:mb-0"
      >
        <span className="text-xs md:text-sm uppercase tracking-widest text-foreground/50 transition-colors duration-300 mb-2">
          {item.year}
        </span>
        <span className="text-base md:text-xl font-bold uppercase tracking-wide transition-colors duration-300">
          {item.institution}
        </span>
      </motion.div>

      {/* Right: title + desc + tags */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col md:w-2/3"
      >
        <h3 className="edu-title text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-3 md:mb-4 transition-colors duration-300 leading-tight">
          {item.title}
        </h3>
        <p className="edu-desc text-sm md:text-base text-foreground/70 transition-colors duration-300 max-w-xl mb-5 md:mb-6 leading-relaxed">
          {item.desc}
        </p>
        {/* Tag pills */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          {item.tags.map((tag, j) => (
            <motion.span
              key={j}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + j * 0.1 }}
              className="edu-tag text-xs uppercase tracking-widest px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-foreground/20 text-foreground/60 transition-colors duration-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Arrow */}
      <div className="edu-arrow absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 opacity-0 transition-opacity duration-500 text-background">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <path
            d="M6 16h20M18 8l8 8-8 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineScaleX = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-48 w-full bg-background text-foreground relative z-10 border-t border-foreground/5 overflow-hidden"
    >
      {/* Parallax bg accent */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-1/2 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-gradient-to-bl from-[#00f0ff]/5 to-[#8a2be2]/5 blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/4" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10">
        <SectionTitle />

        {/* Top gradient line */}
        <div className="h-px bg-foreground/10 relative overflow-hidden mb-0">
          <motion.div
            style={{ scaleX: lineScaleX, originX: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#8a2be2]"
          />
        </div>

        <div className="flex flex-col border-b border-foreground/10">
          {educationItems.map((item, i) => (
            <EducationRow key={i} item={item} index={i} />
          ))}
        </div>

        {/* Tap hint for mobile */}
        <p className="md:hidden text-xs text-foreground/30 uppercase tracking-widest mt-4 text-center">
          Tap a row to interact
        </p>
      </div>
    </section>
  );
}
