// components/AboutTop.tsx
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { client } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { AboutPageBanner } from "@/types/aboutPage";
import AboutTopClient from "./AboutTopClient";

export default async function AboutTop() {
  const aboutPageData: AboutPageBanner | null = await client.fetch(aboutPageQuery);

  return (
    <div>
      <AuroraBackground>
        <AboutTopClient 
          title={aboutPageData?.title || "About Us"}
          description={aboutPageData?.description || "From metro systems to concert halls, our sustainability projects shape a better world."}
        />
      </AuroraBackground>
      <div className="max-w-[1024px] mx-auto px-[16px] mt-[40px]">
        {aboutPageData?.introText && (
          <p className="text-black mb-8 text-[16px] text-center">
            {aboutPageData.introText}
          </p>
        )}
        <Image
          src={aboutPageData?.introImage?.asset?.url || "/assets/images/about-image.png"}
          alt="About Us"
          width={aboutPageData?.introImage?.asset?.metadata?.dimensions?.width || 1200}
          height={aboutPageData?.introImage?.asset?.metadata?.dimensions?.height || 600}
          className="w-full h-auto object-cover rounded-lg mb-8 max-w-full md:max-w-[800px] mx-auto"
        />
      </div>
    </div>

  );
}
