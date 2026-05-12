"use client";

import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

const COLORS = ["#00f0ff", "#8a2be2", "#ff007f", "#00f0ff", "#8a2be2"];
const COLORS2 = ["#ff007f", "#8a2be2", "#00f0ff", "#ff007f", "#8a2be2"];

/* ─── Interactive letter ─── */
function InteractiveLetter({
  char,
  colorSet,
}: {
  char: string;
  colorSet: string[];
}) {
  const controls = useAnimation();

  const handleStart = () => {
    controls.start({
      scale: 1.15,
      y: -10,
      color: colorSet,
      transition: {
        scale: { duration: 0.2 },
        y: { duration: 0.2 },
        color: { duration: 1.2, repeat: Infinity, ease: "linear" },
      },
    });
  };

  const handleEnd = () => {
    controls.start({
      scale: 1,
      y: 0,
      color: "#ffffff",
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    });
  };

  if (char === " ") return <span className="inline-block">&nbsp;</span>;

  return (
    <motion.span
      animate={controls}
      onMouseEnter={handleStart}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => { e.preventDefault(); handleStart(); }}
      onTouchEnd={handleEnd}
      className="inline-block cursor-default select-none touch-manipulation"
    >
      {char}
    </motion.span>
  );
}

/* ─── Smooth scroll ─── */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── Hero ─── */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-transparent"
    >
      {/* ── Main content ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.3 },
          },
        }}
        className="z-10 w-full px-4 md:px-12 flex flex-col justify-center items-center"
      >
        {/* ── Name line 1 ── */}
        <div className="overflow-hidden">
          <motion.h1
            variants={{
              hidden: { y: "110%" },
              visible: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="
              text-[15vw] sm:text-[12vw] md:text-[9vw]
              font-extrabold tracking-tighter leading-[0.88]
              uppercase text-center flex flex-wrap justify-center
              mix-blend-difference text-white
            "
          >
            {"Sreeshanth".split("").map((char, i) => (
              <InteractiveLetter key={i} char={char} colorSet={COLORS} />
            ))}
          </motion.h1>
        </div>

        {/* ── Name line 2 ── */}
        <div className="overflow-hidden">
          <motion.h1
            variants={{
              hidden: { y: "110%" },
              visible: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="
              text-[15vw] sm:text-[12vw] md:text-[9vw]
              font-extrabold tracking-tighter leading-[0.88]
              uppercase text-center flex flex-wrap justify-center italic
              mix-blend-difference text-white
            "
          >
            {"Reddy".split("").map((char, i) => (
              <InteractiveLetter key={i} char={char} colorSet={COLORS2} />
            ))}
          </motion.h1>
        </div>

        {/* ── Subtitle ── */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 } },
          }}
          className="mt-6 md:mt-8 max-w-lg px-4"
        >
          <p className="text-sm sm:text-base md:text-lg text-center text-foreground/70 font-medium leading-relaxed">
            Frontend Developer&nbsp;•&nbsp;AI Enthusiast&nbsp;•&nbsp;Creative Builder
            <span className="hidden sm:inline">
              . Crafting modern websites and intelligent experiences with clean
              design and scalable technology.
            </span>
          </p>
        </motion.div>

        {/* ── CTA button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-12"
        >
          <MagneticButton>
            <button
              onClick={() => scrollTo("about")}
              className="
                group relative inline-flex items-center gap-2
                px-8 py-3.5 md:px-10 md:py-4
                rounded-full font-semibold text-sm uppercase tracking-widest
                bg-foreground text-background
                overflow-hidden
                active:scale-95 transition-transform duration-150
              "
            >
              {/* Hover fill */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#8a2be2] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="relative z-10">Explore</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        onClick={() => scrollTo("about")}
        className="
          absolute bottom-8 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-2
          text-foreground/40 hover:text-foreground/80
          transition-colors duration-300 cursor-pointer
        "
      >
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-px h-10 md:h-14 bg-foreground/20 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00f0ff] to-[#8a2be2]"
            animate={{ height: ["0%", "100%"], top: ["0%", "0%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatType: "reverse" }}
          />
        </div>
      </motion.button>
    </section>
  );
}
