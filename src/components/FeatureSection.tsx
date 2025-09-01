"use client";
import React, { useState, useEffect } from "react";
import { getFeatures, getFeatureHeading } from "@/sanity/sanity-utils";
import { Feature, FeatureHeading } from "@/types/Feature";
import { motion } from "motion/react";
import { Highlight } from "@/components/ui/hero-highlight";
import { Button } from "@/components/ui/moving-border";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function Page() {
  const [Features, setFeatures] = useState<Feature[]>([]);
  const [featureHeading, setFeatureHeading] = useState<FeatureHeading | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuresRes, headingRes] = await Promise.all([
          getFeatures(),
          getFeatureHeading(),
        ]);
        setFeatures(featuresRes);
        setFeatureHeading(headingRes[0] || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto pb-[40px] py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Dynamic Feature Heading */}
      {featureHeading && (
        <div className="text-center mb-8 md:mb-12 px-[2rem]">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white mb-4">
            {featureHeading.heading}
          </h1>
       
         
            <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-center text-[16px]  px-4 text-black max-w-4xl  mx-auto mb-8 md:mb-12 relative z-10 leading-[32px]"
        >
             {featureHeading.description}  <Highlight className="text-black dark:text-white">
          {featureHeading.highlightText}  
          </Highlight>
           </motion.p>
     
        </div>
      )}

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-[2rem]">
        {Features.length > 0 ? (
          Features.map((Feature, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-4 md:p-6 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
                  <svg
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
                  >
                    <defs>
                      <pattern
                        id="_R_6dlaulb_"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                        x="-12"
                        y="4"
                      >
                        <path d="M.5 20V.5H20" fill="none"></path>
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      strokeWidth="0"
                      fill="url(#_R_6dlaulb_)"
                    ></rect>
                    <g>
                      <rect
                        strokeWidth="0"
                        width="21"
                        height="21"
                        x="140"
                        y="20"
                      ></rect>
                      <rect
                        strokeWidth="0"
                        width="21"
                        height="21"
                        x="160"
                        y="40"
                      ></rect>
                      <rect
                        strokeWidth="0"
                        width="21"
                        height="21"
                        x="180"
                        y="60"
                      ></rect>
                      <rect
                        strokeWidth="0"
                        width="21"
                        height="21"
                        x="140"
                        y="80"
                      ></rect>
                      <rect
                        strokeWidth="0"
                        width="21"
                        height="21"
                        x="160"
                        y="100"
                      ></rect>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="relative z-20">
                <p className="text-sm md:text-base font-bold text-neutral-800 dark:text-white">
                  {Feature.title}
                </p>
                <p className="text-xs md:text-sm lg:text-base text-neutral-600 dark:text-neutral-400 mt-2 md:mt-4 font-normal">
                  {Feature.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            Loading features...
          </p>
        )}
      </div>
        <div className="px-[16px] flex justify-center mt-[50px]">
        <Link href="/services" className="w-full max-w-[254px]">
          <Button className="flex gap-[5px] h-12 w-full max-w-[254px] items-center justify-center !rounded-xl bg-white text-sm text-black shadow transition duration-200 hover:shadow-lg">
            Explore all services <span className="absolute right-[15px]"><ArrowRight  /></span>



          </Button>
        </Link>
      </div>
    </div>
  );
}
