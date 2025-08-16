"use client";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
export default function CTAButtons() {
     const words = [
   
    {
      text: "Expert",
    },
    
  ];
  return (
    <div className=" p-4 md:p-8 container w-full ">
     <div className="mb-[24px] max-w-[740px]">
     <h2 className="text-black text-[24px] font-semibold mb-[10px]">
      Looking to accelerate your project?
      </h2>
      <p className="text-black text-[16px] mb-[10px]">Whether you need expert support across the built environment, want to use our digital tools and 
      datasets, or develop custom solutions tailored to your organisation, we are ready to help.</p>
      <h3 className="text-black text-[18px] font-semibold mb-[10px]">Book a call with our team to get started</h3>
     </div>
      {/* Main CTA Button */}
      <a href="https://outlook.office.com/book/ZeroBuildDiscoveryCall@zerobuild.io/s/0j-Jsl27BUuEcZ2ortBjhA2?ismsaljsauthenabled" target="_blank" className="relative flex items-center justify-between px-6 md:px-6 py-1 md:py-2 rounded-full border border-black group overflow-hidden max-w-[400px]">
       
    
     <span className="flex items-center">  <span className="text-[20px] md:text-[32px] font-bold text-black mr-[7px]">Talk to an</span> <TypewriterEffect words={words} /></span>
   
        <span className="relative z-10 w-3 h-3 md:w-14 md:h-14 flex items-center justify-center rounded-full  text-white bg-[#484AB7]">
          <ArrowRight className="w-3 h-3 md:w-8 md:h-8" />
        </span>
      </a>

      {/* Side Buttons */}
      {/* <div className="flex flex-col gap-2 md:gap-4 w-full md:w-auto">
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
      </div> */}
    </div>
  );
}