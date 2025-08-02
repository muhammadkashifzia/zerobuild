import HeroSection from "@/components/HeroSection";
import FeaturedByYoutubers from "@/components/FeaturedYoutube";
import CtaSection from '@/components/CtaSection'
import { MapWorld } from "@/components/MapWorld";
import ServiceSection from "@/components/ServiceSection" 
import TestimonialCard from "@/components/TestimonialCard";
import Image from "next/image";
import PerformanceSection from "@/components/PerformanceSection";

export default function Home() {
  return (
    <main className="min-h-screen  antialiased hide-scrollbar relative bg-[#fafafa]">
       <Image src="/assets/svg/pattern-svg-revert.svg" alt="pattenLeft" width={1000} height={1000} className="absolute top-[65px] left-[0px] w-[890px] h-auto object-cover"/>
      <Image src="/assets/svg/pattern-svg.svg" alt="pattenRight" width={1000} height={1000} className="absolute top-[65px] right-[0px] w-[890px] h-auto object-cover"/>
      <HeroSection />
      <PerformanceSection />
      <ServiceSection />
      <FeaturedByYoutubers />
      <CtaSection />
      <MapWorld />
      <TestimonialCard />
    </main>
  );
}
