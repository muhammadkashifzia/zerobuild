"use client";

import React, { useState, useEffect } from "react";
import { Search, ArrowRight, Plus, X, Circle, Minus } from "lucide-react";
import Link from "next/link";
import { getResources, getResourcesPageBanner } from "@/sanity/sanity-utils";
import { Resource } from "@/types/Resource";
import { ResourcesPageBanner } from "@/types/resourcesPage";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import CtaSection from "@/components/CtaSection";

const ResourcePage = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [bannerData, setBannerData] = useState<ResourcesPageBanner | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("All");
  const [selectedFocusArea, setSelectedFocusArea] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState<"purpose" | "focusArea">("purpose");
  const [filterSearch, setFilterSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [res, banner] = await Promise.all([getResources(), getResourcesPageBanner()]);
      setResources(res);
      setBannerData(banner);

      console.log('All purposes:', Array.from(new Set(res.flatMap((r) => r.purpose || []))));
      console.log('All focus areas:', Array.from(new Set(res.flatMap((r) => r.focusArea || []))));
    };
    fetchData();
  }, []);

  // Purpose
  const allPurposes = Array.from(new Set(resources.flatMap((r) => r.purpose || []))).sort();
  const fallbackPurposes = [
    "Guidance", "Case Study", "Tool", "Checklist", "Template", "Best Practice", "Research", "Policy"
  ];
  const displayPurposes = allPurposes.length > 0 ? allPurposes : fallbackPurposes;
  const purposeCount: Record<string, number> = {};
  resources.forEach((r) => (r.purpose || []).forEach((p) => purposeCount[p] = (purposeCount[p] || 0) + 1));
  if (allPurposes.length === 0) fallbackPurposes.forEach((p) => (purposeCount[p] = 0));
  const mainPurposeFilters = Object.entries(purposeCount).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name]) => name);

  // Focus Area
  const allFocusAreas = Array.from(new Set(resources.flatMap((r) => r.focusArea || []))).sort();
  const fallbackFocusAreas = [
    "Net Zero", "Retrofit", "New Build", "Energy", "Carbon", "Health & Wellbeing", "Circular Economy", "Biodiversity"
  ];
  const displayFocusAreas = allFocusAreas.length > 0 ? allFocusAreas : fallbackFocusAreas;
  const focusAreaCount: Record<string, number> = {};
  resources.forEach((r) => (r.focusArea || []).forEach((f) => focusAreaCount[f] = (focusAreaCount[f] || 0) + 1));
  if (allFocusAreas.length === 0) fallbackFocusAreas.forEach((f) => (focusAreaCount[f] = 0));

  // Filtering
  const filteredResources = resources.filter((resource) => {
    const matchesSearch = searchTerm === "" || resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPurpose = selectedPurpose === "All" || resource.purpose?.includes(selectedPurpose);
    const matchesFocusArea = selectedFocusArea === "All" || resource.focusArea?.includes(selectedFocusArea);
    return matchesSearch && matchesPurpose && matchesFocusArea;
  });

  const clearFilters = () => {
    setSelectedPurpose("All");
    setSelectedFocusArea("All");
    setSearchTerm("");
  };

  // Banner fallback
  const fallbackBanner = {
    title: "Explore our resources across the built and natural environments",
    description: "We offer a wide range of resources that address every priority in the built and natural environments. Search below or use the filters to explore resources by purpose and focus area."
  };
  const bannerTitle = bannerData?.title || fallbackBanner.title;
  const bannerDescription = bannerData?.description || fallbackBanner.description;

  return (
    <div className="min-h-screen bg-white mt-[64px]">
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="container mx-auto relative flex flex-col gap-4 px-4"
        >
          <div className="max-w-[1024px]">
            <div className="text-3xl md:text-6xl font-normal text-black leading-[1.2] max-w-[1000px]">{bannerTitle}</div>
            <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4 max-w-[1024px]">{bannerDescription}</div>
          </div>
        </motion.div>
      </AuroraBackground>

      <div className="mt-[24px] md:mt-[60px] pt-0 md:pt-8 pb-[20px] md:pb-10 md:px-8 px-4">
        {/* Search Bar */}
        <section className="container mx-auto">
          <div className="pb-10 border-b mb-6">
            <div className="relative max-w-[832px]">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pr-16 pl-6 py-4 border border-[#757575] focus:ring-1 rounded-full text-black bg-white h-[56px] md:h-[76px] text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => {}}
                className="absolute rotate-90 right-6 top-1/2 -translate-y-1/2 text-black"
              >
                <Search />
              </button>
            </div>
          </div>
        </section>

        {/* Desktop Filters */}
        <section className="container mx-auto mb-6 hidden md:block">
          {/* Purpose Filters */}
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-sm font-medium text-gray-700">Purpose:</h3>
            <div className="flex flex-wrap items-center gap-3">
              {mainPurposeFilters.map((filter) => (
                <div key={filter} className="relative">
                  <button
                    className={`px-4 py-2 rounded-full text-[12px] md:text-sm border pr-8 transition ${
                      selectedPurpose === filter ? "bg-[#484AB7] text-white border-[#484AB7]" : "text-black border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedPurpose(filter)}
                  >
                    {filter}
                  </button>
                  {selectedPurpose === filter && (
                    <button
                      onClick={() => setSelectedPurpose("All")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Focus Area Filters */}
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-sm font-medium text-gray-700">Focus Area:</h3>
            <div className="flex flex-wrap items-center gap-3">
              {displayFocusAreas.map((filter) => (
                <div key={filter} className="relative">
                  <button
                    className={`px-2 md:px-4 py-2 rounded-full text-[12px] md:text-sm border pr-8 transition ${
                      selectedFocusArea === filter ? "bg-[#484AB7] text-white border-[#484AB7]" : "text-black border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedFocusArea(filter)}
                  >
                    {filter}
                  </button>
                  {selectedFocusArea === filter && (
                    <button
                      onClick={() => setSelectedFocusArea("All")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Accordion Filters */}
        <section className="container mx-auto block md:hidden">
          <div>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full flex justify-between items-center border-b border-[#e0e0e0] py-3"
            >
              <h3 className="text-[16px] font-medium text-black">
                Filter by Purpose or Focus Area
              </h3>
              <span>{filtersOpen ? <Minus size={18} className="text-[#333333]"/> : <Plus size={18} className="text-[#333333]"/>}</span>
            </button>

            <div className={`${filtersOpen ? "block" : "hidden"} pb-3`}>
              {/* Purpose */}
              <div className="mb-4">
                <h4 className="text-[16px] font-normal text-black mb-2 ml-4 py-2 border-b border-[#e0e0e0]">Purpose</h4>
                <div className="flex flex-col gap-2 ml-4">
                  {mainPurposeFilters.map((filter) => (
                    <div key={filter} className="relative">
                      <button
                        className="flex items-center gap-2 px-2 py-2 rounded-full text-[12px] text-black transition"
                        onClick={() => setSelectedPurpose(filter)}
                      >
                        <Circle className="w-2.5 h-2.5" /> {filter}
                      </button>
                      {selectedPurpose === filter && (
                        <button
                          onClick={() => setSelectedPurpose("All")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Focus Area */}
              <div>
                <h4 className="text-[16px] font-normal text-black mb-2 ml-4 py-2 border-b border-[#e0e0e0]">Focus Area</h4>
                <div className="flex flex-col gap-2 ml-4">
                  {displayFocusAreas.map((filter) => (
                    <div key={filter} className="relative">
                      <button
                        className="flex items-center gap-2 px-2 py-2 rounded-full text-[12px] text-black transition"
                        onClick={() => setSelectedFocusArea(filter)}
                      >
                        <Circle className="w-2.5 h-2.5" /> {filter}
                      </button>
                      {selectedFocusArea === filter && (
                        <button
                          onClick={() => setSelectedFocusArea("All")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {(selectedPurpose !== "All" || selectedFocusArea !== "All") && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 ml-4"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Resource List */}
        <section className="py-8 bg-white container mx-auto">
          <div className="max-w-[958px] px-0 md:px-[16px]">
            {filteredResources.map((resource) => (
              <div key={resource._id} className="hover:bg-[#f2f2f2] border-b border-[#000000]">
                <Link href={`/resources/${resource.slug.current}`} className="w-full">
                  <div className="hover:px-[20px] hover:translate-x-2 transition py-[1rem] md:py-[1.5rem] flex justify-between items-center">
                    <div className="max-w-[90%]">
                      <h3 className="text-lg md:text-2xl font-normal text-black">{resource.title}</h3>
                      <p className="text-[14px] md:text-[16px] text-gray-600 mt-[10px] md:mt-[16px] text-left">{resource.description}</p>
                    </div>
                    <ArrowRight className="text-gray-400 hover:text-black" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
        <CtaSection />
      </div>

      
    </div>
  );
};

export default ResourcePage;
