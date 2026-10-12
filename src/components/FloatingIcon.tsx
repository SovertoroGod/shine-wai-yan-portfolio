"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FloatingIconProps {
  children: ReactNode;
  position: "left" | "right";
  className?: string;
}

export default function FloatingIcon({ children, position, className = "" }: FloatingIconProps) {
  return (
    <motion.div
      className={`absolute top-1/2 -translate-y-1/2 ${position === "left" ? "left-8 md:left-16" : "right-8 md:right-16"} pointer-events-none drop-shadow-[0_0_20px_rgba(0,230,118,0.5)] ${className}`}
      animate={{
        y: ["-50%", "-58%", "-50%"],
        rotate: [0, 8, -5, 0],
        scale: [1, 1.08, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
