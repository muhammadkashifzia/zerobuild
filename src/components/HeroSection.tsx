"use client";
import Link from "next/link";
import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { Button } from "./ui/moving-border";
import { motion } from "framer-motion";
import { ContainerTextFlip } from "./ui/container-text-flip";
import { cn } from "@/utils/cn";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const HeroSection = () => {
  const words = ["faster", "smarter", "simpler", "beter"];
  return (
    <BackgroundBeamsWithCollision>
    <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 relative z-10 w-full text-center">
        <motion.h1
       
          className={cn(
            "relative mb-6 max-w-[65rem] text-center text-4xl leading-normal font-bold tracking-tight text-zinc-700 md:text-7xl  mx-auto"
          )}
          layout
        >
          <div className="inline-block">
            Building decarbonisation is complex
            <ContainerTextFlip words={words} className="ml-3"/>.
            {/* <Blips /> */}
          </div>
        </motion.h1>
        <p className="mt-4 font-normal text-base md:text-lg text-black max-w-2xl mx-auto">
          Take the guesswork out of Net Zero. We give you the clarity and tools
          to design high-performing, low-carbon buildings with confidence.
        </p>
        <div className="mt-6 flex w-full gap-[10px] justify-center">
          <Link
            href={"/"}
            className="w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-5 rounded-2xl max-w-[256px] h-[56px] flex items-center justify-center text-lg font-semibold hover:bg-[#3c3f9d] transition-colors duration-200"
          >
            Get a Demo
          </Link>
          <Link
            href={"/"}
            className="flex h-14 w-full items-center justify-center rounded-2xl border border-transparent bg-white text-sm text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 hover:shadow-lg max-w-[256px] "
          >
            Learn How
          </Link>
        </div>
      </div>
    </div>
    </BackgroundBeamsWithCollision>
  );
};

export default HeroSection;
