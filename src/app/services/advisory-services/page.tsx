"use client";

import { useState } from "react";
import { Plus, Minus, ArrowLeft  } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const accordionData = [
  {
    title: "Control and manage building acoustics",
    content: "Advice on controlling noise through partitions and ceilings.",
  },
  {
    title: "Define and design room acoustics",
    content: "Achieve sound that fits the purpose.",
  },
  {
    title: "Environmental acoustics",
    content: "Solutions for managing noise pollution in external environments.",
  },
  {
    title: "Health and wellbeing",
    content: "Enhance occupant wellbeing via tailored acoustic environments.",
  },
  {
    title: "Manage transport noise and vibration",
    content: "Design for quieter urban spaces and transit solutions.",
  },
];

export default function ServiceDetailPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="text-gray-900 my-[120px]">
      <div className="container mx-auto px-[16px]">
        <Link
          href="/services"
          className="flex items-center gap-[15px]"
        > 
        <span><ArrowLeft/></span>
          <span className="text-[20px]">Back to services</span>
        </Link>
      </div>
      {/* Top Image Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-4">
        {[1, 2, 3].map((img, i) => (
          <div key={i} className="relative aspect-[4/3]">
            <Image
              src={`/assets/images/image${img}.jpg`}
              alt={`Hero ${i + 1}`}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </section>

      <div className="container grid grid-cols-3 px-[16px] gap-[20px] mx-auto py-[80px]">
        <div className="col-span-2">
          {/* Title and Description */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Acoustic Consulting
            </h1>
            <p className="text-lg text-gray-700">
              Our experience of places is driven by our ears as much as our
              eyes, which is why acoustics is fundamental to any successful
              building or environment.
            </p>
            <p className="text-gray-600">
              We create spaces with a wide range of acoustic environments,
              whether it’s developing low-reverberation studios or mitigating
              rail noise. We apply rigorous scientific thinking to inform, shape
              and integrate sound strategies with architectural vision.
            </p>
          </div>

          {/* Accordion */}
          <div className="">
            <h2 className="text-2xl font-medium my-4">
              Discover how we can help:
            </h2>
            <div className="space-y-2">
              {accordionData.map((item, i) => (
                <div key={i} className="border border-gray-200 rounded">
                  <button
                    onClick={() => toggleAccordion(i)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-50 transition"
                  >
                    <span>{item.title}</span>
                    {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                  {openIndex === i && (
                    <div className="px-4 pb-4 text-sm text-gray-600">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="col-span-1">
          <div className="rounded-[.75rem] border border-[#e0e0e0] p-[2rem]">
            <h3 className="text-[22px] font-semibold mb-2">
              Get in touch with our team
            </h3>
            <Link
              href="/contact"
              className="relative w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-5 rounded-xl max-w-[150px] h-[50px] flex items-center   text-lg font-semibold hover:bg-[#3c3f9d] transition-colors duration-200 mt-[2rem]"
            >
              <span> Contact</span>{" "}
              <span className="absolute right-[15px]">→</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
