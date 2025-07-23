// import FeaturedSection from "@/components/FeaturedSection";
import HeroSection from "../components/HeroSection";
import FeaturedByYoutubers from "../components/FeaturedYoutube";
import ObservabilityChart from "../components/ObservabilityChart";
// import CtaSection from '../components/CtaSection'
import { MapWorld } from "../components/MapWorld";
import ServiceSection from "../components/ServiceSection" 
import TestimonialCard from "../components/TestimonialCard";
import Resources from "../components/Resources";
// import WhyChooseUs from "../components/WhyChooseUs";

// import UpcomingWebinar from "../components/UpcomingWebinar";
// import GeminiEffect from "../components/GeminiEffect";
// import Instructor from "../components/Instructor";
import Image from "next/image";
import PerformanceSection from "../components/PerformanceSection";
export default function Home() {
  return (
    <main className="min-h-screen  antialiased hide-scrollbar relative">
       <Image src="/assets/svg/pattern-svg-revert.svg" alt="pattenLeft" width={1000} height={1000} className="absolute top-[65px] left-[0px] w-[890px] h-auto object-cover"/>
      <Image src="/assets/svg/pattern-svg.svg" alt="pattenRight" width={1000} height={1000} className="absolute top-[65px] right-[0px] w-[890px] h-auto object-cover"/>
      <HeroSection />
      <PerformanceSection />
      <ObservabilityChart />
      <ServiceSection />
      <Resources />
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
