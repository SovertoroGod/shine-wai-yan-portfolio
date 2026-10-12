"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import FloatingIcon from "./FloatingIcon";

const projects = [
  {
    title: "AI Chatbot with RAG & MCP",
    description:
      "An intelligent chatbot built with Retrieval-Augmented Generation, Tool Calling, and MCP protocol. Uses Chroma vector database for semantic search and context-aware responses.",
    tech: ["RAG", "Tool Calling", "MCP", "Chroma", "LLM", "Python"],
    icon: "🤖",
    link: "#",
    repo: "#",
  },
  {
    title: "Machine Learning Project",
    description:
      "A machine learning application featuring data preprocessing, model training, and evaluation. Built end-to-end with Python and deployed for real-world predictions.",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Flask"],
    icon: "📊",
    link: "#",
    repo: "#",
  },
  {
    title: "Deep Learning Project",
    description:
      "A deep learning model built with neural networks for complex pattern recognition. Includes training pipelines, model optimization, and performance evaluation.",
    tech: ["Python", "TensorFlow/PyTorch", "Neural Networks", "GPU Training"],
    icon: "🧠",
    link: "#",
    repo: "#",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 px-6 relative" ref={ref}>
      <FloatingIcon position="left" className="text-9xl md:text-[10rem]">
        <HiOutlineRocketLaunch className="text-accent drop-shadow-[0_0_15px_rgba(0,230,118,0.6)]" />
      </FloatingIcon>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted text-center mb-12 max-w-lg mx-auto"
        >
          A selection of projects I&apos;ve worked on. More coming soon!
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="glass rounded-2xl p-6 flex flex-col hover:border-accent/30 transition-colors group"
            >
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-accent/10 to-purple-500/10 mb-5 flex items-center justify-center">
                <span className="text-4xl opacity-40 group-hover:opacity-70 transition-opacity">
                  {project.icon}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-accent-light transition-colors">
                {project.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full bg-accent/5 text-muted border border-card-border"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={project.link}
                  className="text-sm text-accent-light hover:text-foreground transition-colors"
                >
                  Live Demo →
                </a>
                <a
                  href={project.repo}
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  Source ↗
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
