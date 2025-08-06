"use client";
import Link from "next/link";
import React, { memo, useMemo, useCallback, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { Hero } from "@/types/hero";

// Lazy load heavy components
const Spotlight = lazy(() => import("./ui/Spotlight").then(mod => ({ default: mod.Spotlight })));
const Button = lazy(() => import("./ui/moving-border").then(mod => ({ default: mod.Button })));
const ContainerTextFlip = lazy(() => import("./ui/container-text-flip").then(mod => ({ default: mod.ContainerTextFlip })));
const HeroSkeleton = lazy(() => import("./shimmer/HeroSkeleton").then(mod => ({ default: mod.default })));

// Memoized button component to prevent re-renders
const MemoizedButton = memo(({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link href={href} className="w-full max-w-[256px]">
    <Button className={className}>
      {children}
    </Button>
  </Link>
));

MemoizedButton.displayName = "MemoizedButton";

// Memoized link component
const MemoizedLink = memo(({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link href={href} className={className}>
    {children}
  </Link>
));

MemoizedLink.displayName = "MemoizedLink";

interface HeroSectionProps {
  heroData?: Hero | null;
}

const HeroSection = memo(({ heroData }: HeroSectionProps) => {
  // Show skeleton while loading
  if (!heroData) {
    return (
      <Suspense fallback={<div className="h-auto md:h-[32rem] w-full bg-gray-100 animate-pulse" />}>
        <HeroSkeleton />
      </Suspense>
    );
  }

  // Memoize expensive calculations
  const spotlightProps = useMemo(() => ({
    className: "-top-40 left-0 md:left-60 md:-top-20",
    fill: "white"
  }), []);

  // Use dynamic words from Sanity or fallback to default
  const words = heroData.titleHighlight || ["faster", "smarter", "simpler", "better"];
  
  const containerTextFlipProps = useMemo(() => ({
    words: words,
    className: "ml-3",
    interval: 3000,
    animationDuration: 700
  }), [words]);

  // Memoize button styles to prevent recreation
  const demoButtonStyle = useMemo(() => 
    "w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-5 rounded-2xl max-w-[256px] h-[56px] flex items-center justify-center text-[16px] font-semibold hover:bg-[#3c3f9d] transition-colors duration-200",
    []
  );

  const accelerateButtonStyle = useMemo(() => 
    "flex h-14 w-full items-center justify-center !rounded-2xl border border-transparent bg-white text-sm text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 hover:shadow-lg max-w-[256px] text-[16px] font-semibold",
    []
  );

  // Memoize motion variants to prevent recreation
  const titleVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }), []);

  const descriptionVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.2, ease: "easeOut" }
  }), []);

  const buttonsVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.4, ease: "easeOut" }
  }), []);

  return (
    <div>
      <div className="h-auto md:h-[32rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0 border-b">
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100" />}>
          <Spotlight {...spotlightProps} />
        </Suspense>
        
        <div className="container px-[16px] relative z-10 w-full text-center mt-[40px] md:mt-0">
          <motion.h1
            className={cn(
              "relative mb-6  text-center text-[28px] leading-normal font-bold tracking-tight text-zinc-700 md:text-6xl mx-auto mt-10"
            )}
            {...titleVariants}
          >
            <div className="inline-block">
              {heroData.title}
              <Suspense fallback={<span className="ml-3 text-[#484AB7] text-[28px] md:text-4xl">better</span>}>
                <ContainerTextFlip {...containerTextFlipProps} />
              </Suspense>.
            </div>
          </motion.h1>
          
          <motion.p 
            className="mt-4 font-normal text-base md:text-lg text-black max-w-2xl mx-auto"
            {...descriptionVariants}
          >
            {heroData.description}
          </motion.p>
          
          <motion.div 
            className="mt-6 flex w-full gap-[10px] justify-center flex-col md:flex-row items-center"
            {...buttonsVariants}
          >
            <MemoizedLink href={heroData.primaryButton.link} className={demoButtonStyle}>
              {heroData.primaryButton.text}
            </MemoizedLink>
            
            <MemoizedButton href={heroData.secondaryButton.link} className={accelerateButtonStyle}>
              {heroData.secondaryButton.text}
            </MemoizedButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
