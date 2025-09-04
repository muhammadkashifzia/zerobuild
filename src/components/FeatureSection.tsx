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
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pb-[40px] py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto ">
        {/* Feature Heading */}
        {loading ? (
          <div className="text-center mb-8 md:mb-12 px-[2rem] animate-pulse">
            <div className="h-8 md:h-10 lg:h-12 w-2/3 mx-auto bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="h-4 w-3/4 mx-auto bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
            <div className="h-4 w-2/3 mx-auto bg-gray-200 dark:bg-gray-600 rounded"></div>
          </div>
        ) : (
          featureHeading && (
            <div className="text-center mb-8 md:mb-12 px-[2rem]">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white mb-4">
                {featureHeading.heading}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [20, -5, 0] }}
                transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
                className="text-center text-[16px] px-4 text-black max-w-4xl mx-auto mb-8 md:mb-12 relative z-10 leading-[32px]"
              >
                {featureHeading.description}
                <Highlight className="text-black dark:text-white">
                  {featureHeading.highlightText}
                </Highlight>
              </motion.p>
            </div>
          )
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-[2rem]">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-lg"
                >
                  <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
              ))
            : Features.map((Feature, index) => (
                <div
                  key={index}
                  className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-4 md:p-6 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="relative z-20">
                    <p className="text-sm md:text-base font-bold text-neutral-800 dark:text-white">
                      {Feature.title}
                    </p>
                    <p className="text-xs md:text-sm lg:text-base text-neutral-600 dark:text-neutral-400 mt-2 md:mt-4 font-normal">
                      {Feature.description}
                    </p>
                  </div>
                </div>
              ))}
        </div>

        {/* Explore Services Button */}
        <div className="px-[16px] flex justify-center mt-[50px]">
          <Link href="/services" className="w-full max-w-[254px]">
            <Button className="flex gap-[5px] h-12 w-full max-w-[254px] items-center justify-center !rounded-xl bg-white text-sm text-black shadow transition duration-200 hover:shadow-lg">
              Explore all services
              <span className="absolute right-[15px]">
                <ArrowRight />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
