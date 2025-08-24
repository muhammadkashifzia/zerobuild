// components/AboutProfile.tsx
"use client"; // use this only if you're using the app directory

import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface AboutProfileProps {
  profileImage?: {
    asset?: {
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  name?: string;
  title?: string;
  description?: string;
  bio?: string;
  contactButtonText?: string;
  contactButtonUrl?: string;
  linkedinUrl?: string;
  linkedinButtonText?: string;
}

export default function AboutProfile({
  profileImage,
  name = "Deepak Sadhwani",
  title = "Zero Build was founded by Deepak Sadhwani, an architect turned building performance specialist, with a deep belief that good design must be backed by good data.",
  description = "After completing his MSc in Sustainable Mega-Buildings with distinction at Welsh School of Architecture, Cardiff University, Deepak's research was awarded the prestigious CIBSE President's Prize, recognising his ability to bridge building physics and design thinking. He is the co-author of the CIBSE Building Physics Guide. His work has been recognised through two interdisciplinary design challenge wins, including the TDUK University Design Challenge 2023 and the Southside Net Zero Design Challenge. In both, he played a leading role in building physics, cost and carbon analysis, and interdisciplinary coordination. He has since led and contributed to national Net Zero initiatives, working with local authorities, developerss, architects and enigneers in UK, Greece, Italy, USA, Japan, Turkey and China . From early architectural projects in India to pioneering holictic sustainable developments across the globe, focing on comfort, carbon, cost, circularity and compliance, Deepak's journey reflects the ethos of Zero Build: a drive to make buildings truly perfect.",
  bio,
  contactButtonText = "Contact our experts",
  contactButtonUrl = "https://outlook.office.com/book/ZeroBuildDiscoveryCall@zerobuild.io/s/0j-Jsl27BUuEcZ2ortBjhA2?ismsaljsauthenabled",
  linkedinUrl = "https://www.linkedin.com/company/5c-zero/about/",
  linkedinButtonText = "Connect on LinkedIn"
}: AboutProfileProps) {
  return (
    <div className="flex flex-col md:flex-row max-w-[1024px] mx-auto px-4 pt-[80px] pb-[100px] gap-8">
      {/* Left Image */}
      <div className="flex-shrink-0 w-full md:w-1/3">
        <Image
          src={profileImage?.asset?.url || "/assets/images/di-thornhill-and-policies.webp"}
          alt={profileImage?.alt || "Fiona Cousins"}
          width={profileImage?.asset?.metadata?.dimensions?.width || 500}
          height={profileImage?.asset?.metadata?.dimensions?.height || 500}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>

      {/* Right Text Section */}
      <div className="flex flex-col justify-start  md:w-2/3">
        <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-serif font-medium text-gray-900 mb-[0px]">
          {name}
        </h1>

        <a
          href={contactButtonUrl}
          target="_blank"
          className="gap-[15px] text-black text-[20px] px-[20px] items-center max-w-[280px] font-bold mb-[24px] rounded-full inline-flex leading-[100%] border border-[#757575] min-h-[44px]"
        >
          {contactButtonText} <ArrowRight />
        </a>

        <p className="text-black text-[20px] mb-[8px]">
          {title}
        </p>

        <p className="text-gray-700 text-[16px] mb-[15px]">
          {bio || description}
        </p>

        <a
          href={linkedinUrl}
          target="_blank"
          className="text-[24px] text-black hover:underline inline-flex items-center gap-[10px] mt=[24px]"
        >
          {linkedinButtonText}
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5V24H0V8.98zM7.5 8.98h4.78v2.06h.07c.66-1.26 2.3-2.6 4.73-2.6 5.06 0 6 3.32 6 7.63V24h-5v-6.84c0-1.63-.03-3.72-2.27-3.72-2.28 0-2.63 1.78-2.63 3.6V24h-5V8.98z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
