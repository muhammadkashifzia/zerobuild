import React from "react";
import TestimonialCard from "@/components/TestimonialCard";
import AboutProfile from "@/components/about/aboutProfile";
import ObservabilityRadarChart from "@/components/ObservabilityRadarChart";
function page() {
  return (
    <div className="min-h-screen  py-12 pt-36">
      <ObservabilityRadarChart />
    <AboutProfile />
    <TestimonialCard />
    </div>
  );
}

export default page;
