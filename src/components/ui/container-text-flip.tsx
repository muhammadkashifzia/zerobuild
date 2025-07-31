"use client";

import React, { useState, useEffect, useId, memo, useMemo, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
}

// Memoized letter component to prevent unnecessary re-renders
const Letter = memo(({ letter, index }: { letter: string; index: number }) => (
  <motion.span
    initial={{
      opacity: 0,
      filter: "blur(10px)",
    }}
    animate={{
      opacity: 1,
      filter: "blur(0px)",
    }}
    transition={{
      delay: index * 0.02,
    }}
  >
    {letter}
  </motion.span>
));

Letter.displayName = "Letter";

export const ContainerTextFlip = memo(({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) => {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = useRef<HTMLDivElement>(null);

  // Memoize current word to prevent unnecessary recalculations
  const currentWord = useMemo(() => words[currentWordIndex], [words, currentWordIndex]);

  // Memoize the width calculation function
  const updateWidthForWord = useCallback(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth + 30;
      setWidth(textWidth);
    }
  }, []);

  // Memoize layout ID to prevent recreation
  const layoutId = useMemo(() => `words-here-${id}`, [id]);
  const wordLayoutId = useMemo(() => `word-div-${currentWord}-${id}`, [currentWord, id]);

  // Memoize animation duration calculations
  const widthTransitionDuration = useMemo(() => animationDuration / 2000, [animationDuration]);
  const textTransitionDuration = useMemo(() => animationDuration / 1000, [animationDuration]);

  // Memoize container classes
  const containerClasses = useMemo(() => cn(
    "relative inline-block rounded-lg pt-2 pb-3 text-center text-4xl font-bold text-black md:text-7xl",
    "[background:linear-gradient(to_bottom,#f3f4f6,#e5e7eb)]",
    "shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,_0_4px_8px_#d1d5db]",
    className,
  ), [className]);

  const textClasses = useMemo(() => cn("inline-block", textClassName), [textClassName]);

  // Memoize text transition object
  const textTransition = useMemo(() => ({
    duration: textTransitionDuration,
    ease: "easeInOut" as const,
  }), [textTransitionDuration]);

  // Memoize width transition object
  const widthTransition = useMemo(() => ({
    duration: widthTransitionDuration
  }), [widthTransitionDuration]);

  useEffect(() => {
    // Update width whenever the word changes
    updateWidthForWord();
  }, [currentWordIndex, updateWidthForWord]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words.length, interval]);

  // Memoize letter components
  const letterComponents = useMemo(() => 
    currentWord.split("").map((letter, index) => (
      <Letter key={`${letter}-${index}`} letter={letter} index={index} />
    )),
    [currentWord]
  );

  return (
    <motion.div
      layout
      layoutId={layoutId}
      animate={{ width }}
      transition={widthTransition}
      className={containerClasses}
      key={currentWord}
    >
      <motion.div
        transition={textTransition}
        className={textClasses}
        ref={textRef}
        layoutId={wordLayoutId}
      >
        <motion.div className="inline-block">
          {letterComponents}
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

ContainerTextFlip.displayName = "ContainerTextFlip";
