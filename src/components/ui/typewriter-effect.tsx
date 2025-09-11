"use client";

import { cn } from "@/utils/cn";
import { motion, stagger, useAnimate } from "motion/react";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const [scope, animate] = useAnimate();

  useEffect(() => {
    let isCancelled = false;

    const runAnimation = async () => {
      if (!scope.current) return; // prevent null access

      const spans = scope.current.querySelectorAll("span");

      while (!isCancelled) {
        // Hide all characters first
        await animate(
          spans,
          { opacity: 0 },
          { duration: 0.1, delay: stagger(0.02), ease: "easeOut" }
        );

        // Show characters one by one
        await animate(
          spans,
          { display: "inline-block", opacity: 1 },
          { duration: 0.3, delay: stagger(0.1), ease: "easeInOut" }
        );

        // Pause before looping again
        await new Promise((res) => setTimeout(res, 1500));
      }
    };

    // Run after mount
    requestAnimationFrame(() => {
      runAnimation();
    });

    return () => {
      isCancelled = true;
    };
  }, [scope, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="h-[30px] flex">
        {wordsArray.map((word, idx) => (
          <div
            key={`word-${idx}`}
            className="inline-block text-[20px] md:text-[32px]"
          >
            {word.text.map((char, index) => (
              <motion.span
                initial={{ opacity: 0 }}
                key={`char-${idx}-${index}`}
                className={cn(
                  `dark:text-white text-black opacity-0 hidden`,
                  word.className
                )}
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center h-[24px] md:h-[30px] flex",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn("inline-block", cursorClassName)}
      ></motion.span>
    </div>
  );
};
