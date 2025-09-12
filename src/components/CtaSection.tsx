"use client";
import { ArrowRight } from "lucide-react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { useEffect, useState } from "react";
import { getCTA } from "@/sanity/sanity-utils";
import { CTAButton } from "@/types/home";

export default function CtaSection() {
  const [cta, setCta] = useState<CTAButton | null>(null);

  useEffect(() => {
    getCTA().then(setCta);
  }, []);

  if (!cta) return null;

  const words = [{ text: cta.ctabtntextanimation }];

  return (
    <div className="my-[20px] md:my-[40px] container mx-auto w-full flex items-center justify-between flex-wrap px-0 md:px-[16px]">
      {/* Left: Copy */}
      <div className="max-w-full w-full md:max-w-[740px] md:w-[44%] mb-[15px]">
        <h2 className="text-black text-[20px] md:text-[24px] font-semibold mb-[10px]">
          {cta.title}
        </h2>
        <p className="text-black text-[14px] md:text-[16px]">{cta.subtext}</p>
      </div>

      {/* Right: Pill CTA */}
      <a
        href={cta.ctabtnurl}
        target="_blank"
        rel="noreferrer"
        className="relative flex items-center justify-between px-6 md:px-8 py-3 md:py-4 rounded-full border border-black overflow-hidden max-w-[520px] h-[fit-content]"
      >
        <span className="flex items-center">
          <span className="text-[20px] md:text-[32px] font-bold text-black mr-[7px]">
            {cta.ctabtntext}
          </span>
          <TypewriterEffect words={words} />
        </span>
        <span className="relative z-10 w-6 h-6 md:w-10 md:h-10 flex items-center justify-center rounded-full text-white bg-[#484AB7]">
          <ArrowRight className="w-3 h-3 md:w-6 md:h-6" />
        </span>
      </a>
    </div>
  );
}
