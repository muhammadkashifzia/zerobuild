"use client";

import React, { useState, useEffect } from "react";
import { Search, ArrowRight, Plus, X } from "lucide-react";
import Link from "next/link";
import ServiceSkeleton from "@/components/shimmer/ServiceSkeleton";
type Service = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image?: string | null;
};

const fetchServices = async (): Promise<Service[]> => {
  const res = await fetch(
    "https://zerobuild.eastlogic.com/wp-json/wp/v2/services?_embed"
  );
  const data = await res.json();
  return data.map((item: any) => ({
    id: item.id,
    slug: item.slug,
    title: item.title?.rendered || "Untitled",
    description: item.content?.rendered
      ? item.content.rendered.replace(/(<([^>]+)>)/gi, "")
      : "No description available",
    image: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
  }));
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const itemsPerPage = 15;

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  const mainFilters = services.slice(0, 6).map((s) => s.title);

  const filteredServices = services.filter((service) => {
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
    <div className="main-section  min-h-screen bg-white">
      {/* Hero */}
      <section
        className="py-20 lg:py-32"
        style={{
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundImage: `url("/assets/images/coding-background-texture.jpg"), linear-gradient(180deg, #474ab6 0%, #9271f6 100%)`,
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl">
            Explore our services across the built and natural environments
          </h1>
          <p className="text-lg md:text-2xl text-white mt-6 max-w-2xl">
            Search below to learn more about our expertise, or use the filters
            to explore services.
          </p>
        </div>
      </section>
      <div className="container mx-auto">
        {/* Main Filters */}
        <div className="container mx-auto px-4 mt-10 mb-6">
          <div className="flex flex-wrap gap-2">
            {mainFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setSelectedMarket(filter);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  selectedMarket === filter
                    ? "bg-[#484AB7] text-white border-[#484AB7]"
                    : "text-black border-gray-300 hover:bg-gray-100"
                }`}
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
        </div>

        {/* Services List */}
        <div className="max-w-[958px] px-[16px]">
          <p className="text-sm text-gray-500 mb-4">
            {loading
              ? "Loading services..."
              : `Showing ${startIndex + 1}–${Math.min(
                  startIndex + itemsPerPage,
                  filteredServices.length
                )} of ${filteredServices.length}`}
          </p>

          {loading
            ? Array.from({ length: itemsPerPage }).map((_, idx) => (
                <ServiceSkeleton key={idx} />
              ))
            : paginatedServices.map((service) => (
                <Link key={service.id} href={`/services/${service.slug}`}>
                  <div className="border-b py-6 hover:bg-gray-50 transition-all flex justify-between items-center gap-[25px] hover:px-[20px]">
                    <div>
                      <h3 className="text-xl font-semibold text-black">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  <div className="w-[32px] h-[32px]">
                      <ArrowRight className="text-gray-400 hover:text-black w-[32px] h-[30px] icon--arrow-right" />
                  </div>
                  </div>
                </Link>
              ))}
        </div>

        {/* Pagination */}
        {!loading && (
          <div className="py-10 border-t mt-10">
            <div className="px-4 flex gap-2 flex-wrap">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === idx + 1
                      ? "bg-[#484AB7] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Modal for Filters */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 text-black hover:text-red-600"
              >
                <X />
              </button>

              <h2 className="text-xl font-semibold mb-4 text-black">
                Filter by Service
              </h2>

              {/* Search Field */}
              <div className="mb-4 relative">
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
                      setModalOpen(false);
                    }
                  }}
                />
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute right-3 top-[50%] -translate-y-[50%] text-gray-400 hover:text-black"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* All Filters */}
              <button
                onClick={() => {
                  setSelectedMarket("All");
                  setCurrentPage(1);
                  setModalOpen(false);
                }}
                className={`w-full text-left py-2 px-3 rounded mb-2 ${
                  selectedMarket === "All"
                    ? "bg-gray-200 font-semibold text-black"
                    : "hover:bg-gray-100"
                }`}
              >
                All
              </button>

              {services
                .filter((s) =>
                  s.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => {
                      setSelectedMarket(s.title);
                      setCurrentPage(1);
                      setModalOpen(false);
                    }}
                    className={`w-full text-left py-2 px-3 rounded mb-1 text-black ${
                      selectedMarket === s.title
                        ? "bg-gray-200 font-semibold text-black"
                        : "hover:bg-gray-100 text-black"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
