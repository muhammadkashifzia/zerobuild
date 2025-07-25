"use client";

import React, { useState, useEffect } from "react";
import { getProjects } from "@/sanity/sanity-utils";
import { Project } from "@/types/Project";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProjects();
      setProjects(res); // ✅ Set state with fetched projects
    };
    fetchData();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-32 ">
      <div className="border-b  pb-[60px] mb-[60px]">
        <h1 className="text-[68px] font-serif font-medium  text-black px-[2rem]">
          Acoustic Projects
        </h1>
      </div>

      <div className="mb-32  px-[2rem]">
        <div className="relative max-w-[500px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-5 pr-8 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-black text-black"
          />
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
            {" "}
            <Search />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  px-[2rem]">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div key={index} className="group">
              <div className="rounded-md overflow-hidden aspect-[4/3] bg-gray-100">
                <Image
                  src={project.image?.asset?.url ?? "/placeholder.png"}
                  alt={project.title}
                  width={900}
                  height={500}
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-medium font-serif leading-snug text-black mb-[1rem]">
                  {project.title}
                </h3>
                <p className="text-[#757575]">{project.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No projects found.
          </p>
        )}
      </div>
    </div>
  );
}
