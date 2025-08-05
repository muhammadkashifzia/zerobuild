import React from "react";

const YouTubeSkeleton: React.FC = () => {
  return (
    <div className="rounded-3xl my-10 grid grid-cols-1 gap-10 bg-gradient-to-b from-gray-200 to-gray-300 px-2 pt-2 pb-10 sm:p-10 md:gap-20 lg:grid-cols-2 animate-pulse">
      {/* Video skeleton */}
      <div className="relative aspect-video h-full w-full overflow-hidden rounded-2xl bg-gray-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-500 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
        <div className="h-6 bg-gray-300 rounded w-5/6"></div>
        <div className="h-6 bg-gray-300 rounded w-4/5"></div>
        <div className="h-12 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default YouTubeSkeleton; 