"use client";

import React, { useState, useEffect } from "react";
import { Search, ArrowRight, Plus, X } from "lucide-react";
import Link from "next/link";
import { getServices } from "@/sanity/sanity-utils";
import { Service } from "@/types/Service";

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  const itemsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getServices();
      setServices(res);
    };
    fetchData();
  }, []);

  const allCategories = Array.from(
    new Set(services.flatMap((s) => s.categories || []))
  ).sort();

  const categoryCount: Record<string, number> = {};
  services.forEach((s) => {
    (s.categories || []).forEach((cat) => {
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });
  });

  const mainFilters = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name]) => name);

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      searchTerm === "" ||
      service.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMarket =
      selectedMarket === "All" || service.categories?.includes(selectedMarket);

    return matchesSearch && matchesMarket;
  });

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = filteredServices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearch = () => {
    setCurrentPage(1);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <section
        className="pt-24 pb-10 lg:pb-12"
        style={{
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundImage: `url("/assets/images/coding-background-texture.jpg"), linear-gradient(180deg, #474ab6 0%, #9271f6 100%)`,
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-6xl font-normal text-white max-w-[1000px] leading-[1.2]">
            Explore our services across the built and natural environments
          </h1>
          <p className="text-base md:text-2xl text-white max-w-[1000px] mt-4 md:mt-7">
            We offer a wide range of services that address every priority in the
            built and natural environments. Search below or use the filters to
            explore services by market.
          </p>
        </div>
      </section>

      <div className="pt-8 pb-10 md:px-8 px-4">
        <section className=" container mx-auto">
          <div className="pb-10 border-b mb-6">
            <div className="relative max-w-[832px]">
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pr-16 pl-6 py-4 border border-[#757575] focus:ring-1 rounded-full text-black bg-white h-[76px] text-base"
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
        <section className="container mx-auto">
          <div className="flex flex-wrap items-center gap-3">
            {mainFilters.map((filter) => (
              <div key={filter} className="relative">
                <button
                  className={`px-4 py-2 rounded-full text-sm border pr-8 transition ${
                    selectedMarket === filter
                      ? "bg-[#484AB7] text-white border-[#484AB7]"
                      : "text-black border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setSelectedMarket(filter);
                    setCurrentPage(1);
                  }}
                >
                  {filter}
                </button>

                {selectedMarket === filter && (
                  <button
                    onClick={() => {
                      setSelectedMarket("All");
                      setSearchTerm("");
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

            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 flex items-center gap-1 hover:bg-gray-100"
            >
              View all <Plus className="w-4 h-4" />
            </button>
          </div>
        </section>

        <section className="py-8 bg-white container mx-auto">
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
                    <div>
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
                      placeholder="Search services..."
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

                <h2 className="text-xl font-semibold mb-4 text-black">
                  Services
                </h2>
                <div className="space-y-2">
                  <button
                    className={`w-full text-left py-2 px-3 rounded hover:bg-gray-100 text-black ${
                      selectedMarket === "All"
                        ? "bg-gray-200 font-semibold"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedMarket("All");
                      setCurrentPage(1);
                      setModalOpen(false);
                    }}
                  >
                    All
                  </button>

                  {allCategories
                    .filter((f) =>
                      f.toLowerCase().includes(searchTerm.toLowerCase())
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
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
