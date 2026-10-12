"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HiOutlineBriefcase } from "react-icons/hi2";
import FloatingIcon from "./FloatingIcon";

const experiences = [
  {
    company: "Mingalar Mon Group Co., Ltd.",
    role: "Full-Stack Developer",
    period: "Jul 2026 — Present",
    description:
      "Currently building and maintaining full-stack applications, working on scalable backend services and responsive frontend interfaces.",
    current: true,
  },
  {
    company: "Kwin Technology",
    role: "Full-Stack Developer",
    period: "Dec 2025 — Jul 2026",
    description:
      "Developed and deployed web applications using React, Node.js, and related technologies. Collaborated with cross-functional teams to deliver features end-to-end.",
    current: false,
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-6 relative" ref={ref}>
      <FloatingIcon position="right" className="text-9xl md:text-[10rem]">
        <HiOutlineBriefcase className="text-accent drop-shadow-[0_0_15px_rgba(0,230,118,0.6)]" />
      </FloatingIcon>
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Work <span className="gradient-text">Experience</span>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-card-border" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-4 mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent -translate-x-1.5 mt-6 ring-4 ring-background">
                {exp.current && (
                  <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
                )}
              </div>

              <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""} pl-10 md:pl-0`} />

              <div className="flex-1 pl-10 md:pl-0">
                <div className="glass rounded-xl p-6 hover:border-accent/30 transition-colors">
                  {exp.current && (
                    <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent-light mb-2">
                      Current
                    </span>
                  )}
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <p className="text-accent-light text-sm font-mono mt-1">
                    {exp.company}
                  </p>
                  <p className="text-xs text-muted mt-1">{exp.period}</p>
                  <p className="text-muted text-sm mt-3 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
