"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
const ServiceSection = () => {
  return (
    <section
      className=" text-black py-16  mt-[80px] service-section relative"
     
    >
      <div className="container px-[16px] mx-auto space-y-6 md:space-y-10">
        {/* Header Row */}
        <div className="flex justify-between items-start flex-col md:flex-row gap-[20px]">
          <div>
            <h2 className="text-3xl lg:text-4xl font-medium mt-2 text-black">
             We guide, plan and design the future of the built environment. We are a global consultancy with advisory and technical expertise across more than 150 disciplines.
            </h2>
          </div>
          {/* <Link
            href="/services"
            className="w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-2 rounded-2xl max-w-[180px] h-[50px] flex items-center justify-center text-lg font-semibold hover:bg-[#3c3f9d] transition-colors duration-200"
          >
            View all services
          </Link> */}
        </div>

        {/* Grid Rows */}
        <div className="divide-y divide-gray-300 text-black">
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
