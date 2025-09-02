"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, Plus, X } from "lucide-react";
import Link from "next/link";
import { getServices, getServicesPageBanner } from "@/sanity/sanity-utils";
import { Service } from "@/types/Service";
import { ServicesBanner } from "@/types/Service";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import CtaSection from "@/components/CtaSection"

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("All");
  const [selectedProjectStage, setSelectedProjectStage] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState<"disciplines" | "projectStages">("disciplines");
  const [services, setServices] = useState<Service[]>([]);
  const [bannerData, setBannerData] = useState<ServicesBanner | null>(null);
  const listTopRef = useRef<HTMLDivElement | null>(null);



  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const [servicesRes, bannerRes] = await Promise.all([
        getServices(),
        getServicesPageBanner(),
    
      ]);
      setServices(servicesRes);
      setBannerData(bannerRes);
     
      // Debug logging
      console.log('Services loaded:', servicesRes.length);
      console.log('Banner data loaded:', bannerRes);
      console.log('All project stages:', Array.from(new Set(servicesRes.flatMap((s) => s.projectStage || []))));
      console.log('All disciplines:', Array.from(new Set(servicesRes.flatMap((s) => s.disciplines || []))));
    };
    fetchData();
  }, []);

  const allDisciplines = Array.from(
    new Set(services.flatMap((s) => s.disciplines || []))
  ).sort();

  const allProjectStages = Array.from(
    new Set(services.flatMap((s) => s.projectStage || []))
  ).sort();

  const disciplineCount: Record<string, number> = {};
  services.forEach((s) => {
    (s.disciplines || []).forEach((discipline) => {
      disciplineCount[discipline] = (disciplineCount[discipline] || 0) + 1;
    });
  });

  const projectStageCount: Record<string, number> = {};
  services.forEach((s) => {
    (s.projectStage || []).forEach((stage) => {
      projectStageCount[stage] = (projectStageCount[stage] || 0) + 1;
    });
  });

  const mainDisciplineFilters = Object.entries(disciplineCount)
    .sort((a, b) => a[0].localeCompare(b[0])) // Sort alphabetically by discipline name
    .slice(0, 6)
    .map(([name]) => name);

  const mainProjectStageFilters = Object.entries(projectStageCount)
    .sort((a, b) => a[0].localeCompare(b[0])) // Sort alphabetically by project stage name
    .slice(0, 6)
    .map(([name]) => name);

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      searchTerm === "" ||
      service.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDiscipline =
      selectedDiscipline === "All" || service.disciplines?.includes(selectedDiscipline);

    const matchesProjectStage =
      selectedProjectStage === "All" || service.projectStage?.includes(selectedProjectStage);

    return matchesSearch && matchesDiscipline && matchesProjectStage;
  });

  // Sort services alphabetically by title (case-insensitive) before pagination
  const sortedServices = [...filteredServices].sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = sortedServices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const scrollToListTop = () => {
    if (typeof window === "undefined") return;
    const offset = 80; // account for fixed header
    if (listTopRef.current) {
      const y = listTopRef.current.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPage = (pageNum: number) => {
    setCurrentPage(Math.min(Math.max(1, pageNum), Math.max(1, totalPages)));
    scrollToListTop();
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setModalOpen(false);
  };

  const clearFilters = () => {
    setSelectedDiscipline("All");
    setSelectedProjectStage("All");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const openModal = (view: "disciplines" | "projectStages") => {
    setModalView(view);
    setModalOpen(true);
  };

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
          className="container mx-auto relative flex flex-col gap-4  px-4"
        >
          <div className="max-w-[870px]">
            <div className="text-3xl md:text-6xl font-normal text-black leading-[1.2] max-w-[1000px]">
              {bannerData?.title}
            </div>
            <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4 max-w-[1024px]">
              {bannerData?.description}
            </div>
          </div>
        </motion.div>
      </AuroraBackground>

      <div className="mt-[60px] pt-8 pb-10 md:px-8 px-4">
        <section className=" container mx-auto">
          <div className="pb-10 border-b mb-6">
            <div className="relative max-w-[850px]">
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pr-16 pl-6 py-4 border border-[#757575] focus:ring-1 rounded-full text-black bg-white h-[40px] md:h-[76px] text-base"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="absolute rotate-90 right-6 top-1/2 -translate-y-1/2 text-black"
              >
                <Search />
              </button>
            </div>
          </div>
        </section>

        {/* Discipline Filters */}
        <section className="container mx-auto mb-4">
          <div className="flex items-start gap-3 mb-3 flex-col md:flex-row">
            <h3 className="text-sm font-medium text-gray-700 mt-0 md:mt-[8px]">Disciplines:</h3>
                
            <div className="flex flex-wrap items-center gap-[8px] md:gap-[16px]">
              {mainDisciplineFilters.map((filter) => (
                <div key={filter} className="relative">
                  <button
                    className={`px-2 md:px-4 py-2 rounded-full text-[12px] md:text-sm  border pr-8 transition ${
                      selectedDiscipline === filter
                        ? "bg-[#484AB7] text-white border-[#484AB7]"
                        : "text-black border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setSelectedDiscipline(filter);
                      setCurrentPage(1);
                    }}
                  >
                    {filter}
                  </button>

                  {selectedDiscipline === filter && (
                    <button
                      onClick={() => {
                        setSelectedDiscipline("All");
                        setCurrentPage(1);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs"
                      aria-label="Clear filter"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}

              {allDisciplines.length > 6 && (
                <button
                  onClick={() => openModal("disciplines")}
                  className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 flex items-center gap-1 hover:bg-gray-100"
                >
                  View all <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          {(selectedDiscipline !== "All") && (
            <button
              onClick={clearFilters}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Clear all filters
            </button>
          )}
        </section>

        {/* Project Stage Filters */}
        <section className="container mx-auto mb-6">
          <div className="flex items-start gap-3 mt-[24px] flex-col md:flex-row">
            <h3 className="text-sm font-medium text-gray-700 mt-0 md:mt-[8px]">Project Stage:</h3>
         
            <div className="flex flex-wrap items-center gap-3">
              {mainProjectStageFilters.map((filter) => (
                <div key={filter} className="relative">
                  <button
                    className={`px-2 md:px-4 py-2 rounded-full text-[12px] md:text-sm  border pr-8 transition ${
                      selectedProjectStage === filter
                        ? "bg-[#484AB7] text-white border-[#484AB7]"
                        : "text-black border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setSelectedProjectStage(filter);
                      setCurrentPage(1);
                    }}
                  >
                    {filter}
                  </button>

                  {selectedProjectStage === filter && (
                    <button
                      onClick={() => {
                        setSelectedProjectStage("All");
                        setCurrentPage(1);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs"
                      aria-label="Clear filter"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}

              {allProjectStages.length > 6 && (
                <button
                  onClick={() => openModal("projectStages")}
                  className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 flex items-center gap-1 hover:bg-gray-100"
                >
                  View all <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          {(selectedProjectStage !== "All") && (
            <button
              onClick={clearFilters}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Clear all filters
            </button>
          )}
        </section>

        <section className="py-4 md:py-8 bg-white container mx-auto">
          <div ref={listTopRef} />
          <div className="max-w-[958px]">
            <div className="text-sm text-gray-600 mb-2">
              Showing {startIndex + 1}–
              {Math.min(startIndex + itemsPerPage, filteredServices.length)} of{" "}
              {filteredServices.length}
            </div>

            {paginatedServices.map((service) => (
              <div
                className="hover:bg-[#f2f2f2] border-b border-black"
                key={service._id}
              >
                <Link href={`/services/${service.slug}`} className="w-full">
                  <div className="hover:px-5 hover:translate-x-2 transition py-4 md:py-6 flex justify-between items-center">
                    <div className="max-w-[90%]">
                      <h3 className="text-lg md:text-2xl font-bold md:font-normal text-black">
                        {service.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 mt-2 md:mt-4">
                        {service.description}
                      </p>
                    </div>
                    <ArrowRight className="text-gray-400 hover:text-black" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className=" bg-white container mx-auto">
            <div className="max-w-[958px] flex justify-start">
              <div className="flex items-center gap-2">
                {/* Previous Page Button */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  ← 
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 7) {
                      pageNum = i + 1;
                    } else if (currentPage <= 4) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 3) {
                      pageNum = totalPages - 6 + i;
                    } else {
                      pageNum = currentPage - 3 + i;
                    }

                    if (pageNum < 1 || pageNum > totalPages) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-black text-white'
                            : 'text-gray-700 hover:text-black hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Page Button */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100'
                  }`}
                >
                   →
                </button>
              </div>
            </div>
          </section>
        )}

        {modalOpen && (
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
                      placeholder={`Search ${modalView === "disciplines" ? "disciplines" : "project stages"}...`}
                      className="w-full pr-10 pl-4 py-2 border border-gray-300 focus:ring-2 focus:ring-black rounded-md text-black"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button
                      onClick={handleSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                    >
                      <Search />
                    </button>
                  </div>
                </section>

                {modalView === "disciplines" ? (
                  <>
                    <h2 className="text-xl font-semibold mb-4 text-black">
                      Disciplines ({allDisciplines.length})
                    </h2>
                    <div className="space-y-2 mb-6">
                      <button
                        className={`w-full text-left py-2 px-3 rounded hover:bg-gray-100 text-black ${
                          selectedDiscipline === "All"
                            ? "bg-gray-200 font-semibold"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedDiscipline("All");
                          setCurrentPage(1);
                          setModalOpen(false);
                        }}
                      >
                        All Disciplines
                      </button>

                      {allDisciplines
                        .filter((f) =>
                          f.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((filter) => (
                          <button
                            key={filter}
                            className={`w-full text-left py-2 px-3 rounded hover:bg-gray-100 text-black ${
                              selectedDiscipline === filter
                                ? "bg-gray-200 font-semibold"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedDiscipline(filter);
                              setCurrentPage(1);
                              setModalOpen(false);
                            }}
                          >
                            {filter} ({disciplineCount[filter] || 0})
                          </button>
                        ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold mb-4 text-black">
                      Project Stages ({allProjectStages.length})
                    </h2>
                    <div className="space-y-2">
                      <button
                        className={`w-full text-left py-2 px-3 rounded hover:bg-gray-100 text-black ${
                          selectedProjectStage === "All"
                            ? "bg-gray-200 font-semibold"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedProjectStage("All");
                          setCurrentPage(1);
                          setModalOpen(false);
                        }}
                      >
                        All Project Stages
                      </button>

                      {allProjectStages
                        .filter((f) =>
                          f.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((filter) => (
                          <button
                            key={filter}
                            className={`w-full text-left py-2 px-3 rounded hover:bg-gray-100 text-black ${
                              selectedProjectStage === filter
                                ? "bg-gray-200 font-semibold"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedProjectStage(filter);
                              setCurrentPage(1);
                              setModalOpen(false);
                            }}
                          >
                            {filter} ({projectStageCount[filter] || 0})
                          </button>
                        ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <CtaSection />
    </div>
  );
};

export default ServicesPage;