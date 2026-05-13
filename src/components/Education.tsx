"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

const educationItems = [
  {
    year: "PRESENT",
    title: "B.Tech in Computer Science Engineering (4th Sem)",
    institution: "Sree Dattha Group of Institutions",
    desc: "Currently pursuing degree. Current CGPA: 8.07.",
    tags: ["Computer Science", "Engineering", "CGPA 8.07"],
  },
];

function SectionTitle({ isLampOn }: { isLampOn: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="overflow-hidden mb-12 md:mb-24">
      <motion.h2
        ref={ref}
        initial={{ y: "110%" }}
        animate={{ 
          y: isInView ? 0 : "110%",
          opacity: isLampOn ? 1 : 0.1,
          filter: isLampOn ? "blur(0px)" : "blur(4px)"
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
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
  isLampOn,
}: {
  item: (typeof educationItems)[0];
  index: number;
  isLampOn: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      animate={{
        opacity: isLampOn ? 1 : 0.05,
        filter: isLampOn ? "blur(0px)" : "blur(8px)",
        scale: isLampOn ? 1 : 0.98,
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="edu-row group relative flex flex-col md:flex-row justify-between py-10 md:py-12 border-t border-foreground/10 overflow-hidden select-none"
    >
      {/* Left: year + institution */}
      <div className="edu-left relative z-10 flex flex-col md:w-1/3 mb-6 md:mb-0">
        <span className="text-xs md:text-sm uppercase tracking-widest text-foreground/50 mb-2">
          {item.year}
        </span>
        <span className="text-base md:text-xl font-bold uppercase tracking-wide">
          {item.institution}
        </span>
      </div>

      {/* Right: title + desc + tags */}
      <div className="relative z-10 flex flex-col md:w-2/3">
        <h3 className="edu-title text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-3 md:mb-4 leading-tight">
          {item.title}
        </h3>
        <p className="edu-desc text-sm md:text-base text-foreground/70 max-w-xl mb-5 md:mb-6 leading-relaxed">
          {item.desc}
        </p>
        {/* Tag pills */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          {item.tags.map((tag, j) => (
            <span
              key={j}
              className="edu-tag text-xs uppercase tracking-widest px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-foreground/20 text-foreground/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Minimal decorative element - just an arrow that appears when lamp is on */}
      <motion.div 
        animate={{ opacity: isLampOn ? 0.3 : 0 }}
        className="edu-arrow absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 text-foreground"
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <path
            d="M6 16h20M18 8l8 8-8 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function Lamp({ isOn, setIsOn }: { isOn: boolean; setIsOn: (v: boolean) => void }) {
  const lampRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lampRef, { margin: "-10% 0px -70% 0px" });

  useEffect(() => {
    if (isInView) {
      setIsOn(true);
      // Auto-turn off after 3 seconds to encourage interaction
      const timer = setTimeout(() => setIsOn(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isInView, setIsOn]);

  return (
    <div
      ref={lampRef}
      onMouseEnter={() => setIsOn(true)}
      onMouseLeave={() => setIsOn(false)}
      className="relative flex flex-col items-center group cursor-pointer mb-24 z-50"
    >
      {/* Wire */}
      <div className="w-px h-32 md:h-48 bg-foreground/20 group-hover:bg-foreground/50 transition-colors duration-500" />
      
      {/* Lamp Head */}
      <motion.div
        animate={{
          y: isOn ? [0, -2, 0] : 0,
          rotate: isOn ? [0, 1, -1, 0] : 0
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="relative"
      >
        <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="text-foreground transition-colors duration-500">
          <path 
            d="M10 35 L50 35 L58 38 L2 38 Z" 
            fill="currentColor" 
            fillOpacity={isOn ? 1 : 0.2}
          />
          <path 
            d="M15 35 L45 35 L52 10 L8 10 Z" 
            fill="currentColor" 
            fillOpacity={isOn ? 0.8 : 0.1}
          />
          <path d="M25 10 L35 10 L32 2 L28 2 Z" fill="currentColor" fillOpacity={isOn ? 0.5 : 0.1} />
        </svg>
        
        {/* The Bulb Glow */}
        <AnimatePresence>
          {isOn && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-[30px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-yellow-400 blur-sm z-10"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Light Beam / Cone */}
      <AnimatePresence>
        {isOn && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            style={{ originY: 0 }}
            className="absolute top-[35px] left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[600px] pointer-events-none z-0"
          >
            <div 
              className="w-full h-full"
              style={{
                background: "conic-gradient(from 165deg at 50% 0%, transparent 0%, rgba(255,255,255,0.05) 10%, rgba(255,255,255,0.08) 15%, transparent 30%)",
                filter: "blur(40px)",
              }}
            />
            {/* Soft radial base glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial from-white/5 to-transparent blur-3xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLampOn, setIsLampOn] = useState(false);

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
        <SectionTitle isLampOn={isLampOn} />

        <div className="relative flex flex-col items-center mb-12">
          {/* The Lamp hanging over the line */}
          <div className="absolute -top-32 md:-top-48 left-1/2 -translate-x-1/2 z-50">
            <Lamp isOn={isLampOn} setIsOn={setIsLampOn} />
          </div>

          {/* Top gradient line */}
          <div className="w-full h-px bg-foreground/10 relative overflow-hidden">
            <motion.div
              style={{ scaleX: lineScaleX, originX: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#8a2be2]"
            />
          </div>
        </div>

        <div className="flex flex-col border-b border-foreground/10">
          {educationItems.map((item, i) => (
            <EducationRow key={i} item={item} index={i} isLampOn={isLampOn} />
          ))}
        </div>

        {/* Tap hint for mobile */}
        <p className="md:hidden text-xs text-foreground/30 uppercase tracking-widest mt-4 text-center">
          Tap the lamp or a row to interact
        </p>
      </div>
    </section>
  );
}
