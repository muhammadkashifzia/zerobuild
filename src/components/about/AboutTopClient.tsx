"use client";
import { motion } from "motion/react";

interface AboutTopClientProps {
  title?: string;
  description?: string;
}

export default function AboutTopClient({ title, description }: AboutTopClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="container mx-auto relative flex flex-col gap-4 px-4"
    >
      <div className="text-3xl md:text-6xl font-normal text-black leading-[1.2] max-w-[1000px]">
        {title}
      </div>
      <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4 max-w-[1024px]">
        {description}
      </div>
    </motion.div>
  );
}
