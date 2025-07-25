"use client";

import React, { useState, useEffect } from "react";
import { Search, ArrowRight, Plus, X } from "lucide-react";
import Link from "next/link";
import { getServices } from "@/sanity/sanity-utils";
import { Service } from "@/types/Service"; 

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();

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

  const categoryCount: { [key: string]: number } = {};
  services.forEach((s) => {
    (s.categories || []).forEach((cat: string | number) => {
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
      selectedMarket === "All" ||
      service.categories?.includes(selectedMarket);

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
       <section
        className="pt-20 pb-20 lg:pt-32 lg:pb-24"
        style={{
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundImage: `url("/assets/images/coding-background-texture.jpg"), linear-gradient(180deg, #474ab6 0%, #9271f6 100%)`,
        }}
      >
        <div className="container mx-auto px-[16px]">
          <h1 className="text-[32px] md:text-[58px] font-normal text-white max-w-[850px]">
            Explore our services across the built and natural environments
          </h1>
          <p className="text-[16px] md:text-[28px] text-white max-w-3xl mt-[1rem] md:mt-[2rem]">
            We offer a wide range of services, that address every priority in
            the built and natural environments. Search below to learn more about
            our expertise, or use the filters to explore services by market.
          </p>
        </div>
      </section>
      <div className="py-[40px] md:py-[80px]">
        {/* Filters */}
        <section className="container mx-auto px-[16px]">
          <div className="flex flex-wrap items-center gap-3">
            {mainFilters.map((filter) => (
              <div key={filter} className="relative">
                <button
                  className={`px-4 py-2 rounded-full text-sm border transition pr-8 ${
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
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs hover:text-red-200"
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

        {/* Services List */}
        <section className="py-8 bg-white container mx-auto">
          <div className="max-w-[958px] px-[16px]">
            <div className="text-sm text-gray-600 mb-[8px]">
              Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredServices.length)} of {filteredServices.length}
            </div>

            {paginatedServices.map((service) => (
              <div
                className="hover:bg-[#f2f2f2] border-b border-[#000000]"
                key={service._id}
              >
                <Link key={service._id} className="w-full"  href={`/services/${service.slug}`}>
                  <div className="hover:px-[20px] hover:translate-x-2 transition py-[1rem] md:py-[1.5rem] flex justify-between items-center">
                    <div>
                      <h3 className="text-[16px] md:text-[28px] font-bold md:font-normal text-black text-left">
                        {service.title}
                      </h3>
                      <p className="text-[14px] md:text-[16px] text-gray-600 mt-[10px] md:mt-[16px]">
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

        {/* Modal for All Categories */}
        {modalOpen && (
          <div className="fixed inset-0  bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="relative w-full max-w-[630px] mx-auto">
              <div className="bg-white rounded-lg max-w-[630px] w-full p-6 max-h-[80vh] overflow-y-auto relative">
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
