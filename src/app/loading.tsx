import React from "react";
import YouTubeSkeleton from "@/components/shimmer/YouTubeSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen antialiased bg-[#fafafa]">
      {/* Hero Section Skeleton */}
      <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 animate-pulse">
        <div className="container mx-auto px-4 py-20">
          <div className="h-16 bg-gray-300 rounded w-3/4 mb-8"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3 mb-8"></div>
          <div className="h-12 bg-gray-300 rounded w-48"></div>
        </div>
      </div>

      {/* Performance Section Skeleton */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="h-12 bg-gray-300 rounded w-1/3 mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-full"></div>
                <div className="h-6 bg-gray-300 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Section Skeleton */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="h-12 bg-gray-300 rounded w-1/3 mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* YouTube Section Skeleton */}
      <div
        className="mb-[40px] md:mb-[80px] pb-[10px] pt-[30px] md:py-[60px]"
        style={{
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundImage: `url("/assets/images/coding-background-texture.jpg"), linear-gradient(180deg, #484AB7 0%, #9271f6 100%)`,
        }}
      >
        <div className="container mx-auto px-[16px]">
          <div>
            <h2 className="text-[24px] md:text-[48px] font-bold text-white sm:text-center">
              Featured by popular YouTubers
            </h2>
            <p className="mt-2 text-lg text-white sm:text-center">
              Loading videos...
            </p>
          </div>
          <YouTubeSkeleton />
        </div>
      </div>
    </div>
  );
} 