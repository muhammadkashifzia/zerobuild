import React from "react";
import TestimonialCard from "@/components/TestimonialCard";
import AboutProfile from "@/components/about/aboutProfile";
import ObservabilityRadarChart from "@/components/ObservabilityRadarChart";
import AboutTop from "@/components/about/aboutTop";
function page() {
  return (
    <div className="min-h-screen  py-12 pt-24 md:pt-[4rem]">
      <AboutTop />
      <ObservabilityRadarChart />
    <AboutProfile />
    <TestimonialCard />
    </div>
  );
}

export default page;
