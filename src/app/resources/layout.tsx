import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZeroBuild Resources - Net Zero Knowledge Hub | Guides, Tools, Case Studies",
  description: "Explore ZeroBuild's Net Zero decarbonisation knowledge hub: guidance, tools, templates, research and case studies for the built environment.",
  keywords: "ZeroBuild resources, Net Zero resources, sustainability guides, retrofit resources, Whole Life Carbon guides, energy modelling tools, case studies, templates, best practices, built environment knowledge hub",
  alternates: {
    canonical: '/resources',
  },
  openGraph: {
    title: "ZeroBuild Resources - Net Zero Knowledge Hub",
    description: "Guides, tools, templates and case studies for Net Zero in the built environment.",
    url: 'https://zerobuild.io/resources',
    siteName: 'ZeroBuild',
    images: [
      {
        url: '/assets/images/coding-background-texture.jpg',
        width: 1200,
        height: 630,
        alt: 'ZeroBuild Resources - Net Zero Knowledge Hub',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ZeroBuild Resources - Net Zero Knowledge Hub",
    description: "Guides, tools and case studies for decarbonising the built environment.",
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