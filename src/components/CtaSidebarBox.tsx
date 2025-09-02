"use client";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getServicesCTABox } from "@/sanity/sanity-utils";
import { CtaBox } from "@/types/Service";
import Link from "next/link";

export default function CtaBoxSection() {
  const [cta, setCta] = useState<CtaBox | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCta = async () => {
      try {
        setLoading(true);
        setError(null);

        const ctaArray = await getServicesCTABox();

        if (Array.isArray(ctaArray) && ctaArray.length > 0) {
          setCta(ctaArray[0]);
        } else {
          setCta(null);
          setError("No CTA content available");
        }
      } catch (err) {
        console.error("Failed to fetch CTA data:", err);
        setError("Failed to load CTA content");
        setCta(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCta();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="rounded-[.75rem] border border-[#e0e0e0] p-[2rem] sticky top-[90px] animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-6 w-full"></div>
        <div className="h-[50px] bg-gray-200 rounded-xl w-[150px]"></div>
      </div>
    );
  }

  // Error state or no CTA available
  if (error || !cta) {
    return null; // Gracefully hide the component if no content is available
  }

  return (
    <div>
      <div className="rounded-[.75rem] border border-[#e0e0e0] p-[2rem] sticky top-[90px] bg-white shadow-sm">
        {/* Dynamic Title */}
        <h3 className="text-[22px] font-semibold mb-2 text-black">
          {cta?.ctaTitle || "Get Started"}
        </h3>

        {/* Dynamic CTA Button */}
        <Link
          href={cta?.ctaButtonLink}
          className="relative w-full bg-[#484AB7] text-white p-5 rounded-xl max-w-[200px] h-[50px] flex items-center text-lg font-semibold hover:bg-[#3c3f9d] transition-colors duration-200 mt-[2rem] group"
          aria-label={`${cta.ctaButtonText} - Navigate to ${cta.ctaButtonLink || "contact page"}`}
        >
          <span className="flex-1 text-left">
            {cta?.ctaButtonText}
          </span>
          <span className="absolute right-[15px] transition-transform duration-200 group-hover:translate-x-1">
            <ArrowRight className="w-5 h-5" />
          </span>
        </Link>

      </div>
    </div>
  );
}
