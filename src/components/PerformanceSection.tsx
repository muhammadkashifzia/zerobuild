"use client";

import { useState } from "react";
import ObservabilityChart from "./ObservabilityChart";
import { Button } from "./ui/moving-border";
export default function PerformanceSection() {
  const [showChart, setShowChart] = useState(true); // Changed to true to show chart by default
  const [selectedView, setSelectedView] = useState<string>("cost"); // Changed to "cost" as default

  const chartButtons = [
    { label: "Cost", value: "cost" },
    { label: "Carbon", value: "carbon" },
    { label: "Comfort", value: "comfort" },
    { label: "Compliance", value: "compliance" },
    { label: "Circularity", value: "circularity" }
  ];

  const handleButtonClick = (value: string) => {
    // Prevent changing from cost or carbon view - always keep them selected
    if (value === "cost" || value === "carbon") {
      return;
    }
    setSelectedView(value);
    setShowChart(true);
  };

  return (
    <section className="text-black py-[40px] ">
      <div className="container mx-auto px-[16px]">
        {/* Chart buttons - shown first */}
            {/* New section below buttons */}
            <div className="text-center mb-8">
          <div className="text-[24px] md:text-[28px] leading-[1.3] mb-[15px] font-bold">
            <p> Designing a whole life Net Zero option has never been easier. Explore how our client used our Five C Zero Framework to evaluate 1000+ design options in under 24 hours, unlocking smarter decisions from day one..</p>
          </div>

          <div className="space-y-6"> 
            <p className="text-black text-center">
              Choose what matters most and let us the rest. Whether new build or retrofit, we help you prioritise what drives your project: 
              Compliance, Comfort, Cost. Carbon. Circularity. 
             
            </p>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-center gap-2 graph-btn">
            {chartButtons.map((button) => {
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
              
              // Use moving-border Button for other buttons
              return (
                <Button
                  key={button.value}
                  onClick={() => handleButtonClick(button.value)}
                  className={`px-4 py-2 text-[16px] font-boldtransition-colors ${
                    selectedView === button.value
                      ? "bg-[#484AB7] text-white border border-[#484AB7] font-bold active"
                      : "bg-white text-black border border-gray-300 hover:bg-[#484AB7] hover:text-white active:bg-[#484AB7] active:text-white font-medium"
                  }`}
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
