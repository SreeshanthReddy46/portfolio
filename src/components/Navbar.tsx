"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Work", href: "work" },
  { label: "Contact", href: "contact" },
];

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside scroll
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100, x: "-50%" }}
        animate={{ y: 0, x: "-50%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
        className={`fixed top-6 left-1/2 z-50 flex items-center justify-between px-5 md:px-8 py-3 md:py-4 w-[92%] md:w-auto md:min-w-[580px] rounded-full border shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] transition-all duration-500 ${
          scrolled
            ? "bg-background/60 backdrop-blur-2xl border-foreground/20"
            : "bg-background/20 backdrop-blur-xl border-foreground/10"
        }`}
      >
        {/* Logo */}
        <MagneticButton>
          <button
            onClick={() => smoothScrollTo("home")}
            className="font-bold text-base md:text-xl tracking-tighter cursor-pointer text-foreground p-2"
          >
            PORTFOLIO©
          </button>
        </MagneticButton>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <MagneticButton key={link.label}>
              <button
                onClick={() => smoothScrollTo(link.href)}
                className="hover-target uppercase text-xs tracking-widest font-medium relative group text-foreground"
              >
                {link.label}
                <span className="absolute left-0 right-0 -bottom-1 h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            </MagneticButton>
          ))}

          {/* Theme Toggle */}
          <MagneticButton>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover-target w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center backdrop-blur-md overflow-hidden relative group text-foreground"
            >
              <div className="absolute inset-0 bg-foreground translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
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

        {/* Mobile: theme + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center text-foreground active:scale-90 transition-transform"
          >
            {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center text-foreground active:scale-90 transition-transform"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-2 md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="text-5xl font-bold tracking-tighter uppercase text-foreground py-3 active:scale-95 transition-transform"
                onClick={() => {
                  smoothScrollTo(link.href);
                  setMenuOpen(false);
                }}
              >
                {link.label}
              </motion.button>
            ))}

            {/* Social links in mobile menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 flex gap-8 text-sm uppercase tracking-widest text-foreground/40"
            >
              <a
                href="https://github.com/SreeshanthReddy46"
                target="_blank"
                rel="noreferrer"
                className="active:text-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="active:text-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                LinkedIn
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
