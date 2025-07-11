"use client";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { ArrowRight } from 'lucide-react';

export default function CTAButtons() {
     const words = [
   
    {
      text: "Deploying",
    },
    
  ];
  return (
    <div className=" flex items-center justify-center gap-10 p-8">
      {/* Main CTA Button */}
      <button className="relative flex items-center justify-between px-8 py-4 rounded-full border border-black text-white bg-black group overflow-hidden min-w-[500px]">
       
    
       <span className="text-[48px] font-bold">Start</span> <TypewriterEffect words={words} />
   
        <span className="ml-4 relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white text-black">
          <ArrowRight className="w-5 h-5" />
        </span>
      </button>

      {/* Side Buttons */}
      <div className="flex flex-col gap-4">
        <button className="flex items-center justify-between px-6 py-3 rounded-full bg-white text-black text-sm font-medium w-56 border border-black">
          Talk to an Expert
          <span className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-black text-white">
            <ArrowRight className="w-3 h-3" />
          </span>
        </button>

        <button className="flex items-center justify-between px-6 py-3 rounded-full border border-black text-black text-sm font-medium w-56">
          Get an Enterprise Trial
          <span className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-white text-black">
            <ArrowRight className="w-3 h-3" />
          </span>
        </button>
      </div>
    </div>
  );
}