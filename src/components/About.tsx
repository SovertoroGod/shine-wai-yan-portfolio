"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SiReact } from "react-icons/si";
import FloatingIcon from "./FloatingIcon";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6 relative" ref={ref}>
      <FloatingIcon position="right" className="text-9xl md:text-[10rem]">
        <SiReact className="text-accent drop-shadow-[0_0_15px_rgba(0,230,118,0.6)]" />
      </FloatingIcon>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          About <span className="gradient-text">Me</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-12 glow"
        >
          <p className="text-lg text-muted leading-relaxed mb-6">
            I&apos;m a Full-Stack Developer with a deep passion for building
            applications that are not only functional but delightful to use. My
            journey spans modern frontend frameworks like{" "}
            <span className="text-foreground font-medium">React</span> and
            state management tools like{" "}
            <span className="text-foreground font-medium">Redux</span> and{" "}
            <span className="text-foreground font-medium">Zustand</span>, all
            the way to backend systems with{" "}
            <span className="text-foreground font-medium">Node.js</span>,{" "}
            <span className="text-foreground font-medium">NestJS</span>, and{" "}
            <span className="text-foreground font-medium">Flask</span>.
          </p>
          <p className="text-lg text-muted leading-relaxed mb-6">
            Beyond traditional web development, I work with{" "}
            <span className="text-foreground font-medium">
              Machine Learning and Deep Learning
            </span>
            , building and training models for real-world problems. I&apos;ve also
            built intelligent chatbots featuring{" "}
            <span className="text-foreground font-medium">RAG</span>,{" "}
            <span className="text-foreground font-medium">Tool Calling</span>,{" "}
            <span className="text-foreground font-medium">MCP</span>, and{" "}
            <span className="text-foreground font-medium">
              vector databases like Chroma
            </span>{" "}
            — bringing context-aware, agentic AI into production applications.
          </p>
          <p className="text-lg text-muted leading-relaxed">
            When I&apos;m not coding, you&apos;ll find me experimenting with new
            technologies, contributing to open-source, or diving into the latest
            in AI research. I believe great software is built at the intersection
            of solid engineering and creative problem-solving.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
