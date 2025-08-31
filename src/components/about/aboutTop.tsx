// components/AboutTop.tsx
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { client } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { AboutPageBanner } from "@/types/aboutPage";
import AboutTopClient from "./AboutTopClient";

export default async function AboutTop() {
  const aboutPageData: AboutPageBanner | null = await client.fetch(aboutPageQuery);

  console.log("AboutTop component data:", aboutPageData);

  return (
    <div>
      <AuroraBackground>
        <AboutTopClient 
          title={aboutPageData?.title}
          description={aboutPageData?.description}
        />
      </AuroraBackground>
      <div className="container mx-auto px-[16px] mt-[40px]">
        {aboutPageData?.introContent && (
          <div className="prose max-w-none text-black mb-8 about-intro-content">
            <PortableText
              value={aboutPageData.introContent}
              components={{
                types: {
                  image: ({ value }) => (
                    <div className="w-full flex justify-center my-6">
                      <Image
                        src={value?.asset?.url}
                        alt={value?.alt}
                        width={1200}
                        height={600}
                        className="w-full h-auto object-cover rounded-lg max-w-full md:max-w-[800px]"
                      />
                    </div>
                  ),
                },
                block: {
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-center">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold text-center">{children}</h2>
                  ),
                  normal: ({ children }) => (
                    <p className="text-[16px] text-left md:text-center">{children}</p>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc list-inside space-y-1">{children}</ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-1">{children}</ol>
                  ),
                },
                listItem: ({ children }) => <li>{children}</li>,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
