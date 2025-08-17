"use client";

import { useState, lazy, Suspense } from "react";
import ObservabilityChart from "./ObservabilityChart";
import { Button } from "./ui/moving-border";
import { AnimatedButton } from "./ui/animated-button";
import type { Performance } from "@/types/performance";

// Lazy load skeleton component
const PerformanceSkeleton = lazy(() => import("./shimmer/PerformanceSkeleton").then(mod => ({ default: mod.default })));

interface PerformanceSectionProps {
  performanceData?: Performance | null;
}

// Button Skeleton Component
const ButtonSkeleton = () => (
  <div className="px-4 py-2 text-[16px] font-bold rounded-xl animate-pulse">
    <div className="h-6 bg-gray-200 rounded-md"></div>
  </div>
);

export default function PerformanceSection({ performanceData }: PerformanceSectionProps) {
  // Move all hooks before early return
  const [showChart, setShowChart] = useState(true); // Changed to true to show chart by default
  const [selectedView, setSelectedView] = useState<string>("cost"); // Changed to "cost" as default
  const [isLoading, setIsLoading] = useState(false); // Add loading state for buttons

  // Show skeleton while loading
  if (!performanceData) {
    return (
      <Suspense fallback={<div className="h-64 w-full bg-gray-100 animate-pulse" />}>
        <PerformanceSkeleton />
      </Suspense>
    );
  }

  // Static chart buttons (reverted from dynamic)
  const chartButtons = [
    { label: "Cost", value: "cost" },
    { label: "Carbon", value: "carbon" },
    { label: "Comfort", value: "comfort" },
    { label: "Compliance", value: "compliance" },
    { label: "Circularity", value: "circularity" }
  ];

  const handleButtonClick = async (value: string) => {
    // Prevent changing from cost or carbon view - always keep them selected
    if (value === "cost" || value === "carbon") {
      return;
    }
    
    setIsLoading(true);
    try {
      setSelectedView(value);
      setShowChart(true);
    } finally {
      // Add a small delay to show the loading state
      setTimeout(() => setIsLoading(false), 500);
    }
  }; 

  return (
    <section className="text-black py-[40px] z-[999]">
      <div className="container mx-auto px-[16px]">
        {/* Chart buttons - shown first */}
            {/* New section below buttons */}
            <div className="text-center mb-8">
          <div className="text-[24px] md:text-[28px] leading-[1.3] mb-[15px] font-bold">
            <p>{performanceData.mainTitle}</p>
          </div>

          <div className="space-y-6"> 
            <p className="text-black text-center max-w-[950px] mx-auto">
              {performanceData.description}
            </p>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-center gap-2 graph-btn">
            {chartButtons.map((button) => {
              // Show skeleton while loading for interactive buttons
              if (isLoading && (button.value === "comfort" || button.value === "compliance" || button.value === "circularity")) {
                return <ButtonSkeleton key={button.value} />;
              }

              // Use regular button for Cost and Carbon (no moving-border)
              if (button.value === "cost" || button.value === "carbon") {
                return (
                  <button
                    key={button.value}
                    className="px-4 py-2 text-[16px] font-bold bg-[#484AB7] text-white cursor-not-allowed opacity-90 rounded-xl transition-colors"
                  >
                    {button.label}
                  </button>
                );
              }
              
              // Use AnimatedButton for Comfort, Compliance, and Circularity
              if (button.value === "comfort" || button.value === "compliance" || button.value === "circularity") {
                const buttonConfig = {
                  comfort: { defaultText: "Comfort", hoverText: "Click to Assess" },
                  compliance: { defaultText: "Compliance", hoverText: "Click to Assess" },
                  circularity: { defaultText: "Circularity", hoverText: "Click to Assess" }
                };
                
                const config = buttonConfig[button.value as keyof typeof buttonConfig];
                
                return (
                  <AnimatedButton
                    key={button.value}
                    defaultText={config.defaultText}
                    hoverText={config.hoverText}
                    onClick={() => handleButtonClick(button.value)}
                    disabled={isLoading}
                    className={`${
                      selectedView === button.value
                        ? "bg-[#484AB7] text-white border border-[#484AB7] font-bold active"
                        : "bg-white text-black border border-gray-300 hover:bg-[#484AB7] hover:text-white active:bg-[#484AB7] active:text-white font-medium"
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                );
              }
              
              // Use moving-border Button for other buttons (fallback)
              return (
                <Button
                  key={button.value}
                  onClick={() => handleButtonClick(button.value)}
                  disabled={isLoading}
                  className={`px-4 py-2 text-[16px] font-bold transition-colors ${
                    selectedView === button.value
                      ? "bg-[#484AB7] text-white border border-[#484AB7] font-bold active"
                      : "bg-white text-black border border-gray-300 hover:bg-[#484AB7] hover:text-white active:bg-[#484AB7] active:text-white font-medium"
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{
                    fontSize: '12px',
                  }}
                >
                  {button.label}
                </Button>
              );
            })}
          </div>
        </div>

    
        {/* Chart section - shown when button is clicked */}
        {showChart && (
          <div className="mb-12">
            <ObservabilityChart selectedView={selectedView} />
          </div>
        )}
      </div>
    </section>
  );
}
