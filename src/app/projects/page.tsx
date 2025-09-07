"use client";

import React, { useState, useEffect } from "react";
import { getProjects, getProjectsBanner } from "@/sanity/sanity-utils";
import { Project } from "@/types/Project";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/moving-border";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import CtaSection from "@/components/CtaSection"

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [banner, setBanner] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add debugging logs
        console.log('Fetching banner data...');
        const [res, bannerRes] = await Promise.all([
          getProjects(),
          getProjectsBanner(),
        ]);
        
        console.log('Projects:', res);
        console.log('Banner data received:', bannerRes);
        
        setProjects(res);
        setBanner(bannerRes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Add debug logging for banner state
  console.log('Current banner state:', banner);

  return (
    <div>
      {/* Header */}
      <div className="min-h-[1px] bg-white mt-[64px]">
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="container mx-auto relative flex flex-col gap-4 px-4"
          >
            <div className="max-w-[1024px]">
              {/* Add loading state and fallback for banner */}
              <div className="text-3xl md:text-6xl font-normal text-black leading-[1.2] max-w-[1000px]">
                {loading ? (
                  <div className="h-12 md:h-20 bg-gray-200 animate-pulse rounded" />
                ) : (
                  banner?.title || "Default Title"
                )}
              </div>
              <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4 max-w-[1024px]">
                {loading ? (
                  <div className="h-6 md:h-8 bg-gray-200 animate-pulse rounded mt-4" />
                ) : (
                  banner?.description || "Default description"
                )}
              </div>
            </div>
          </motion.div>
        </AuroraBackground>
      </div>
      
      {/* Rest of your component remains the same */}
      <div className="mt-[60px] relative w-full pt-14 overflow-x-hidden project-slider">
        {!loading && projects.length > 0 && (
          <div className="absolute left-[20px] top-0 z-20 text-lg font-semibold text-black ">
            {activeIndex + 1} — {projects.length}
          </div>
        )}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button className="swiper-button-prev">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button className="swiper-button-next">
            <ArrowRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-12">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-full h-[400px] bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={1.25}
            centeredSlides
            loop
            spaceBetween={24}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
            className="!overflow-visible mb-12"
          >
            {projects.map((project, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative rounded-xl overflow-hidden ">
                  <Link href={`/projects/${project.slug}`}>
                    <Image
                      src={project.image?.asset?.url ?? "/placeholder.png"}
                      alt={project.title}
                      width={900}
                      height={400}
                      className="w-full h-[250px] md:h-[400px] object-cover rounded-xl"
                    />
                  </Link>
                  {activeIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="flex flex-wrap justify-between py-5 h-auto md:h-[104px]"
                    >
                      <h3 className="text-[18px] md:text-2xl font-semibold text-gray-800 max-w-full md:max-w-[70%]">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {project.location}
                      </p>
                    </motion.div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="px-[16px] flex justify-end mb-6">
        <Link href="/projects/all-projects" className="w-full max-w-[160px]">
          <Button className="flex gap-2 h-12 w-full items-center justify-center !rounded-xl bg-white text-sm text-black shadow transition duration-200 hover:shadow-lg">
            View all Projects <ArrowRight />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-[16px]  mb-12">
        {loading
          ? [...Array(8)].map((_, i) => (
              <div key={i} className="group animate-pulse">
                <div className="rounded-md overflow-hidden aspect-[4/3] bg-gray-200" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))
          : projects.slice(0, 8).map((project, index) => (
              <div key={index} className="group">
                <div className="rounded-md overflow-hidden aspect-[4/3] bg-gray-100">
                  <Link href={`/projects/${project.slug}`}>
                    <Image
                      src={project.image?.asset?.url ?? "/placeholder.png"}
                      alt={project.title}
                      width={900}
                      height={500}
                      className="rounded-xl object-cover w-full h-full"
                    />
                  </Link>
                </div>
                <div className="mt-3">
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-lg font-medium leading-snug text-black mb-4 line-clamp-2">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-[#757575] text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
      </div>
      <CtaSection />
    </div>
  );
}