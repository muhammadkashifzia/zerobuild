import React from "react";
import TestimonialCard from "@/components/TestimonialCard";
import AboutProfile from "@/components/about/aboutProfile";
import ObservabilityRadarChart from "@/components/ObservabilityRadarChart";
import AboutTop from "@/components/about/aboutTop";
import CtaSection from "@/components/CtaSection"
import type { Metadata } from "next";
import { getAbout } from "@/sanity/sanity-utils";
import { AboutPage } from "@/types/aboutPage";

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

async function page() {
  // Call the getAbout function directly and handle the array response
  const aboutPageArray: AboutPage[] = await getAbout();
  const aboutPageData: AboutPage | null = aboutPageArray?.[0] || null;
 
  // Debug logging to check what data is being fetched
  console.log('About page data:', aboutPageData);

  return (
    <div className="min-h-screen py-12 pt-[4rem] md:pt-[4rem]">
      <AboutTop />
      <ObservabilityRadarChart 
        newBuildButtonText={aboutPageData?.newBuildButtonText}
        retrofitButtonText={aboutPageData?.retrofitSelectorButtonText}
        mainHeading={aboutPageData?.mainHeading}
        newBuildIntroText={aboutPageData?.newBuildIntroText}
        newBuildSummaryText={aboutPageData?.newBuildSummaryText}
        newBuildResultText={aboutPageData?.newBuildResultText}
        newBuildResultCta={aboutPageData?.newBuildResultCta}
        retrofitIntroText={aboutPageData?.retrofitIntroText}
        retrofitContent={aboutPageData?.retrofitContent}
        retrofitSlider={aboutPageData?.retrofitSlider}
        retrofitResultText={aboutPageData?.retrofitResultText}
        retrofitButtonUrl={aboutPageData?.retrofitButtonUrl}
      />
      <AboutProfile 
        profileImage={aboutPageData?.profileImage}
        name={aboutPageData?.profileName}
        title={aboutPageData?.profileTitle}
        bio={aboutPageData?.profileBio}
        contactButtonText={aboutPageData?.contactButtonText}
        contactButtonUrl={aboutPageData?.contactButtonUrl}
        linkedinUrl={aboutPageData?.linkedinUrl}
        linkedinButtonText={aboutPageData?.linkedinButtonText}
      />
      <TestimonialCard />
      <CtaSection />
    </div>
  );
}

export default page;