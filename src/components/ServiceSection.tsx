"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
const ServiceSection = () => {
  return (
    <section className=" text-black pb-[40px] service-section relative">
      <div className="container px-[16px] mx-auto space-y-6 md:space-y-10">
        {/* Header Row */}
        <div className="flex  gap-[20px] justify-between md:flex-row flex-col items-center">
          <div className="max-w-[980px]">
            <h2 className="text-[18px] lg:text-[24px] font-medium text-black">
              We guide, plan and design the future of the built environment. We
              are a global consultancy with advisory and technical expertise
              across more than 150 disciplines.
            </h2>
          </div>
          <Link
            href="/services"
            className="gap-[5px] w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-2 rounded-2xl max-w-[200px] h-[50px] flex items-center justify-center text-lg font-semibold hover:bg-[#3c3f9d] transition-colors duration-200"
          >
            View all services <ArrowRight />
          </Link>

         
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
