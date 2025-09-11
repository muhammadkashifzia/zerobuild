"use client";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { ArrowRight } from "lucide-react";

interface AboutCtaProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  typewriterWords?: Array<{ text: string }>;
}

export default function CtaSection({
  title,
  description,
  buttonText,
  buttonUrl,
  typewriterWords,
}: AboutCtaProps) {
  if (!title && !description && !buttonText && !typewriterWords) {
    // If no data at all, don’t render the section
    return null;
  }

  return (
    <div className="p-4 md:p-8 container mx-auto w-full flex items-center justify-between flex-wrap">
      <div className="max-w-full w-full md:max-w-[740px] md:w-[44%] mb-[15px]">
        {title && (
          <h2 className="text-black text-[20px] md:text-[24px] font-semibold mb-[10px]">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-black text-[16px]">
            {description}
          </p>
        )}
      </div>

      {/* Main CTA Button */}
      {buttonUrl && (buttonText || typewriterWords) && (
        <a
          href={buttonUrl}
          target="_blank"
          className="relative flex items-center justify-between px-6 md:px-6 py-1 md:py-2 rounded-full border border-black group overflow-hidden max-w-[400px] h-[fit-content]"
        >
          <span className="flex items-center">
            {buttonText && (
              <span className="text-[20px] md:text-[32px] font-bold text-black mr-[7px]">
                {buttonText}
              </span>
            )}
            {typewriterWords && typewriterWords.length > 0 && (
              <TypewriterEffect words={typewriterWords} />
            )}
          </span>

          <span className="relative z-10 w-6 h-6 md:w-10 md:h-10 flex items-center justify-center rounded-full text-white bg-[#484AB7]">
            <ArrowRight className="w-3 h-3 md:w-6 md:h-6" />
          </span>
        </a>
      )}
    </div>
  );
}
