"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
const ServiceSection = () => {
  return (
    <section
      className=" text-black py-16 px-4 lg:px-20 mt-[80px] service-section relative"
      style={{
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundImage: `url("/assets/images/coding-background-texture.jpg"), linear-gradient(180deg, #484AB7 0%, #9271f6 100%)`,
      }}
    >
      <div className="container px-[16px] mx-auto space-y-6 md:space-y-10">
        {/* Header Row */}
        <div className="flex justify-between items-start flex-col md:flex-row gap-[20px]">
          <div>
            <p className="text-sm font-medium text-white">Explore</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-medium mt-2 text-white">
              Discover more of our services:
            </h2>
          </div>
          <Link
            href="/services"
            className="w-full gap-[20px] bg-[#ffffff] text-[#484AB7] border-neutral-200 dark:border-[#484AB7] p-5 rounded-2xl max-w-[256px] h-[56px] flex items-center justify-center text-lg font-semibold hover:bg-[#f7f7f8] transition-colors duration-200"
          >
            View all services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid Rows */}
        <div className="divide-y divide-gray-300 text-white">
          {/* Services Row */}
          <div className="py-3 md:py-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <h3 className="font-serif text-lg">Accessibility</h3>
            <div className="col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <p className="text-lg">Acoustic consulting</p>
              <p className="text-lg">Architecture</p>
              <p className="text-lg">Asset management</p>
            </div>
          </div>

          {/* Markets Row */}
          <div className="py-3 md:py-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <h3 className="font-serif text-lg">Audio-visual systems</h3>
            <div className="col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <p className="text-lg">Bridge engineering</p>
              <p className="text-lg">Building physics</p>
              <p className="text-lg">Building retrofit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
