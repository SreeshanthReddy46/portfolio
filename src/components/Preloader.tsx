"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.floor(Math.random() * 12) + 2;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoaded(true), 600); // Hold at 100% briefly before sliding
            return 100;
          }
          return next;
        });
      }, 40);
    }
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: isLoaded ? "-100%" : "0%" }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-12 bg-black text-white"
    >
      <div className="flex justify-between w-full text-xs md:text-sm uppercase tracking-widest opacity-50">
        <span>Portfolio © {new Date().getFullYear()}</span>
        <span>Initializing Context...</span>
      </div>
      
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <h1 className="text-[25vw] md:text-[15vw] font-bold tracking-tighter leading-none">
          {progress}
          <span className="text-4xl md:text-6xl inline-block align-top mt-8">%</span>
        </h1>
        <div className="w-full md:w-1/3 h-px bg-white/20 mb-4 md:mb-12 overflow-hidden">
          <motion.div 
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
