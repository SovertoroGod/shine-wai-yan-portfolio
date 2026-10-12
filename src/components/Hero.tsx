"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3D />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-accent-light text-sm font-mono tracking-widest uppercase mb-4">
            Hello, I&apos;m
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          <span className="gradient-text">Shine Wai Yan</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-foreground/80 mb-4"
        >
          Full-Stack Developer &amp; AI Enthusiast
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-foreground/60 text-base md:text-lg max-w-xl mx-auto mb-10"
        >
          Building intelligent, scalable applications — from sleek React
          frontends to robust Node.js backends, powered by a curiosity for AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-light transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full border border-card-border text-foreground hover:border-accent/50 transition-colors"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border-2 border-muted flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-accent-light"
          />
        </div>
      </motion.div>
    </section>
  );
}
