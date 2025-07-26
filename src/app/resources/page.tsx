"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getResources } from "@/sanity/sanity-utils";
import { Resource } from "@/types/Resource";

const ResourcePage = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getResources();
      setResources(res);
    };
    fetchData();
  }, []);

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
          <h1 className="text-[32px] md:text-[68px] font-normal text-white max-w-[850px]">
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
        {/* Resources List */}
        <section className="py-8 bg-white container mx-auto">
          <div className="max-w-[958px] px-[16px]">
            {resources.map((resource) => (
              <div
                className="hover:bg-[#f2f2f2] border-b border-[#000000]"
                key={resource._id}
              >
                <Link href={`/resources/${resource.slug}`} className="w-full">
                  <div className="hover:px-[20px] hover:translate-x-2 transition py-[1rem] md:py-[1.5rem] flex justify-between items-center">
                    <div>
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
      </div>
    </div>
  );
};

export default ResourcePage;
