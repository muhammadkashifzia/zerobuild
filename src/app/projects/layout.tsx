import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZeroBuild Projects - Net Zero Decarbonisation Case Studies | Portfolio",
  description: "Explore ZeroBuild's successful Net Zero decarbonisation projects and case studies. From metro systems to concert halls, our sustainability projects demonstrate how we help architects, engineers, developers, and local authorities achieve their decarbonisation goals.",
  keywords: "ZeroBuild projects, Net Zero decarbonisation case studies, sustainability projects, built environment case studies, retrofit projects, new build projects, carbon reduction projects, energy efficiency projects, architect sustainability projects, engineer decarbonisation projects, developer Net Zero projects, local authority sustainability projects, housing association decarbonisation projects, Whole Life Carbon projects, building performance projects, metro system sustainability, concert hall decarbonisation, UK sustainability projects, Greater Manchester projects, SHDF projects, PSDS projects, ESG compliance projects",
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: "ZeroBuild Projects - Net Zero Decarbonisation Case Studies",
    description: "Discover how ZeroBuild is transforming the built environment through successful Net Zero decarbonisation projects. From metro systems to concert halls, see our impact in action.",
    url: 'https://zerobuild.io/projects',
    siteName: 'ZeroBuild',
    images: [
      {
        url: '/assets/images/coding-background-texture.jpg',
        width: 1200,
        height: 630,
        alt: 'ZeroBuild Projects - Net Zero Decarbonisation Case Studies',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ZeroBuild Projects - Net Zero Decarbonisation Case Studies",
    description: "Explore our successful sustainability projects and see how we're accelerating Net Zero decarbonisation in the built environment.",
    images: ['/assets/images/coding-background-texture.jpg'],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 