import HeroSection from "@/components/HeroSection";
import FeaturedByYoutubers from "@/components/FeaturedYoutube";
import CtaSection from '@/components/CtaSection'
import { MapWorld } from "@/components/MapWorld";
import ServiceSection from "@/components/ServiceSection" 
import TestimonialCard from "@/components/TestimonialCard";
import Image from "next/image";
import PerformanceSection from "@/components/PerformanceSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZeroBuild - Accelerating Net Zero Decarbonisation | Home",
  description: "ZeroBuild accelerates the decarbonisation of the built environment by empowering architects, engineers, developers, local authorities, and housing associations to achieve Net Zero faster. Our proprietary analytics and data-driven tools simplify Whole Life Carbon assessments, dynamic energy modelling, and lifecycle cost-benefit analysis—enabling quicker, clearer decisions that optimise sustainability, affordability, and compliance across diverse building portfolios.",
  keywords: "Net Zero decarbonisation, built environment sustainability, Whole Life Carbon assessment, energy modelling, retrofit solutions, new build design, architects sustainability, engineers decarbonisation, developers Net Zero, local authorities sustainability, housing associations decarbonisation, UK built environment, carbon analytics, building performance, sustainability consultancy, Net Zero 2030, Net Zero 2050, Greater Manchester, GMCA retrofit, SHDF funding, PSDS funding, ESG compliance, procurement support",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ZeroBuild - Accelerating Net Zero Decarbonisation | Home",
    description: "Empowering the built environment to achieve Net Zero faster with proprietary analytics and data-driven tools for Whole Life Carbon assessments and energy modelling.",
    url: 'https://zerobuild.io',
    siteName: 'ZeroBuild',
    images: [
      {
        url: '/assets/images/5CZLogo.png',
        width: 1200,
        height: 630,
        alt: 'ZeroBuild - Leading Net Zero Decarbonisation Solutions',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ZeroBuild - Accelerating Net Zero Decarbonisation",
    description: "Empowering architects, engineers, developers, and local authorities to achieve Net Zero faster with data-driven sustainability solutions.",
    images: ['/assets/images/5CZLogo.png'],
  },
};

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
