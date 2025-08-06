"use client";
import React from "react";
import { motion } from "framer-motion";

const PerformanceSkeleton = () => {
  return (
    <section className="text-black py-[40px]">
      <div className="container mx-auto px-[16px]">
        {/* Main title skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="h-8 md:h-10 bg-gray-200 rounded-lg mb-4 max-w-4xl mx-auto animate-pulse" />
          <div className="h-8 md:h-10 bg-gray-200 rounded-lg mb-4 max-w-3xl mx-auto animate-pulse" />
          <div className="h-8 md:h-10 bg-gray-200 rounded-lg max-w-2xl mx-auto animate-pulse" />
        </motion.div>

        {/* Description skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="space-y-6 mb-8"
        >
          <div className="h-4 bg-gray-200 rounded max-w-2xl mx-auto animate-pulse" />
          <div className="h-4 bg-gray-200 rounded max-w-3xl mx-auto animate-pulse" />
          <div className="h-4 bg-gray-200 rounded max-w-xl mx-auto animate-pulse" />
        </motion.div>

        {/* Chart buttons skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-center gap-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-12 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </motion.div>

        {/* Chart area skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="h-64 md:h-96 bg-gray-200 rounded-lg animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceSkeleton; 