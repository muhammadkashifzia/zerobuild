"use client";

import React, { useState } from "react";
import { Search, ArrowRight, Plus, X } from "lucide-react";
import Link from "next/link";

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const itemsPerPage = 15;

  const mainFilters = [
    "Advisory services",
    "Climate and sustainability consulting",
    "Design",
    "Digital",
    "Engineering and technical services",
    "Planning",
  ];

  const allFilters = [
    ...mainFilters,
    "Accessibility",
    "Acoustic consulting",
    "Architecture",
    "Asset management",
    "Audio-visual systems",
    "BIM",
    "Bridge engineering",
    "Building performance and commissioning",
    "Building physics",
    "Building retrofit",
    "Building services engineering",
    "Business investment advisory",
    "Chemical and process engineering",
    "Circular economy",
    "City modelling lab",
    "Climate change risk, resilience and adaptation",
    "Computational fluid dynamics",
    "Data and artificial intelligence",
    "Decarbonisation",
    "Digital asset management",
    "Digital design",
    "Digital strategy and advisory",
    "Digital twin",
    "Economic planning",
    "Environmental consulting",
    "ESG strategy and reporting",
    "Experience design",
    "Facade engineering",
    "Fire engineering",
    "Foresight",
    "Geospatial and earth observation",
    "Ground engineering",
    "Host cities",
    "Intelligent mobility systems",
    "Landscape architecture",
    "Lighting",
    "Logistics, freight and supply chain management",
    "Masterplanning",
    "Materials",
    "Nature disclosure and biodiversity assessments",
    "Operations consulting",
    "ORAT",
    "People movement",
    "Planning policy advice",
    "Product design",
    "Project and programme management",
    "Rail infrastructure design",
    "Regenerative land management",
    "Research",
    "Resilience, security and risk",
    "Retrofit at scale",
    "Road design and engineering",
    "Road strategy, planning and finance",
    "Seismic design",
    "Smart Buildings",
    "Social value and equity",
    "Specialist technology, analytics and research",
    "Sports architecture",
    "Strategy consulting",
    "Structural engineering",
    "Technology and cybersecurity consulting",
    "Theatre and venue consulting",
    "Transport architecture",
    "Transport consulting",
    "Tunnel design",
    "Vibration engineering",
    "Visualisation",
    "Wind consulting",
    "Workplace architecture",
  ];

  const allServices = allFilters.map((title) => ({
    title,
    description: "Description for " + title,
  }));

  const filteredServices = allServices.filter((service) => {
    const matchesSearch =
      searchTerm === "" ||
      service.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMarket =
      selectedMarket === "All" || service.title === selectedMarket;

    return matchesSearch && matchesMarket;
  });

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = filteredServices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="py-20 lg:py-32"
        style={{
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundImage: `url("/assets/images/coding-background-texture.jpg"), linear-gradient(180deg, #474ab6 0%, #9271f6 100%)`,
        }}
      >
        <div className="px-4 lg:px-8">
          <h1 className="text-[32px] md:text-[58px] font-normal text-white  max-w-[850px]">
            Explore our services across the built and natural environments
          </h1>
          <p className="text-[16px] md:text-[28px] text-[#ffffff] max-w-3xl mt-[1rem] md:mt-[2rem]">
            We offer a wide range of services, that address every priority in
            the built and natural environments. Search below to learn more about
            our expertise, or use the filters to explore services by market.
          </p>
        </div>
      </section>

    <div className="py-[40px] md:py-[80px]">
        {/* Filters */}
      <section className="px-4 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          {mainFilters.map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                selectedMarket === filter
                  ? "bg-black text-white"
                  : "text-black border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => {
                setSelectedMarket(filter);
                setCurrentPage(1);
              }}
            >
              {filter}
            </button>
          ))}
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 flex items-center gap-1 hover:bg-gray-100"
          >
            View all <Plus className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Services list */}
      <section className="py-8 bg-white">
        <div className="max-w-[958px] px-4 lg:px-8">
          <div className="text-sm text-gray-600 mb-[8px]">
            Showing {startIndex + 1}–
            {Math.min(startIndex + itemsPerPage, filteredServices.length)} of{" "}
            {filteredServices.length}
          </div>
          {paginatedServices.map((service, i) => (
            <div
              className="hover:bg-[#f2f2f2] border-b border-[#000000]"
              key={i}
            >
              <Link href="/">
                <div className="hover:px-[20px] hover:translate-x-2 transition py-[1rem] md:py-[1.5rem] flex justify-between items-center">
                  <div>
                    <h3 className="text-[28px] font-normal text-black">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-[16px]">
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
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl px-[16px] lg:px-8 flex justify-between">
          <div className="flex items-center space-x-2 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm text-gray-700 hover:text-black disabled:text-gray-400"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-3 py-2 text-sm ${
                  currentPage === idx + 1
                    ? "bg-black text-white"
                    : "text-gray-700 hover:text-black hover:bg-gray-100"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm text-gray-700 hover:text-black disabled:text-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>

      {/* Modal with all filters */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-[630px] w-full p-6 relative max-h-[80vh] overflow-y-auto">
            {/* Search */}
            <section className="py-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search services..."
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 focus:ring-2 focus:ring-black rounded-md text-black bg-white"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setCurrentPage(1);
                      setModalOpen(false);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    setModalOpen(false);
                  }}
                  className="absolute right-3 top-[50%] -translate-y-[50%] text-gray-400 hover:text-black"
                >
                  <Search />
                </button>
              </div>
            </section>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
              onClick={() => setModalOpen(false)}
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-black">Services</h2>
            <div className="space-y-2">
              <button
                className={`w-full text-left py-2 px-3 rounded text-black hover:bg-gray-100 ${
                  selectedMarket === "All" ? "bg-gray-200 font-semibold" : ""
                }`}
                onClick={() => {
                  setSelectedMarket("All");
                  setCurrentPage(1);
                  setModalOpen(false);
                }}
              >
                All
              </button>

              {/* Filtered list inside modal */}
              {allFilters.filter(f =>
                f.toLowerCase().includes(searchTerm.toLowerCase())
              ).length === 0 ? (
                <p className="text-gray-500 px-3">No services found.</p>
              ) : (
                allFilters
                  .filter((filter) =>
                    filter.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((filter) => (
                    <button
                      key={filter}
                      className={`w-full text-left py-2 px-3 rounded hover:bg-gray-100 text-black ${
                        selectedMarket === filter
                          ? "bg-gray-200 font-semibold"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedMarket(filter);
                        setCurrentPage(1);
                        setModalOpen(false);
                      }}
                    >
                      {filter}
                    </button>
                  ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
