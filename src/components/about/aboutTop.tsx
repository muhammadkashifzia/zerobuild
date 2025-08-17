// components/FionaProfile.tsx
"use client"; 
import Image from "next/image";
import { motion } from "motion/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
export default function AboutTop() {
  return (
          <div>
     
       <AuroraBackground>
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="max-w-[1024px] mx-auto relative flex flex-col gap-4  px-4"
            >
              <div className="text-3xl md:text-6xl font-normal text-black leading-[1.2] max-w-[1000px]">
              About Us
              </div>
              <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4 max-w-[1024px]">
         From metro systems to concert halls, our sustainability projects shape a better world.
              </div>
          
            </motion.div>
          </AuroraBackground>
         <div className="max-w-[1024px] mx-auto px-[16px] mt-[40px]">
        <p className="text-black mb-8 text-[16px] text-center">
          We believe buildings can be perfect, because they are built on data,
          Data that can shape perfectly comfortable homes for every age group,
          weather and location Data that can help us choose materials with the
          lowest environmental impact. Data that can optimise how we use
          resources, and Data that can help even generate income from energy
          rather than simply paying for it Data that can inform all functional,
          and technical design decisions with measurable outcomes. Our mission
          is to harness this data to create buildings that are not just
          compliant, but outstanding in comfort, carbon performance, cost
          efficiency, and circularity. We bring clarity to Net Zero by turning
          complexity into simple, confident decisions.
        </p>
        <Image
          src="/assets/images/about-image.png"
          alt="About Us"
          width={1200}
          height={600}
          className="w-full h-auto object-cover rounded-lg mb-8 max-w-full md:max-w-[800px] mx-auto"
        />
      </div>
    </div>

  );
}
