"use client";

import { useState } from "react";
import ObservabilityChart from "./ObservabilityChart";
import { Button } from "./ui/moving-border";
export default function PerformanceSection() {
  const [showChart, setShowChart] = useState(true);
  const [selectedViews, setSelectedViews] = useState<string[]>(["cost", "carbon"]); // Array to support multiple selections

  const chartButtons = [
    { label: "Cost", value: "cost" },
    { label: "Carbon", value: "carbon" },
    { label: "Comfort", value: "comfort" },
    { label: "Compliance", value: "compliance" },
    { label: "Circularity", value: "circularity" }
  ];

  const handleButtonClick = (value: string) => {
    setSelectedViews(prev => {
      if (prev.includes(value)) {
        // If already selected, remove it (but keep at least one selected)
        if (prev.length > 1) {
          return prev.filter(v => v !== value);
        }
        return prev;
      } else {
        // If not selected, add it
        return [...prev, value];
      }
    });
    setShowChart(true);
  };

  // Get the primary view for the chart (first selected view)
  const primaryView = selectedViews[0] || "cost";

  return (
    <section className="text-black py-[40px] ">
      <div className="max-w-[1150px] mx-auto px-[16px]">
        {/* Chart buttons - shown first */}
        <div className="text-center mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-center gap-2">
            {chartButtons.map((button) => (
              <Button
                key={button.value}
                onClick={() => handleButtonClick(button.value)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  selectedViews.includes(button.value)
                    ? "bg-[#484AB7] text-[#ffffff]"
                    : "bg-white text-[#444444] hover:bg-[#484AB7] hover:text-white"
                }`}
                style={{
                  fontSize: '12px',
                }}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>

        {/* New section below buttons */}
        <div className="text-center mb-12">
          <div className="text-[28px] leading-[1.3] mb-[15px] font-bold">
            <p>Explore how our client used our Five C Zero Framework to evaluate 1000+ design options in under 24 hours, unlocking smarter decisions from day one..</p>
          </div>

          <div className="space-y-6"> 
            <p className="text-black text-center">
              Choose what matters most and let us the rest. Whether new build or retrofit, we help you prioritise what drives your project: 
              Compliance, Comfort, Cost. Carbon. Circularity. 
              Designing a whole life Net Zero option has never been easier.
            </p>
          </div>
        </div>

        {/* Chart section - shown when button is clicked */}
        {showChart && (
          <div className="mb-12">
            <ObservabilityChart selectedView={primaryView} />
          </div>
        )}
      </div>
    </section>
  );
}
