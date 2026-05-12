"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

const educationItems = [
  { 
    year: "PRESENT", 
    title: "B.Tech in Computer Science Engineering (4th Sem)", 
    institution: "Sree Dattha Group of Institutions",
    desc: "Currently pursuing degree. Current CGPA: 8.07.",
    tags: ["Computer Science", "Engineering", "CGPA 8.07"]
  }
];

function SectionTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="overflow-hidden mb-24">
      <motion.h2
        ref={ref}
        initial={{ y: "110%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-6xl font-bold tracking-tighter uppercase"
      >
        Academic <br />{" "}
        <span className="text-foreground/50 italic font-normal">& Honors</span>
      </motion.h2>
    </div>
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
    <section ref={containerRef} className="py-48 w-full bg-background text-foreground relative z-10 border-t border-foreground/5 overflow-hidden">
      {/* Subtle parallax background accent */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#00f0ff]/5 to-[#8a2be2]/5 blur-[120px] -translate-y-1/2 translate-x-1/4" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <SectionTitle />

        {/* Scroll-driven top line reveal */}
        <div className="h-px bg-foreground/10 relative overflow-hidden mb-0">
          <motion.div
            style={{ scaleX: lineScaleX, originX: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#8a2be2]"
          />
        </div>

        <div className="flex flex-col border-b border-foreground/10">
          {educationItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col md:flex-row justify-between py-12 border-t border-foreground/10 cursor-pointer overflow-hidden"
            >
              {/* Hover fill sweep */}
              <div className="absolute inset-0 bg-foreground translate-y-[101%] group-hover:translate-y-0 transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />

              {/* Left: year + institution */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col md:w-1/3 mb-6 md:mb-0 px-4 md:px-8"
              >
                <span className="text-sm uppercase tracking-widest text-foreground/50 group-hover:text-background/80 transition-colors duration-300 mb-2">
                  {item.year}
                </span>
                <span className="text-xl font-bold uppercase tracking-wide group-hover:text-background transition-colors duration-300">
                  {item.institution}
                </span>
              </motion.div>

              {/* Right: title + desc + tags */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col md:w-2/3 px-4 md:px-8"
              >
                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 group-hover:text-background transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-foreground/70 group-hover:text-background/90 transition-colors duration-300 max-w-xl mb-6">
                  {item.desc}
                </p>
                {/* Tag pills */}
                <div className="flex flex-wrap gap-3">
                  {item.tags.map((tag, j) => (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + j * 0.1 }}
                      className="text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-foreground/20 text-foreground/60 group-hover:border-background/30 group-hover:text-background/70 transition-colors duration-300"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Animated arrow on hover */}
              <motion.div
                className="absolute right-8 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-background"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M6 16h20M18 8l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
