// import FeaturedSection from "@/components/FeaturedSection";
import HeroSection from "@/components/HeroSection";
import FeaturedByYoutubers from "@/components/FeaturedYoutube";
// import TestimonialCard from "@/components/TestimonialCard";
// import WhyChooseUs from "@/components/WhyChooseUs";
import "./globals.css";
// import UpcomingWebinar from "@/components/UpcomingWebinar";
// import GeminiEffect from "@/components/GeminiEffect";
// import Instructor from "@/components/Instructor";
import Footer from "@/components/Footer";
import PerformanceSection from "@/components/PerformanceSection";
export default function Home() {
  return (
    <main className="min-h-screen  antialiased hide-scrollbar">
      <HeroSection />
          <PerformanceSection />
      <FeaturedByYoutubers />

      {/* <FeaturedSection />
      <WhyChooseUs />
      <TestimonialCard />
      <UpcomingWebinar />
      <GeminiEffect />
      <Instructor /> */}
      <Footer />
    </main>
  );
}
