"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Hero3DCanvas from "./Hero3DCanvas";
import { ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

const InteractiveLetter = ({ char, colors }: { char: string, colors: string[] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={
        isHovered
          ? { scale: 1.1, y: -10, color: colors }
          : { scale: 1, y: 0, color: "#ffffff" }
      }
      transition={
        isHovered
          ? {
              scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              color: { duration: 1, ease: "linear", repeat: Infinity },
            }
          : {
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }
      }
      className="inline-block"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

export default function Hero() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { y: "100%" },
    visible: { 
      y: 0, 
      transition: { duration: 1 } 
    },
  };

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-background">
      <Hero3DCanvas />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full px-4 md:px-12 flex flex-col justify-center items-center mix-blend-difference text-white pointer-events-none mt-20"
      >
        <div className="overflow-hidden pointer-events-auto flex justify-center">
            <motion.h1 
              variants={textVariants}
              className="text-[12vw] md:text-[10vw] font-bold tracking-tighter leading-[0.85] uppercase text-center cursor-default flex"
            >
              {"Sreeshanth".split("").map((char, index) => (
                <InteractiveLetter 
                  key={index} 
                  char={char} 
                  colors={["#ffffff", "#00f0ff", "#8a2be2", "#ff007f", "#00f0ff"]} 
                />
              ))}
            </motion.h1>
          </div>
          <div className="overflow-hidden pointer-events-auto flex justify-center">
            <motion.h1 
              variants={textVariants}
              className="text-[12vw] md:text-[10vw] font-bold tracking-tighter leading-[0.85] uppercase text-center italic text-white/90 cursor-default flex"
            >
              {"Reddy".split("").map((char, index) => (
                <InteractiveLetter 
                  key={index} 
                  char={char} 
                  colors={["#ffffff", "#ff007f", "#8a2be2", "#00f0ff", "#ff007f"]} 
                />
              ))}
            </motion.h1>
          </div>
        

        <div className="overflow-hidden mt-8 max-w-2xl pointer-events-auto">
          <motion.p 
            variants={textVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-center font-medium cursor-default"
          >
            Frontend Developer • AI Enthusiast • Creative Builder. Crafting modern websites and intelligent experiences with clean design, immersive animations, and scalable technology.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 pointer-events-auto"
        >
          <MagneticButton>
            <button className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-black transition-all duration-300 bg-white rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300 mr-2 uppercase tracking-widest text-sm">Explore</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:text-white transition-colors duration-300 group-hover:translate-x-1" />
            </button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mix-blend-difference text-white"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div 
          animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-16 bg-white/50 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white" />
        </motion.div>
      </motion.div>
    </section>
  );
}
