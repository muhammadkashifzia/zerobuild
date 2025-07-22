"use client";

import React, { useState, useEffect } from "react";
import { Search, ArrowRight, Plus, X } from "lucide-react";
import Link from "next/link";

type Service = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image?: string | null;
};

const fetchServices = async (): Promise<Service[]> => {
  const res = await fetch("https://zerobuild.eastlogic.com/wp-json/wp/v2/services?_embed");
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const itemsPerPage = 15;

  useEffect(() => {
    fetchServices().then(setServices);
  }, []);

  const filteredServices = services.filter((service) => {
    const matchesSearch = searchTerm === "" || service.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMarket = selectedMarket === "All" || service.title === selectedMarket;
    return matchesSearch && matchesMarket;
  });

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + itemsPerPage);

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
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl">
            Explore our services across the built and natural environments
          </h1>
          <p className="text-lg md:text-2xl text-white mt-6 max-w-2xl">
            Search below to learn more about our expertise, or use the filters to explore services.
          </p>
        </div>
      </section>

      {/* Search & Filter Trigger */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-end">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 border px-4 py-2 rounded-full text-sm text-gray-600 hover:bg-gray-100"
            >
              View all <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter name label */}
      <div className="container mx-auto px-4">
        <p className="text-gray-700 text-lg font-medium mb-6">
          {selectedMarket !== "All" ? `Filtered by: ${selectedMarket}` : "Showing all services"}
        </p>

        <p className="text-sm text-gray-500 mb-4">
          Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredServices.length)} of{" "}
          {filteredServices.length}
        </p>

        {/* Service List */}
        {paginatedServices.map((service) => (
          <Link key={service.id} href={`/services/${service.slug}`}>
            <div className="border-b py-6 hover:bg-gray-50 transition-all flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-black">{service.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{service.description}</p>
              </div>
              <ArrowRight className="text-gray-400 hover:text-black" />
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="py-10 border-t mt-10">
        <div className="container mx-auto px-4 flex gap-2 justify-center flex-wrap">
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

      {/* Modal for Filter and Search */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-black hover:text-red-600"
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-black">Filter by Service</h2>

            {/* Search inside Modal */}
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="border px-4 py-2 rounded-md w-full pr-10"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" />
            </div>

            {/* Filter Buttons */}
            <button
              onClick={() => {
                setSelectedMarket("All");
                setCurrentPage(1);
                setModalOpen(false);
              }}
              className={`w-full text-left py-2 px-3 rounded mb-2 ${
                selectedMarket === "All" ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
              }`}
            >
              All
            </button>

            {services
              .filter((s) => s.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((s) => (
                <button
                  key={s.slug}
                  onClick={() => {
                    setSelectedMarket(s.title);
                    setCurrentPage(1);
                    setModalOpen(false);
                  }}
                  className={`w-full text-left py-2 px-3 rounded mb-1 ${
                    selectedMarket === s.title ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                  }`}
                >
                  {s.title}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
