"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  
  // Use framer motion values for physics-based smoothing
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const velocityX = useRef(0);
  const velocityY = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);
  
  // Track velocity to stretch cursor
  const [stretchScaleX, setStretchScaleX] = useState(1);
  const [stretchScaleY, setStretchScaleY] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Calculate velocity for stretching effect
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;
      
      velocityX.current = dx;
      velocityY.current = dy;
      
      const speed = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      // Apply stretching based on speed (clamped)
      const maxSpeed = 50;
      const normalizedSpeed = Math.min(speed / maxSpeed, 1);
      
      setStretchScaleX(1 + normalizedSpeed * 0.5);
      setStretchScaleY(1 - normalizedSpeed * 0.2);
      setRotation(angle);
      
      lastX.current = e.clientX;
      lastY.current = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Project card hover
      if (target.closest('.project-card')) {
        setIsHovered(true);
        setHoverText("VIEW");
        return;
      }
      
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hover-target")
      ) {
        setIsHovered(true);
        setHoverText("");
      } else {
        setIsHovered(false);
        setHoverText("");
        
        // Reset stretch when not moving quickly
        setStretchScaleX(1);
        setStretchScaleY(1);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    // Reset stretch periodically
    const resetInterval = setInterval(() => {
      setStretchScaleX((prev) => prev + (1 - prev) * 0.1);
      setStretchScaleY((prev) => prev + (1 - prev) * 0.1);
    }, 50);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      clearInterval(resetInterval);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center text-black font-bold text-[8px] tracking-widest overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          rotate: rotation,
          scaleX: isHovered && hoverText ? 4 : (isHovered ? 2 : stretchScaleX),
          scaleY: isHovered && hoverText ? 4 : (isHovered ? 2 : stretchScaleY),
        }}
      >
        {hoverText && (
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            style={{ rotate: -rotation }} // Counter rotate text so it stays upright
            className="transform-gpu"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
      
      {/* Trailing Aura */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-white/20 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />
    </>
  );
}
