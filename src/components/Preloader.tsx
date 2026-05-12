"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.floor(Math.random() * 10) + 2;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoaded(true), 800); // Hold briefly
            return 100;
          }
          return next;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white pointer-events-none"
        >
          {/* Animated Noise Background specific to Preloader */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <svg className="w-full h-full">
              <filter id="noise-preloader">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise-preloader)" />
            </svg>
          </div>

          <motion.div
            exit={{ scale: 0.9, filter: "blur(10px)", opacity: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col items-center gap-8 relative z-10 w-full px-12"
          >
            <div className="w-full flex justify-between text-xs uppercase tracking-widest text-white/50">
              <span>System Initialization</span>
              <span>{progress}%</span>
            </div>
            
            <div className="relative w-full h-[2px] bg-white/10 overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-8xl font-bold tracking-tighter uppercase mt-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40"
            >
              Loading Reality
            </motion.h1>
          </motion.div>

          {/* Intro Cinematic Curtains */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-black z-0"
            initial={{ width: "50%" }}
            exit={{ width: "0%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 bg-black z-0"
            initial={{ width: "50%" }}
            exit={{ width: "0%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
