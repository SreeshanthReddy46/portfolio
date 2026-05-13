"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "0123456789!@#$%^&*";

export default function TextScramble({ 
  text, 
  className,
  triggerOnHover = false 
}: { 
  text: string, 
  className?: string,
  triggerOnHover?: boolean
}) {
  const [displayText, setDisplayText] = useState(text.replace(/[a-zA-Z]/g, "0"));
  const [isScrambling, setIsScrambling] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);
  
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            if (letter === " " || letter === "'") return letter;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      iteration += 1 / 4;
    }, 40);
  };

  useEffect(() => {
    if (isInView && !triggerOnHover) {
      scramble();
    }
  }, [isInView, text, triggerOnHover]);

  return (
    <motion.span 
      ref={ref}
      className={className}
      onMouseEnter={() => {
        if (triggerOnHover) scramble();
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {displayText}
    </motion.span>
  );
}
