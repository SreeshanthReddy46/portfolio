"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "0123456789!@#$%^&*";

export default function TextScramble({ text, className }: { text: string, className?: string }) {
  const [displayText, setDisplayText] = useState(text.replace(/[a-zA-Z]/g, "0"));
  const ref = useRef<HTMLHeadingElement>(null);
  
  // amount: 0.5 means it triggers when 50% of the element is in view
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    
    let iteration = 0;
    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            if (letter === " " || letter === "'") return letter;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 4; // Slower speed of scramble for dramatic effect
    }, 50);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <motion.h2 
      ref={ref}
      className={className}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {displayText}
    </motion.h2>
  );
}
