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
        <p className="text-black mb-8 text-[16px] text-center">
          We believe buildings can be perfect, because they are built on data,
          Data that can shape perfectly comfortable homes for every age group,
          weather and location Data that can help us choose materials with the
          lowest environmental impact. Data that can optimise how we use
          resources, and Data that can help even generate income from energy
          rather than simply paying for it Data that can inform all functional,
          and technical design decisions with measurable outcomes. Our mission
          is to harness this data to create buildings that are not just
          compliant, but outstanding in comfort, carbon performance, cost
          efficiency, and circularity. We bring clarity to Net Zero by turning
          complexity into simple, confident decisions.
        </p>
        <Image
          src="/assets/images/about-image.png"
          alt="About Us"
          width={1200}
          height={600}
          className="w-full h-auto object-cover rounded-lg mb-8 max-w-full md:max-w-[800px] mx-auto"
        />
      </div>
    </div>

  );
}
