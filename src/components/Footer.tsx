"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import TextScramble from "./TextScramble";
import MagneticButton from "./MagneticButton";

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-end sm:items-start gap-1">
      <span className="text-[10px] text-background/40 uppercase tracking-[0.2em]">Local Time</span>
      <span className="font-mono text-sm md:text-base tabular-nums">{time} IST</span>
    </div>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  
  // Mouse tracking for spotlight and 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = footerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  // 3D Tilt transforms for the main CTA
  const rotateX = useTransform(springY, [0, 1000], [15, -15]);
  const rotateY = useTransform(springX, [0, 2000], [-15, 15]);

  // Subtle background glow that follows the mouse
  const spotlightBg = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(circle 600px at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 80%)`
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };


  return (
    <footer
      ref={footerRef}
      id="contact"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[80vh] pt-24 md:pt-40 pb-12 flex flex-col items-center justify-between bg-foreground text-background overflow-hidden z-10 border-t border-background/5"
    >
      {/* Animated Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />


      {/* Mouse Spotlight (Re-integrated but more subtle) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: spotlightBg }}
      />

      {/* Background large text decorative - Now reactive to hover */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden">
        <motion.span 
          initial={{ opacity: 0.02, scale: 0.95 }}
          whileInView={{ opacity: 0.03, scale: 1 }}
          whileHover={{ opacity: 0.05, scale: 1.05 }}
          transition={{ duration: 1.5 }}
          className="text-[40vw] font-bold leading-none tracking-tighter transition-all duration-1000 inline-block pointer-events-auto cursor-default"
        >
          SREESHANTH
        </motion.span>
      </div>

      {/* Content wrapper with staggered entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex-1 flex flex-col items-center justify-center relative z-10 w-full px-5"
      >
        <motion.div variants={itemVariants} style={{ rotateX, rotateY, perspective: 1000 }} className="relative group">
          <TextScramble
            text="LET'S TALK"
            className="text-[15vw] md:text-[13vw] font-extrabold tracking-tighter leading-none uppercase text-center cursor-pointer transition-all duration-700 hover:text-primary"
          />
          {/* Underline effect */}
          <motion.div className="absolute -bottom-2 left-0 w-0 h-1 bg-foreground group-hover:w-full transition-all duration-700" />
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-8 md:mt-12">
          <motion.a
            href="mailto:sreeshanthreddy2529@gmail.com"
            whileHover={{ scale: 1.05, y: -5 }}
            className="px-8 py-4 md:px-12 md:py-6 rounded-2xl border border-background/10 bg-background/5 backdrop-blur-md text-lg md:text-2xl lg:text-3xl font-light tracking-tight hover:bg-background/10 hover:border-background/30 transition-all duration-500 break-all text-center flex items-center justify-center gap-4 group"
          >
            <span>sreeshanthreddy2529@gmail.com</span>
            <div className="w-8 h-8 rounded-full bg-background text-foreground flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-transform duration-500">
              →
            </div>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom Bar with individual item animations */}
      <motion.div 
        variants={itemVariants}
        className="w-full flex flex-col sm:flex-row justify-between items-end sm:items-center px-5 md:px-12 mt-24 text-[10px] md:text-xs uppercase tracking-[0.25em] font-semibold border-t border-background/10 pt-10 z-10 gap-8 sm:gap-0"
      >
        <div className="flex flex-col gap-2">
          <p className="opacity-40">© {new Date().getFullYear()} All Rights Reserved</p>
          <p className="font-bold">Sreeshanth Reddy</p>
        </div>

        <div className="flex items-center gap-12 md:gap-20">
          {/* Socials */}
          <div className="flex gap-6 md:gap-10">
            {["GitHub", "LinkedIn", "Twitter"].map((social) => (
              <MagneticButton key={social}>
                <a
                  href={`https://${social.toLowerCase()}.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="relative group block"
                >
                  <span className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">{social}</span>
                  <span className="absolute left-0 right-0 -bottom-1 h-px bg-background scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </a>
              </MagneticButton>
            ))}
          </div>

          <LocalTime />
        </div>
      </motion.div>
    </footer>
  );
}
