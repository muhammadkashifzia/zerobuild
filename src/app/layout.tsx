import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/providers";
import CookieBanner from '@/components/CookieBanner';
export const metadata: Metadata = {
  title: "ZeroBuild - Accelerating Net Zero Decarbonisation in the Built Environment",
  description: "ZeroBuild accelerates the decarbonisation of the built environment by empowering architects, engineers, developers, local authorities, and housing associations to achieve Net Zero faster. Our proprietary analytics and data-driven tools simplify Whole Life Carbon assessments, dynamic energy modelling, and lifecycle cost-benefit analysis.",
  keywords: "Net Zero, decarbonisation, built environment, sustainability, carbon assessment, energy modelling, retrofit, new build, architects, engineers, developers, local authorities, housing associations, Whole Life Carbon, building performance, sustainability consultancy, UK decarbonisation, Net Zero 2030, Net Zero 2050, Greater Manchester, GMCA, SHDF, PSDS, ESG compliance",
  authors: [{ name: "ZeroBuild" }],
  creator: "ZeroBuild",
  publisher: "ZeroBuild",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://zerobuild.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ZeroBuild - Accelerating Net Zero Decarbonisation in the Built Environment",
    description: "Empowering architects, engineers, developers, and local authorities to achieve Net Zero faster with proprietary analytics and data-driven tools for Whole Life Carbon assessments and energy modelling.",
    url: 'https://zerobuild.io',
    siteName: 'ZeroBuild',
    images: [
      {
        url: '/assets/images/5CZLogo.png',
        width: 1200,
        height: 630,
        alt: 'ZeroBuild - Net Zero Decarbonisation Solutions',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ZeroBuild - Accelerating Net Zero Decarbonisation",
    description: "Empowering the built environment to achieve Net Zero faster with data-driven sustainability solutions.",
    images: ['/assets/images/5CZLogo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="darks" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <div className="relative w-full flex items-center justify-center">
            <Navbar />
          </div>
          {children}
           <CookieBanner />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
