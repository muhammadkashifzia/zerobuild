"use client";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
export default function CTAButtons() {
     const words = [
   
    {
      text: "Deploying",
    },
    
  ];
  return (
    <div className="my-[40px] flex items-center gap-2 md:gap-10 p-4 md:p-8 container mx-auto w-full bg-white rounded-lg shadow-md justify-between md:flex-row flex-col">
      {/* Main CTA Button */}
      <Link href="/resources" className="relative flex items-center justify-between px-6 md:px-8 py-2 md:py-4 rounded-full border border-black   group overflow-hidden min-w-full md:min-w-[500px]">
       
    
     <span className="flex items-center">  <span className="text-[20px] md:text-[48px] font-bold text-black mr-[7px]">Start</span> <TypewriterEffect words={words} /></span>
   
        <span className="relative z-10 w-5 h-5 md:w-14 md:h-14 flex items-center justify-center rounded-full  text-white bg-[#484AB7]">
          <ArrowRight className="w-3 h-3 md:w-8 md:h-8" />
        </span>
      </Link>

      {/* Side Buttons */}
      <div className="flex flex-col gap-2 md:gap-4 w-full md:w-auto">
        <a href="mailto:team@zerobuild.io" className="flex items-center justify-between px-6 py-3 rounded-full bg-[#484AB7] text-white text-sm font-medium w-full md:w-56 border border-[#484AB7]">
          Talk to an Expert
          <span className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-white text-[#484AB7]">
            <ArrowRight className="w-3 h-3" />
          </span>
        </a>

        <Link href="/services" className="flex items-center justify-between px-6 py-3 rounded-full border border-black text-black text-sm font-medium w-full md:w-56">
          Get an Enterprise Trial
          <span className="ml-2 border border-black w-5 h-5 flex items-center justify-center rounded-full bg-white text-black">
            <ArrowRight className="w-3 h-3" />
          </span>
        </Link>
      </div>
    </div>
  );
}