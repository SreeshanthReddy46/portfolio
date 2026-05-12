"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const formFieldVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.2 + i * 0.12,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const socialLinks = [
  { label: "Email", href: "mailto:sreeshanthreddy2529@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sreeshanth-reddy-444302341" },
  { label: "GitHub", href: "https://github.com/SreeshanthReddy46" },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Animated pulsing orb */}
      <motion.div
        style={{ scale: orbScale, opacity: orbOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[800px] h-[800px] bg-gradient-to-tr from-[#00f0ff]/10 to-[#8a2be2]/10 rounded-full blur-[100px]"
        />
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"
            >
              Let's Create<br />
              Something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#8a2be2]">
                Epic
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-400"
          >
            Available for exciting opportunities.
          </motion.p>

          {/* Social links with stagger */}
          <div className="mt-10 flex justify-center gap-8 relative z-50 pointer-events-auto">
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                className="relative text-gray-400 hover:text-[#00f0ff] transition-colors uppercase tracking-widest text-sm font-bold group"
              >
                {link.label}
                <span className="absolute left-0 right-0 -bottom-1 h-px bg-gradient-to-r from-[#00f0ff] to-[#8a2be2] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Form with staggered field reveal */}
        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div custom={0} variants={formFieldVariants} className="group relative">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#00f0ff] transition-all duration-300 peer hover:border-white/20"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#8a2be2] opacity-0 peer-focus:opacity-20 blur-md transition-opacity pointer-events-none" />
            </motion.div>
            <motion.div custom={1} variants={formFieldVariants} className="group relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#8a2be2] transition-all duration-300 peer hover:border-white/20"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8a2be2] to-[#00f0ff] opacity-0 peer-focus:opacity-20 blur-md transition-opacity pointer-events-none" />
            </motion.div>
          </div>

          <motion.div custom={2} variants={formFieldVariants} className="group relative">
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#00f0ff] transition-all duration-300 peer resize-none hover:border-white/20"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#8a2be2] opacity-0 peer-focus:opacity-20 blur-md transition-opacity pointer-events-none" />
          </motion.div>

          <motion.div custom={3} variants={formFieldVariants}>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hover-target w-full py-5 rounded-xl bg-white text-black font-bold text-lg border border-transparent transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Send Transmission
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#8a2be2] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
