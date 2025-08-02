import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZeroBuild Resources - Net Zero Decarbonisation Knowledge Hub | Resources",
  description: "Access ZeroBuild's comprehensive resources on Net Zero decarbonisation. From guides and tools to insights and best practices, our knowledge hub helps architects, engineers, developers, and local authorities accelerate their sustainability journey.",
  keywords: "ZeroBuild resources, Net Zero decarbonisation resources, sustainability knowledge hub, built environment resources, carbon assessment guides, energy modelling tools, retrofit resources, new build resources, sustainability best practices, architect sustainability resources, engineer decarbonisation resources, developer Net Zero resources, local authority sustainability resources, housing association decarbonisation resources, Whole Life Carbon resources, building performance resources, procurement guides, funding application resources, SHDF resources, PSDS resources, ESG compliance resources, sustainability insights, decarbonisation tools, building sustainability guides",
  alternates: {
    canonical: '/resources',
  },
  openGraph: {
    title: "ZeroBuild Resources - Net Zero Decarbonisation Knowledge Hub",
    description: "Access comprehensive resources on Net Zero decarbonisation. Our knowledge hub provides guides, tools, and insights to accelerate your sustainability journey.",
    url: 'https://zerobuild.io/resources',
    siteName: 'ZeroBuild',
    images: [
      {
        url: '/assets/images/coding-background-texture.jpg',
        width: 1200,
        height: 630,
        alt: 'ZeroBuild Resources - Net Zero Decarbonisation Knowledge Hub',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ZeroBuild Resources - Net Zero Decarbonisation Knowledge Hub",
    description: "Access comprehensive sustainability resources and tools to accelerate your Net Zero decarbonisation journey.",
    images: ['/assets/images/coding-background-texture.jpg'],
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 