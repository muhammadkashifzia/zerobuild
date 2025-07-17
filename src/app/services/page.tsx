"use client"

import React, { useState } from 'react';
import { Search, ArrowRight, Plus, Building } from 'lucide-react';

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const markets = ['All', 'Advisory', 'Climate', 'Design', 'Digital', 'Engineering', 'Planning'];

  const allServices = [
    'Acoustic consulting',
    'Advisory services',
    'Airport design and infrastructure',
    'Airport planning',
    'Architecture',
    'Asia energy planning',
    'Asset management',
    'Audiovisual systems',
    'Battery Energy Storage System (BESS)',
    'Bridge design and engineering',
    'Building envelope and facade engineering',
    'Building Information Modelling (BIM)',
    'Building performance and commissioning services',
    'Building physics',
    'Building retrofit',
    'Building services engineering',
    'Business and investor advisory',
    'Campus energy masterplanning',
    'Climate adaptation planning',
    'Climate and sustainability consulting',
    'Code compliance',
    'Commercial real estate advisory',
    'Community engagement',
    'Construction management',
    'Critical infrastructure protection',
    'Data center design',
    'Digital engineering',
    'Digital transformation',
    'Disaster risk reduction',
    'District energy systems',
    'Due diligence',
    'Earthquake engineering',
    'Economic development',
    'Energy efficiency',
    'Energy storage',
    'Environmental impact assessment',
    'Environmental planning',
    'Fire safety engineering',
    'Geotechnical engineering',
    'Green building certification',
    'Healthcare planning',
    'Infrastructure planning',
    'Intelligent transport systems',
    'Landscape architecture',
    'Lighting design',
    'Marine engineering',
    'Master planning',
    'Mechanical engineering',
    'Mobility planning',
    'Net zero consulting',
    'Pedestrian modelling',
    'Planning and development',
    'Project management',
    'Public transport planning',
    'Renewable energy',
    'Resilience planning',
    'Risk assessment',
    'Smart cities',
    'Structural engineering',
    'Sustainable design',
    'Transport planning',
    'Urban design',
    'Urban planning',
    'Water engineering',
    'Wind engineering'
  ];

  const impactProjects = [
    {
      title: 'Completing Antoni Gáudi\'s extraordinary vision',
      description: 'Structural engineering for the completion of the Sagrada Família basilica in Barcelona.',
      image: '/api/placeholder/400/250'
    },
    {
      title: 'London\'s newest suburban metro system',
      description: 'Exploring Arup\'s role in designing and implementing sustainable transportation infrastructure.',
      image: '/api/placeholder/400/250'
    },
    {
      title: 'Enabling 714MW of offshore wind energy',
      description: 'Engineering solutions for large-scale renewable energy infrastructure development.',
      image: '/api/placeholder/400/250'
    },
    {
      title: 'Strengthening New York City\'s resilience',
      description: 'Flood protection and climate adaptation strategies for urban resilience.',
      image: '/api/placeholder/400/250'
    }
  ];

  const filteredServices = allServices.filter(service => 
    searchTerm === '' || service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal text-black mb-8 leading-tight">
              Explore our services across the built and natural environments
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
              We offer a wide range of services, that address every priority in the built and natural environments. Search below to learn more about our expertise, or use the filters to explore services by market.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Filter Section */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-lg font-medium text-black">Services</span>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <button
                onClick={() => {
                  setSelectedMarket('Advisory');
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 transition-colors ${
                  selectedMarket === 'Advisory' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-600 hover:text-black'
                }`}
              >
                <div className="w-2 h-2 rounded-full border border-gray-400"></div>
                Advisory services
              </button>
              <button
                onClick={() => {
                  setSelectedMarket('Climate');
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 transition-colors ${
                  selectedMarket === 'Climate' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-600 hover:text-black'
                }`}
              >
                <div className="w-2 h-2 rounded-full border border-gray-400"></div>
                Climate and sustainability consulting
              </button>
              <button
                onClick={() => {
                  setSelectedMarket('Design');
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 transition-colors ${
                  selectedMarket === 'Design' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-600 hover:text-black'
                }`}
              >
                <div className="w-2 h-2 rounded-full border border-gray-400"></div>
                Design
              </button>
              <button
                onClick={() => {
                  setSelectedMarket('Digital');
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 transition-colors ${
                  selectedMarket === 'Digital' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-600 hover:text-black'
                }`}
              >
                <div className="w-2 h-2 rounded-full border border-gray-400"></div>
                Digital
              </button>
              <button
                onClick={() => {
                  setSelectedMarket('Engineering');
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 transition-colors ${
                  selectedMarket === 'Engineering' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-600 hover:text-black'
                }`}
              >
                <div className="w-2 h-2 rounded-full border border-gray-400"></div>
                Engineering and technical services
              </button>
              <button
                onClick={() => {
                  setSelectedMarket('Planning');
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 transition-colors ${
                  selectedMarket === 'Planning' 
                    ? 'border-black text-black' 
                    : 'border-transparent text-gray-600 hover:text-black'
                }`}
              >
                <div className="w-2 h-2 rounded-full border border-gray-400"></div>
                Planning
              </button>
              <button
                onClick={() => {
                  setSelectedMarket('All');
                  setCurrentPage(1);
                }}
                className="flex items-center gap-2 py-2 px-1 text-gray-600 hover:text-black transition-colors"
              >
                View all
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-0">
            {paginatedServices.map((service, index) => (
              <div key={index} className="border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors hover:px-[20px] hover:transition-transform hover:duration-250 hover:ease-in-out hover:translate-x-4 hover:underline">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-normal text-black hover:underline cursor-pointer ">
                    {service}
                  </h3>
                  <button className="text-gray-400 hover:text-black transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredServices.length)} of {filteredServices.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 text-sm ${
                  currentPage === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm ${
                    currentPage === page
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 text-sm ${
                  currentPage === totalPages 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;