"use client";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { ArrowRight } from "lucide-react";
export default function CtaSection() {
  const words = [
    {
      text: "Expert",
    },
  ];
  return (
    <div className="my-[20px] md:my-[40px] container mx-auto w-full flex items-center justify-between flex-wrap px-[16px]">
      <div className="max-w-full w-full md:max-w-[740px] md:w-[44%] mb-[15px]">
        <h2 className="text-black text-[24px] font-semibold mb-[10px]">
          Ready to take the next step?
        </h2>
        <p className="text-black text-[16px]">
          Let’s talk about how we can support your Net Zero ambitions — whether
          you need strategic
        </p>
      </div>
      {/* Main CTA Button */}
      <a
        href="https://outlook.office.com/book/ZeroBuildDiscoveryCall@zerobuild.io/s/0j-Jsl27BUuEcZ2ortBjhA2?ismsaljsauthenabled"
        target="_blank"
        className="relative flex items-center justify-between px-6 md:px-6 py-1 md:py-2 rounded-full border border-black group overflow-hidden max-w-[400px] h-[fit-content]"
      >
        <span className="flex items-center">
          <span className="text-[20px] md:text-[32px] font-bold text-black mr-[7px]">
            Talk to an
          </span>
          <TypewriterEffect words={words} />
        </span>

        <span className="relative z-10 w-6 h-6 md:w-10 md:h-10 flex items-center justify-center rounded-full  text-white bg-[#484AB7]">
          <ArrowRight className="w-3 h-3 md:w-6 md:h-6" />
        </span>
      </a>
    </div>
  );
}
