import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact ZeroBuild - Get Net Zero Decarbonisation Support | Contact Us",
  description: "Contact ZeroBuild for expert Net Zero decarbonisation support. Whether you're an architect, engineer, developer, local authority, or housing association, our team is ready to help you achieve your sustainability goals with our proprietary analytics and data-driven tools.",
  keywords: "contact ZeroBuild, Net Zero decarbonisation support, sustainability consultancy contact, architect sustainability help, engineer decarbonisation support, developer Net Zero assistance, local authority sustainability contact, housing association decarbonisation help, retrofit planning support, new build design consultation, Whole Life Carbon assessment, energy modelling services, procurement support, funding applications, SHDF support, PSDS assistance, ESG compliance help, sustainability partnership, decarbonisation consultation",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact ZeroBuild - Get Net Zero Decarbonisation Support",
    description: "Get in touch with ZeroBuild for expert Net Zero decarbonisation support. Our team is ready to help architects, engineers, developers, and local authorities achieve their sustainability goals.",
    url: 'https://zerobuild.io/contact',
    siteName: 'ZeroBuild',
    images: [
      {
        url: '/assets/images/UpdatedMap.png',
        width: 1200,
        height: 630,
        alt: 'Contact ZeroBuild - Net Zero Decarbonisation Support',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact ZeroBuild - Get Net Zero Decarbonisation Support",
    description: "Connect with ZeroBuild for expert sustainability solutions and Net Zero decarbonisation support.",
    images: ['/assets/images/UpdatedMap.png'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 