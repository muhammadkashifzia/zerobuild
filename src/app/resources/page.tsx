"use client";

import React, { useState, useEffect } from "react";
import { Search, ArrowRight, Plus, X } from "lucide-react";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState<"purpose" | "focusArea">("purpose");
  const [filterSearch, setFilterSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [res, banner] = await Promise.all([
        getResources(),
        getResourcesPageBanner()
      ]);
      setResources(res);
      setBannerData(banner);
      // Debug
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
  resources.forEach((r) => {
    (r.purpose || []).forEach((p) => {
      purposeCount[p] = (purposeCount[p] || 0) + 1;
    });
  });
  if (allPurposes.length === 0) fallbackPurposes.forEach((p) => (purposeCount[p] = 0));
  const mainPurposeFilters = Object.entries(purposeCount).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name]) => name);

  // Focus Area
  const allFocusAreas = Array.from(new Set(resources.flatMap((r) => r.focusArea || []))).sort();
  const fallbackFocusAreas = [
    "Net Zero", "Retrofit", "New Build", "Energy", "Carbon", "Health & Wellbeing", "Circular Economy", "Biodiversity"
  ];
  const displayFocusAreas = allFocusAreas.length > 0 ? allFocusAreas : fallbackFocusAreas;
  const focusAreaCount: Record<string, number> = {};
  resources.forEach((r) => {
    (r.focusArea || []).forEach((f) => {
      focusAreaCount[f] = (focusAreaCount[f] || 0) + 1;
    });
  });
  if (allFocusAreas.length === 0) fallbackFocusAreas.forEach((f) => (focusAreaCount[f] = 0));
  // const mainFocusAreaFilters = Object.entries(focusAreaCount).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name]) => name);

  // Filtering
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchTerm === "" || resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPurpose =
      selectedPurpose === "All" || resource.purpose?.includes(selectedPurpose);
    const matchesFocusArea =
      selectedFocusArea === "All" || resource.focusArea?.includes(selectedFocusArea);
    return matchesSearch && matchesPurpose && matchesFocusArea;
  });

  // Modal open helpers
  const openModal = (view: "purpose" | "focusArea") => {
    setModalView(view);
    setModalOpen(true);
    setFilterSearch("");
  };
  const clearFilters = () => {
    setSelectedPurpose("All");
    setSelectedFocusArea("All");
    setSearchTerm("");
  };

  // Fallback banner content
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
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="container mx-auto relative flex flex-col gap-4 px-4"
        >
          <div className="max-w-[870px]">
            <div className="text-3xl md:text-6xl font-normal text-black leading-[1.2] max-w-[1000px]">
              {bannerTitle}
            </div>
            <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4 max-w-[1024px]">
              {bannerDescription}
            </div>
          </div>
        </motion.div>
      </AuroraBackground>

      <div className="pt-8 pb-10 md:px-8 px-4">
        <section className="container mx-auto">
          <div className="pb-10 border-b mb-6">
            <div className="relative max-w-[832px]">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pr-16 pl-6 py-4 border border-[#757575] focus:ring-1 rounded-full text-black bg-white h-[76px] text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setModalOpen(false)}
              />
              <button
                onClick={() => setModalOpen(false)}
                className="absolute rotate-90 right-6 top-1/2 -translate-y-1/2 text-black"
              >
                <Search />
              </button>
            </div>
          </div>
        </section>

        {/* Purpose Filters */}
        <section className="container mx-auto mb-4">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-sm font-medium text-gray-700">Purpose:</h3>
          <div className="flex flex-wrap items-center gap-3">
            {mainPurposeFilters.map((filter) => (
              <div key={filter} className="relative">
                <button
                  className={`px-4 py-2 rounded-full text-sm border pr-8 transition ${
                    selectedPurpose === filter
                      ? "bg-[#484AB7] text-white border-[#484AB7]"
                      : "text-black border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedPurpose(filter)}
                >
                  {filter}
                </button>
                {selectedPurpose === filter && (
                  <button
                    onClick={() => setSelectedPurpose("All")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs"
                    aria-label="Clear filter"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => openModal("purpose")}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 flex items-center gap-1 hover:bg-gray-100"
            >
              View all <Plus className="w-4 h-4" />
            </button>
          </div>
          </div>
          {(selectedPurpose !== "All") && (
              <button
                onClick={clearFilters}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Clear all filters
              </button>
            )}
        </section>

        {/* Focus Area Filters */}
        <section className="container mx-auto mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-sm font-medium text-gray-700">Focus Area:</h3>
        
          <div className="flex flex-wrap items-center gap-3">
            {/* Show all focus areas as a list, not just top 6, and remove modal button */}
            {displayFocusAreas.map((filter) => (
              <div key={filter} className="relative">
                <button
                  className={`px-4 py-2 rounded-full text-sm border pr-8 transition ${
                    selectedFocusArea === filter
                      ? "bg-[#484AB7] text-white border-[#484AB7]"
                      : "text-black border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedFocusArea(filter)}
                >
                  {filter}
                </button>
                {selectedFocusArea === filter && (
                  <button
                    onClick={() => setSelectedFocusArea("All")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs"
                    aria-label="Clear filter"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          </div>
        </section>

        <section className="py-8 bg-white container mx-auto">
          <div className="max-w-[958px] px-[16px]">
            {filteredResources.map((resource) => (
              <div
                className="hover:bg-[#f2f2f2] border-b border-[#000000]"
                key={resource._id}
              >
                <Link href={`/resources/${resource.slug.current}`} className="w-full">
                  <div className="hover:px-[20px] hover:translate-x-2 transition py-[1rem] md:py-[1.5rem] flex justify-between items-center">
                    <div className="max-w-[90%]">
                      <h3 className="text-[16px] md:text-[28px] font-bold md:font-normal text-black text-left">
                        {resource.title}
                      </h3>
                      <p className="text-[14px] md:text-[16px] text-gray-600 mt-[10px] md:mt-[16px] text-left">
                        {resource.description}
                      </p>
                    </div>
                    <ArrowRight className="text-gray-400 hover:text-black" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Modal for all filters */}
        {modalOpen && modalView === "purpose" && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="relative w-full max-w-[630px] mx-auto">
              <div className="bg-white rounded-lg w-full p-6 max-h-[80vh] overflow-y-auto">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-black"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 hover:rotate-45 transition-transform" />
                </button>
                <section className="py-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={`Search purposes...`}
                      className="w-full pr-10 pl-4 py-2 border border-gray-300 focus:ring-2 focus:ring-black rounded-md text-black"
                      value={filterSearch}
                      onChange={(e) => setFilterSearch(e.target.value)}
                    />
                    <button
                      onClick={() => setModalOpen(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                    >
                      <Search />
                    </button>
                  </div>
                </section>
                <>
                  <h2 className="text-xl font-semibold mb-4 text-black">
                    Purposes ({displayPurposes.length})
                  </h2>
                  <div className="space-y-2 mb-6">
                    <button
                      className={`w-full text-left py-2 px-3 rounded hover:bg-gray-100 text-black ${
                        selectedPurpose === "All"
                          ? "bg-gray-200 font-semibold"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedPurpose("All");
                        setModalOpen(false);
                      }}
                    >
                      All Purposes
                    </button>
                    {displayPurposes
                      .filter((f) =>
                        f.toLowerCase().includes(filterSearch.toLowerCase())
                      )
                      .map((filter) => (
                        <button
                          key={filter}
                          className={`w-full text-left py-2 px-3 rounded hover:bg-gray-100 text-black ${
                            selectedPurpose === filter
                              ? "bg-gray-200 font-semibold"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedPurpose(filter);
                            setModalOpen(false);
                          }}
                        >
                          {filter} ({purposeCount[filter] || 0})
                        </button>
                      ))}
                  </div>
                </>
              </div>
            </div>
          </div>
        )}
      </div>
      <CtaSection />
    </div>
  );
};

export default ResourcePage;
