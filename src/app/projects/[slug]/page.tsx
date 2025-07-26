import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/sanity/sanity-utils";
import { Project } from "@/types/Project";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>; // Changed to Promise
}) {
  const { slug } = await params; // Await the params
  const project: Project = await getProject(slug); // Use the awaited slug

  if (!project) {
    return (
      <div className="text-center mt-10 text-lg text-red-500">
        project not found
      </div>
    );
  }

  return (
    <div className="px-[16px] md:py-28 mx-auto space-y-5">
       {project.image?.asset?.url && (
            <Image
              src={project.image.asset.url}
              alt={project.title}
              width={900}
              height={500}
              className="rounded-xl object-cover w-full h-[663px]"
            />
          )}
      <div className="container grid grid-cols-1 lg:grid-cols-3 px-0 md:px-[16px] gap-[20px] mx-auto pt-0 md:pt-[40px]">
        {/* Left: Content */}
        <div className="lg:col-span-2 space-y-2">
          {/* Cover Image */}
         
          {/* Categories */}
          {(project.categories?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {(project.categories ?? []).map((cat, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Rich Body Content */}
          {project.body && (
            <div className="prose prose-blue max-w-none mt-8 text-black project-body-content">
              <PortableText
                value={project.body}
                components={{
                  block: {
                    h1: ({ children }) => <h1>{children}</h1>,
                    h2: ({ children }) => <h2>{children}</h2>,
                    normal: ({ children }) => <p>{children}</p>,
                  },
                }}
              />
            </div>
          )}
        </div>

        {/* Right: CTA */}
        <div className="lg:col-span-1">
          <div className="rounded-[.75rem] border border-[#e0e0e0] p-[2rem] sticky top-[90px]">
            <h3 className="text-[22px] font-semibold mb-2 text-black">
              Get in touch with our team
            </h3>
            <Link
              href="/contact"
              className="relative w-full bg-[#484AB7] text-white p-5 rounded-xl max-w-[150px] h-[50px] flex items-center text-lg font-semibold hover:bg-[#3c3f9d] transition-colors duration-200 mt-[2rem]"
            >
              <span>Contact</span>
              <span className="absolute right-[15px]">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}