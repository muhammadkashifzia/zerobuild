"use client";

// import { FaBalanceScale, FaChartBar, FaCloud, FaSun, FaThermometerHalf, FaCheckDouble } from "lucide-react";
import Image from "next/image";
const accelerators = [
  {
    title: "Results Comparison",
    icon:"/assets/images/imgi_44_PRM.png",
    description: "Compare multiple models or scenarios at once, cutting down manual analysis time and helping you optimise design decisions faster."
  },
  {
    title: "Model Validation",
    icon: "/assets/images/imgi_58_EMID.png",
    description: "Cuts the time to extract mechanical data from hours to seconds, enabling faster issue detection and error-free model validation."
  },
  {
    title: "Operational Carbon and Cost",
    icon: "/assets/images/imgi_15_OCOC.png",
    description: "Estimate annual operational carbon and costs, with or without PV and battery, in under a minute—helping you make informed decisions fast."
  },
  {
    title: "Heat Balance Breakdown",
    icon: "/assets/images/imgi_63_HBB.png",
    description: "Breaks down heat gains and losses across the model in minutes rather than days, giving you key insights into retrofit priorities and peak loads."
  },
  {
    title: "Indoor Air Quality",
    icon: "/assets/images/imgi_53_IAQ.png",
    description: "Instantly evaluate indoor air quality by analysing CO₂ concentrations, ensuring healthier environments in a fraction of the time."
  },
  {
    title: "Daylight Performance",
    icon: "/assets/images/imgi_67_DIA.png",
    description: "Assess daylight performance for all rooms quickly and accurately, accelerating compliance and improving visual comfort."
  }
];

export default function AcceleratorSuite() {
  return (
    <section className="bg-white py-[40px] md:py-[80px]">
      <div className="container mx-auto px-[16px] grid md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-1">
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#484AB7] mb-4">Accelerator suite</h2>
          <p className="text-gray-700 mb-4">
            The IES verified suite of innovative tools{" "}
            <strong>reduces the resources spent on building simulations</strong>, helping teams focus on what really
            matters: designing <strong>more efficient</strong>, Net Zero buildings, regardless of whether these are new
            build or retrofit.
          </p>
          <Image
            src="/assets/images/imgi_24_IES_v2.png"
            alt="IES Logo"
            className="h-12 my-4"
          />
          <p className="text-gray-600 mb-6">Explore how each accelerator can transform your workflow:</p>
          <button className="bg-[#484AB7] text-white px-6 py-3 rounded-full font-semibold shadow">
            BUY COMPLETE SUITE →
          </button>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {accelerators.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
            >
              <div className="mb-3"><Image src={item.icon} alt="resourceImage" width={63} height={63} className="w-[63px] h-[63px]"/></div>
              <h3 className="font-semibold text-lg mb-2 text-[#484AB7]">{item.title}</h3>
              <p className="text-sm text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
