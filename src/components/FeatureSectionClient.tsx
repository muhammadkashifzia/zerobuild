"use client";

import React, { useId } from "react";

import { motion } from "motion/react";
import { Highlight } from "@/components/ui/hero-highlight";
import { Feature } from "@/types/Feature";
import { Button } from "@/components/ui/moving-border";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeatureSectionClient({
  features,
}: {
  features: Feature[];
}) {
  // Use fallback features if no features are provided
  const displayFeatures =
    features && features.length > 0
      ? features
      : [
          {
            _id: "fallback-1",
            _createdAt: new Date().toISOString(),
            title: "Whole Life Carbon Assessment",
            description:
              "Comprehensive carbon footprint analysis across the entire building lifecycle, from construction to demolition.",
            icon: "leaf",
            order: 1,
            isActive: true,
          },
          {
            _id: "fallback-2",
            _createdAt: new Date().toISOString(),
            title: "Dynamic Energy Modelling",
            description:
              "Advanced energy performance simulation and optimization for new builds and retrofit projects.",
            icon: "zap",
            order: 2,
            isActive: true,
          },
          {
            _id: "fallback-3",
            _createdAt: new Date().toISOString(),
            title: "Lifecycle Cost-Benefit Analysis",
            description:
              "Financial assessment of sustainability investments with long-term ROI calculations and risk analysis.",
            icon: "chart",
            order: 3,
            isActive: true,
          },
          {
            _id: "fallback-4",
            _createdAt: new Date().toISOString(),
            title: "ESG Compliance Support",
            description:
              "Expert guidance on environmental, social, and governance compliance for built environment projects.",
            icon: "shield",
            order: 4,
            isActive: true,
          },
          {
            _id: "fallback-5",
            _createdAt: new Date().toISOString(),
            title: "Procurement Strategy",
            description:
              "Sustainable procurement solutions and supplier assessment for green building materials and services.",
            icon: "shopping-cart",
            order: 5,
            isActive: true,
          },
          {
            _id: "fallback-6",
            _createdAt: new Date().toISOString(),
            title: "Portfolio Optimization",
            description:
              "Strategic portfolio-wide sustainability planning and optimization for multiple building assets.",
            icon: "building",
            order: 6,
            isActive: true,
          },
        ];

  return (
    <div className="py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tl from-green-400 to-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-[900px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-[24px] md:text-[38px] leading-[1.3] mb-[15px] font-bold text-black relative z-10"
        >
          We offer faster and simpler pathways to decarbonise the built
          environment.
        </motion.h2>
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-center text-[16px]  px-4 text-black max-w-4xl  mx-auto mb-8 md:mb-12 relative z-10 leading-[32px]"
        >
          By combining data, simulation and design expertise, we support design
          teams, local authorities, housing providers and developers with
          actionable insights across
          <Highlight className="text-black dark:text-white">
            more than 40 built environment disciplines.
          </Highlight>
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto px-4 relative z-10">
        {displayFeatures.map((feature, index) => (
          <motion.div
            key={feature._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1 * index,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-4 md:p-6 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Grid size={20} />
            <div className="relative z-20">
              <p className="text-sm md:text-base font-bold text-neutral-800 dark:text-white">
                {feature.title}
              </p>
              <p className="text-xs md:text-sm lg:text-base text-neutral-600 dark:text-neutral-400 mt-2 md:mt-4 font-normal">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="px-[16px] flex justify-center mt-[50px]">
        <Link href="/services" className="w-full max-w-[254px]">
          <Button className="flex gap-[5px] h-12 w-full max-w-[254px] items-center justify-center !rounded-xl bg-white text-sm text-black shadow transition duration-200 hover:shadow-lg">
            Explore all services <span className="absolute right-[15px]"><ArrowRight  /></span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  // Use deterministic coordinates instead of random ones to prevent hydration mismatch
  const p = pattern ?? [
    [7, 1],
    [8, 2],
    [9, 3],
    [7, 4],
    [8, 5],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy]: any) => (
            <rect
              strokeWidth="0"
              key={`${sx}-${sy}`}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
