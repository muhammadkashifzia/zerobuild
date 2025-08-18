import React from "react";
import TestimonialCard from "@/components/TestimonialCard";
import AboutProfile from "@/components/about/AboutProfile";
import ObservabilityRadarChart from "@/components/ObservabilityRadarChart";
import AboutTop from "@/components/about/AboutTop";
import AboutCta from "@/components/about/AboutCta"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ZeroBuild - Net Zero Decarbonisation Experts | Company Overview",
  description: "Since launching in August 2024, ZeroBuild (formerly 5C Zero) has established a validated business model, secured key industry partnerships, and delivered high-impact consultancy services. We have successfully demonstrated our value to initial clients, proving our proprietary modelling accelerators substantially reduce planning time and streamline decision-making for retrofit and new-build projects.",
  keywords: "ZeroBuild company, 5C Zero, Net Zero decarbonisation experts, sustainability consultancy, built environment specialists, retrofit planning, new build design, carbon modelling accelerators, UK sustainability market, Greater Manchester decarbonisation, housing association partnerships, local authority sustainability, developer Net Zero solutions, architect sustainability support, engineer decarbonisation tools, validated business model, industry partnerships, high-impact consultancy, planning time reduction, decision-making tools, building portfolio optimisation",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: "About ZeroBuild - Net Zero Decarbonisation Experts",
    description: "Learn about ZeroBuild's journey from 5C Zero to becoming a leading Net Zero decarbonisation partner, delivering high-impact consultancy services and proprietary modelling accelerators.",
    url: 'https://zerobuild.io/about',
    siteName: 'ZeroBuild',
    images: [
      {
        url: '/assets/images/about-image.png',
        width: 1200,
        height: 630,
        alt: 'ZeroBuild Team - Net Zero Decarbonisation Experts',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "About ZeroBuild - Net Zero Decarbonisation Experts",
    description: "Discover how ZeroBuild is accelerating the decarbonisation of the built environment with innovative solutions and proven expertise.",
    images: ['/assets/images/about-image.png'],
  },
};

function page() {
  return (
    <div className="min-h-screen  py-12 pt-24 md:pt-[4rem]">
      <AboutTop />
      <ObservabilityRadarChart />
    <AboutProfile />
    <TestimonialCard />
    <AboutCta />
    </div>
  );
}

export default page;
