import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZeroBuild Services - Net Zero Decarbonisation Solutions | Built Environment Services",
  description: "Explore ZeroBuild's comprehensive Net Zero decarbonisation services for the built environment. From Whole Life Carbon assessments and energy modelling to retrofit planning and new build design, we offer tailored solutions for architects, engineers, developers, local authorities, and housing associations.",
  keywords: "ZeroBuild services, Net Zero decarbonisation services, built environment services, Whole Life Carbon assessment, energy modelling services, retrofit planning, new build design, sustainability consultancy services, carbon analytics, building performance services, procurement support services, funding application support, SHDF services, PSDS services, ESG compliance services, architect sustainability services, engineer decarbonisation services, developer Net Zero services, local authority sustainability services, housing association decarbonisation services, digital twins, building performance evaluation, post-occupancy monitoring, lifecycle assessment, circularity assessments, carbon cost comparison, daylight analysis, IAQ analysis",
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: "ZeroBuild Services - Net Zero Decarbonisation Solutions",
    description: "Comprehensive Net Zero decarbonisation services for the built environment. From carbon assessments to energy modelling, we help architects, engineers, developers, and local authorities achieve their sustainability goals.",
    url: 'https://zerobuild.io/services',
    siteName: 'ZeroBuild',
    images: [
      {
        url: '/assets/images/coding-background-texture.jpg',
        width: 1200,
        height: 630,
        alt: 'ZeroBuild Services - Net Zero Decarbonisation Solutions',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ZeroBuild Services - Net Zero Decarbonisation Solutions",
    description: "Comprehensive sustainability services for the built environment. Explore our range of Net Zero decarbonisation solutions.",
    images: ['/assets/images/coding-background-texture.jpg'],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 