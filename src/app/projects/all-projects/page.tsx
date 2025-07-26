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
      setProjects(res);
    };
    fetchData();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-[40px]">
      <section
        className="pt-24 pb-10 lg:pb-12 mb-[40px]"
        style={{
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundImage: `url("/assets/images/coding-background-texture.jpg"), linear-gradient(180deg, #474ab6 0%, #9271f6 100%)`,
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-6xl font-normal text-white max-w-[1000px] leading-[1.2]">
            All Projects
          </h1>
          <p className="text-base md:text-2xl text-white max-w-[1000px] mt-4 md:mt-7">
            From metro systems to concert halls, water utilities to wind farms,
            our projects in sustainability and infrastructure are shaping a
            better world. Discover the range of work we do.
          </p>
        </div>
      </section>

      <div className="mb-16  px-[2rem]">
        <div className="relative  max-w-[832px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-16 pl-6 py-4 border border-[#757575] focus:ring-1 rounded-full text-black bg-white h-[76px] text-base"
          />
          <span className="absolute rotate-90 right-6 top-1/2 -translate-y-1/2 text-black">
            <Search />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  px-[2rem]">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div key={index} className="group">
              <div className="rounded-md overflow-hidden aspect-[4/3] bg-gray-100">
                <Link href={`/projects/${project.slug}`}>
                  {" "}
                  <Image
                    src={project.image?.asset?.url ?? "/placeholder.png"}
                    alt={project.title}
                    width={900}
                    height={500}
                    className="rounded-xl object-cover h-full"
                  />{" "}
                </Link>
              </div>
              <div className="mt-3">
                <Link href={`/projects/${project.slug.current}`}>
                  <h3 className="text-lg font-medium font-serif leading-snug text-black mb-[1rem] line-clamp-2">
                    {project.title}
                  </h3>
                </Link>
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
