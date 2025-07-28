"use client";

import React, { useState, useEffect } from "react";
import { getProjects } from "@/sanity/sanity-utils";
import { Project } from "@/types/Project";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/moving-border";
import Link from "next/link";

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProjects();
      setProjects(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Header */}
      <section
        className="pt-24 pb-10 mb-10"
        style={{
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundImage: `url("/assets/images/coding-background-texture.jpg"), linear-gradient(180deg, #474ab6 0%, #9271f6 100%)`,
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-6xl font-normal text-white leading-tight max-w-4xl">
            Projects
          </h1>
          <p className="text-base md:text-2xl text-white mt-4 max-w-3xl">
            From metro systems to concert halls, our sustainability projects
            shape a better world.
          </p>
        </div>
      </section>

      {/* Swiper Slider */}
      <div className="relative w-full pt-14 overflow-x-hidden project-slider">
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
            spaceBetween={15}
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
                      className="w-full h-[400px] object-cover rounded-xl"
                    />
                  </Link>
                  {activeIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="flex justify-between py-5 h-[104px]"
                    >
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 max-w-[70%]">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {project.description ?? "Sustainable infrastructure"}
                      </p>
                    </motion.div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* View All Projects Button */}
      <div className="px-8 flex justify-end mb-6">
        <Link href="/projects/all-projects" className="w-full max-w-[160px]">
          <Button className="flex h-12 w-full items-center justify-center !rounded-xl bg-white text-sm text-black shadow transition duration-200 hover:shadow-lg">
            View all Projects
          </Button>
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8 mb-32">
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
    </div>
  );
}
