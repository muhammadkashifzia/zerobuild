import React from "react";
import TestimonialCard from "@/components/TestimonialCard";
import AboutProfile from "@/components/about/aboutProfile";
import ObservabilityRadarChart from "@/components/ObservabilityRadarChart";
import AboutTop from "@/components/about/aboutTop";
import CtaSection from "@/components/CtaSection"
import type { Metadata } from "next";
import { getAbout } from "@/sanity/sanity-utils";
import { AboutPage } from "@/types/aboutPage";

// Force dynamic rendering - CRITICAL for production updates
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

// Disable static optimization
export const runtime = 'nodejs';

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
  const pageStartTime = Date.now();
  
  try {
    console.log('🚀 [AboutPage] Starting page render...');
    console.log('🌍 [AboutPage] Environment:', process.env.NODE_ENV);
    console.log('⚡ [AboutPage] Dynamic rendering:', 'force-dynamic');
    
    // Call the getAbout function directly and handle the array response
    const aboutPageArray: AboutPage[] = await getAbout();
    const aboutPageData: AboutPage | null = aboutPageArray?.[0] || null;

    const pageLoadTime = Date.now() - pageStartTime;

    console.log('📊 [AboutPage] Page data summary:', {
      hasData: !!aboutPageData,
      dataFields: aboutPageData ? Object.keys(aboutPageData).length : 0,
      lastUpdated: aboutPageData?._updatedAt,
      pageLoadTime: `${pageLoadTime}ms`,
      timestamp: new Date().toISOString()
    });

    // Show warning if no data found
    if (!aboutPageData) {
      console.warn('⚠️ [AboutPage] No about data found - page will render with empty props');
    }

    // Generate a unique render ID for debugging
    const renderId = Math.random().toString(36).substr(2, 9);
    
    return (
      <div className="min-h-screen py-12 pt-[4rem] md:pt-[4rem]">
        {/* Debug info - only visible in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 bg-gray-900 text-white text-xs p-3 rounded-lg shadow-lg z-50 max-w-xs">
            <div className="font-semibold mb-2">Debug Info</div>
            <div>Render ID: {renderId}</div>
            <div>Load Time: {pageLoadTime}ms</div>
            <div>Has Data: {aboutPageData ? '✅' : '❌'}</div>
            <div>Updated: {aboutPageData?._updatedAt ? new Date(aboutPageData._updatedAt).toLocaleTimeString() : 'N/A'}</div>
            <div>Fetched: {new Date().toLocaleTimeString()}</div>
          </div>
        )}
        
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
    
  } catch (error) {
    const pageLoadTime = Date.now() - pageStartTime;
    
    console.error('❌ [AboutPage] Page render error:', {
      error: error instanceof Error ? error.message : error,
      pageLoadTime: `${pageLoadTime}ms`,
      timestamp: new Date().toISOString()
    });
    
    // In production, you might want to show a fallback UI
    if (process.env.NODE_ENV === 'production') {
      // Render page with empty data as fallback
      return (
        <div className="min-h-screen py-12 pt-[4rem] md:pt-[4rem]">
          <AboutTop />
          <ObservabilityRadarChart 
            newBuildButtonText={undefined}
            retrofitButtonText={undefined}
            mainHeading={undefined}
            newBuildIntroText={undefined}
            newBuildSummaryText={undefined}
            newBuildResultText={undefined}
            newBuildResultCta={undefined}
            retrofitIntroText={undefined}
            retrofitContent={undefined}
            retrofitSlider={undefined}
            retrofitResultText={undefined}
            retrofitButtonUrl={undefined}
          />
          <AboutProfile 
            profileImage={undefined}
            name={undefined}
            title={undefined}
            bio={undefined}
            contactButtonText={undefined}
            contactButtonUrl={undefined}
            linkedinUrl={undefined}
            linkedinButtonText={undefined}
          />
          <TestimonialCard />
          <CtaSection />
        </div>
      );
    }
    
    // Re-throw in development to see the error
    throw error;
  }
}

export default page;