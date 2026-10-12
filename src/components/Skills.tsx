"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiRedux,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiFlask,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiGithub,
  SiDigitalocean,
  SiPython,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiTensorflow,
  SiPytorch,
  SiLangchain,
} from "react-icons/si";
import {
  HiOutlineCube,
  HiOutlineCpuChip,
  HiOutlineServerStack,
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineWrenchScrewdriver,
  HiOutlineCog6Tooth,
  HiOutlineCircleStack,
  HiOutlineRocketLaunch,
  HiOutlineCloud,
  HiOutlineSparkles,
  HiOutlineLink,
} from "react-icons/hi2";
import FloatingIcon from "./FloatingIcon";

interface SkillItem {
  name: string;
  icon: IconType;
  color?: string;
}

interface SkillCategory {
  title: string;
  icon: IconType;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: HiOutlineCube,
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "TanStack Query", icon: HiOutlineServerStack },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "Zustand", icon: HiOutlineBolt },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    title: "Backend",
    icon: HiOutlineServerStack,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress },
      { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { name: "Flask", icon: SiFlask },
      { name: "REST APIs", icon: HiOutlineLink },
    ],
  },
  {
    title: "Database",
    icon: HiOutlineCircleStack,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Chroma", icon: HiOutlineCircleStack },
    ],
  },
  {
    title: "Machine Learning",
    icon: HiOutlineCpuChip,
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "Pandas", icon: SiPandas, color: "#150458" },
      { name: "NumPy", icon: SiNumpy, color: "#4DABCF" },
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
    ],
  },
  {
    title: "AI & Agentic",
    icon: HiOutlineChatBubbleLeftRight,
    skills: [
      { name: "RAG", icon: HiOutlineChatBubbleLeftRight },
      { name: "Tool Calling", icon: HiOutlineWrenchScrewdriver },
      { name: "MCP", icon: HiOutlineCog6Tooth },
      { name: "LLM", icon: HiOutlineSparkles },
      { name: "LangChain", icon: SiLangchain, color: "#1C3C3C" },
      { name: "Agentic AI", icon: HiOutlineRocketLaunch },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: HiOutlineRocketLaunch,
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
      { name: "CI/CD", icon: HiOutlineBolt },
      { name: "AWS", icon: HiOutlineCloud },
      { name: "DigitalOcean", icon: SiDigitalocean, color: "#0080FF" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-6 relative" ref={ref}>
      <FloatingIcon position="left" className="text-9xl md:text-[10rem]">
        <HiOutlineCog6Tooth className="text-accent drop-shadow-[0_0_15px_rgba(0,230,118,0.6)]" />
      </FloatingIcon>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Tech <span className="gradient-text">Stack</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="glass rounded-2xl p-6 hover:border-accent/30 transition-colors group"
            >
              <category.icon className="w-8 h-8 text-accent-light mb-3" />
              <h3 className="text-lg font-semibold mb-4 group-hover:text-accent-light transition-colors">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-accent/5 text-muted border border-card-border hover:border-accent/30 hover:text-foreground transition-colors"
                  >
                    <skill.icon
                      className="w-3.5 h-3.5 shrink-0"
                      style={skill.color ? { color: skill.color } : undefined}
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
