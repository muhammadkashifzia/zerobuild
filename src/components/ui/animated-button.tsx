"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedButtonProps {
  defaultText: string;
  hoverText: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  defaultText,
  hoverText,
  onClick,
  className = "",
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden px-4 py-2 text-[16px] font-bold rounded-xl transition-all duration-300 min-h-[40px] ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.span
              key="default"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ 
                duration: 0.1,
                ease: [0.65, 0.46, 0.45, 0.94]
              }}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
            >
              {defaultText}
            </motion.span>
          ) : (
            <motion.span
              key="hover"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ 
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
            >
              {hoverText}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}; 