"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.nav 
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-6 left-1/2 z-50 flex items-center justify-between px-8 py-4 w-[90%] md:w-auto md:min-w-[600px] rounded-full bg-background/20 backdrop-blur-xl border border-foreground/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] transition-all duration-500 hover:bg-background/40 hover:border-foreground/20"
    >
      <div className="font-bold text-xl tracking-tighter cursor-pointer text-foreground">
        PORTFOLIO©
      </div>
      
      <div className="flex gap-8 items-center">
        <MagneticButton>
          <button className="hover-target uppercase text-xs tracking-widest font-medium relative group text-foreground">
            Index
            <span className="absolute left-0 right-0 -bottom-1 h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
        </MagneticButton>
        <MagneticButton>
          <button className="hover-target uppercase text-xs tracking-widest font-medium relative group text-foreground">
            Work
            <span className="absolute left-0 right-0 -bottom-1 h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
        </MagneticButton>
        <MagneticButton>
          <button className="hover-target uppercase text-xs tracking-widest font-medium relative group text-foreground">
            Contact
            <span className="absolute left-0 right-0 -bottom-1 h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
        </MagneticButton>
        
        <MagneticButton>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hover-target w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center backdrop-blur-md overflow-hidden relative group text-foreground"
          >
            <div className="absolute inset-0 bg-foreground translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div
                  key="moon"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 group-hover:text-background"
                >
                  <Moon className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 group-hover:text-background"
                >
                  <Sun className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </MagneticButton>
      </div>
    </motion.nav>
  );
}
