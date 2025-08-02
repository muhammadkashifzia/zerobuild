"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
const ServiceSection = () => {
  return (
    <section className=" text-black pb-16 service-section relative">
      <div className="container px-[16px] mx-auto space-y-6 md:space-y-10">
        {/* Header Row */}
        <div className="flex  gap-[20px] justify-between md:flex-row flex-col">
          <div className="md:max-w-[500px] lg:max-w-[650px]">
            <h2 className="text-[24px] lg:text-[32px] font-medium mt-2 text-black">
              We guide, plan and design the future of the built environment. We
              are a global consultancy with advisory and technical expertise
              across more than 150 disciplines.
            </h2>
          </div>
          {/* <Link
            href="/services"
            className="w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-2 rounded-2xl max-w-[180px] h-[50px] flex items-center justify-center text-lg font-semibold hover:bg-[#3c3f9d] transition-colors duration-200"
          >
            View all services
          </Link> */}

          <ul className="col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-x-14 gap-y-4">
            <li className="text-[28px] md:text-[18px] lg:text-[24px]">Acoustic consulting</li>
            <li className="text-[24px] md:text-[18px] lg:text-[24px]">Architecture</li>
            <li className="text-[24px] md:text-[18px] lg:text-[24px]">Asset management</li>
            <li className="text-[24px] md:text-[18px] lg:text-[24px]">Bridge engineering</li>
            <li className="text-[24px] md:text-[18px] lg:text-[24px]">Building lihysics</li>
            <li className="text-[24px] md:text-[18px] lg:text-[24px]">Building retrofit</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
