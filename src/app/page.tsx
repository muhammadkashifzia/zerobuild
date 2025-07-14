
// import FeaturedSection from "@/components/FeaturedSection";
import HeroSection from "@/components/HeroSection";
import FeaturedByYoutubers from "@/components/FeaturedYoutube";
import ObservabilityChart from '@/components/ObservabilityChart'
// import CtaSection from '@/components/CtaSection'
import { MapWorld } from "@/components/MapWorld";
import TestimonialCard from "@/components/TestimonialCard";
import Resources from "@/components/Resources";
// import WhyChooseUs from "@/components/WhyChooseUs";
import "./globals.css";
// import UpcomingWebinar from "@/components/UpcomingWebinar";
// import GeminiEffect from "@/components/GeminiEffect";
// import Instructor from "@/components/Instructor";

import PerformanceSection from "@/components/PerformanceSection";
export default function Home() {
  return (
    <main className="min-h-screen  antialiased hide-scrollbar">
      <HeroSection />
          <PerformanceSection />
               <ObservabilityChart />
                   <Resources/>
      <FeaturedByYoutubers />
  
      {/* <CtaSection /> */}
     <MapWorld />


      {/* <FeaturedSection /> */}
      {/* <WhyChooseUs /> */}
      <TestimonialCard />
      {/* <UpcomingWebinar /> */}
      {/* <GeminiEffect /> */}
      {/* <Instructor /> */}
    
    </main>
  );
}
