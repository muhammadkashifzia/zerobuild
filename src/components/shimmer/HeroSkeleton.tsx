"use client";
import React from "react";
import { motion } from "framer-motion";

const HeroSkeleton = () => {
  return (
    <div className="h-auto md:h-[32rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0 border-b">
      {/* Background gradient skeleton */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100" />
      
      <div className="container px-[16px] relative z-10 w-full text-center mt-[40px] md:mt-0">
        {/* Title skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 text-center mx-auto mt-10"
        >
          <div className="h-8 md:h-16 bg-gray-200 rounded-lg mb-4 max-w-2xl mx-auto animate-pulse" />
          <div className="h-8 md:h-16 bg-gray-200 rounded-lg max-w-xl mx-auto animate-pulse" />
        </motion.div>
        
        {/* Description skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-4 max-w-2xl mx-auto"
        >
          <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
        </motion.div>
        
        {/* Buttons skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-6 flex w-full gap-[10px] justify-center flex-col md:flex-row items-center"
        >
          <div className="w-full max-w-[256px] h-14 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="w-full max-w-[256px] h-14 bg-gray-200 rounded-2xl animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSkeleton; 