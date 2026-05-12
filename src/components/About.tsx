"use client";

import { motion, useScroll, useTransform, MotionValue, useInView, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="text-foreground inline-block">
      {children}
    </motion.span>
  );
};

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.round(latest) + suffix;
          }
        },
      });
      return controls.stop;
    }
  }, [isInView, to, suffix, count]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { value: 2, suffix: "+", label: "Live Projects" },
  { value: 8, suffix: ".07 CGPA", label: "Academic Score" },
  { value: 1, suffix: "", label: "Goal: Excellence" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const { scrollYProgress: statsScroll } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"],
  });

  const statsY = useTransform(statsScroll, [0, 1], [60, -60]);
  const statsOpacity = useTransform(statsScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const paragraph = "I'm a frontend developer and AI enthusiast who enjoys building modern, interactive web experiences. I'm passionate about creating products that feel smooth, visually engaging, and easy to use, especially with animations, immersive UI, and AI-powered features. I love turning ideas into real applications and constantly exploring new technologies to improve the way people interact with digital products. My goal is to build meaningful experiences that combine creativity, performance, and innovation.";
  const words = paragraph.split(" ");

  return (
    <section ref={containerRef} className="w-full min-h-screen py-32 flex flex-col justify-center items-center overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 w-full flex flex-col gap-24">

        {/* Scroll-driven word reveal */}
        <p className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[1.1] flex flex-wrap gap-x-4 gap-y-2">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>

        {/* Animated stats with parallax */}
        <motion.div
          ref={statsRef}
          style={{ y: statsY, opacity: statsOpacity }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-foreground/10 pt-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.04 }}
              className="flex flex-col group cursor-default"
            >
              <span className="text-6xl md:text-8xl font-bold text-foreground transition-colors duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00f0ff] group-hover:to-[#8a2be2]">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </span>
              <motion.span
                className="text-lg text-foreground/50 uppercase tracking-widest mt-2 group-hover:text-foreground/80 transition-colors duration-300"
              >
                {stat.label}
              </motion.span>
              {/* Bottom line reveal on hover */}
              <div className="mt-4 h-px bg-foreground/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#8a2be2]"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
