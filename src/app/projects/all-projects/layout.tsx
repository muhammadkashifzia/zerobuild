import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All ZeroBuild Projects - Complete Net Zero Decarbonisation Portfolio | All Projects",
  description: "Browse ZeroBuild's complete portfolio of Net Zero decarbonisation projects. From metro systems to concert halls, water utilities to wind farms, discover our comprehensive range of sustainability and infrastructure projects shaping a better world.",
  keywords: "all ZeroBuild projects, complete project portfolio, Net Zero decarbonisation projects, sustainability projects, infrastructure projects, metro system projects, concert hall projects, water utility projects, wind farm projects, built environment projects, retrofit projects, new build projects, carbon reduction projects, energy efficiency projects, architect sustainability projects, engineer decarbonisation projects, developer Net Zero projects, local authority sustainability projects, housing association decarbonisation projects, UK sustainability projects, Greater Manchester projects, SHDF projects, PSDS projects, ESG compliance projects, building performance projects, Whole Life Carbon projects",
  alternates: {
    canonical: '/projects/all-projects',
  },
  openGraph: {
    title: "All ZeroBuild Projects - Complete Net Zero Decarbonisation Portfolio",
    description: "Explore our complete portfolio of sustainability and infrastructure projects. From metro systems to wind farms, see how we're shaping a better world through Net Zero decarbonisation.",
    url: 'https://zerobuild.io/projects/all-projects',
    siteName: 'ZeroBuild',
    images: [
      {
        url: '/assets/images/coding-background-texture.jpg',
        width: 1200,
        height: 630,
        alt: 'All ZeroBuild Projects - Complete Net Zero Decarbonisation Portfolio',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "All ZeroBuild Projects - Complete Net Zero Decarbonisation Portfolio",
    description: "Browse our complete portfolio of sustainability and infrastructure projects shaping a better world.",
    images: ['/assets/images/coding-background-texture.jpg'],
  },
};

export default function AllProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 