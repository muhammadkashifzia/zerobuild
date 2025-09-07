import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { getProject, getRelatedProjects } from "@/sanity/sanity-utils";
import { Project } from "@/types/Project";
import type { Metadata } from "next";
import { ArrowRight, ArrowLeft } from "lucide-react";
import CtaSection from "@/components/CtaSection";
import Accordion from "@/components/ui/accordion";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project: Project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | ZeroBuild",
      description: "The requested project could not be found.",
    };
  }

  const title = `${project.title} - ZeroBuild Net Zero Decarbonisation Project`;
  const description =
    project.description ||
    `Explore ${project.title} project by ZeroBuild. Our Net Zero decarbonisation case study demonstrates how we help architects, engineers, developers, and local authorities achieve their sustainability goals.`;
  const keywords = `${project.title}, ZeroBuild project, Net Zero decarbonisation case study, ${project.categories?.join(", ") || "sustainability project"}, built environment project, carbon reduction, energy efficiency, retrofit project, new build project, architects, engineers, developers, local authorities, housing associations, UK sustainability, Greater Manchester, SHDF, PSDS, ESG compliance`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://zerobuild.io/projects/${slug}`,
      siteName: "ZeroBuild",
      images: project.image?.asset?.url
        ? [
            {
              url: project.image.asset.url,
              width: 1200,
              height: 630,
              alt: `${project.title} - ZeroBuild Project`,
            },
          ]
        : [
            {
              url: "/assets/images/coding-background-texture.jpg",
              width: 1200,
              height: 630,
              alt: `${project.title} - ZeroBuild Project`,
            },
          ],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.image?.asset?.url
        ? [project.image.asset.url]
        : ["/assets/images/coding-background-texture.jpg"],
    },
  };
}

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

  // Get related projects
  const relatedProjects = await getRelatedProjects(slug, project.categories);

  return (
    <div className="px-[16px] pt-[30px] md:pt-[25px] mx-auto space-y-5 mt-[60px] pb-[60px] ">
   <div className="container mx-auto px-[16px]">
       <Link
        href="/projects"
        className="text-black font-semibold flex gap-[10px] mb-[20px] link items-center"
      >
        <ArrowLeft />
        <span className="hover:link-underline">Back to Projects</span>
      </Link>
      {/* Header: Title left, Location right */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 !mb-[20px]">
        <h1 className="text-black text-[32px] md:text-[40px] leading-[1.1] font-normal max-w-[740px]">
          {project.title}
        </h1>
        {project.location && (
          <div className="text-[#9b9b9b] text-[18px] md:text-[24px] leading-tight ">
            {project.location}
          </div>
        )}
      </div>
     
      {project.image?.asset?.url && (
        <Image
          src={project.image.asset.url}
          alt={project.title}
          width={900}
          height={500}
          className="rounded-xl object-cover w-full h-auto md:h-auto"
        />
      )}
   </div>
      <div className="container grid grid-cols-1 lg:grid-cols-3 px-0 md:px-[16px] gap-[20px] mx-auto pt-0 md:pt-[40px]">
        {/* Left: Content */}
        <div className="lg:col-span-2 space-y-2">
          {/* Categories */}
          {/* {(project.categories?.length ?? 0) > 0 && (
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
          )} */}

          {/* Rich Body Content */}
          {project.body && (
            <div className="prose prose-blue max-w-none mt-0 md:mt-8 text-black service-body-content">
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
            {project.accordion && project.accordion.length > 0 && (
                      <div className="mt-12">
                        <Accordion 
                          items={project.accordion} 
                          className="mt-6"
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

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <div className="container mx-auto px-0 md:px-[16px] md:pt-[60px]">
          <div className="lg:col-span-3">
            <p className="text-[20px] text-[#757575] mb-[0px]">Projects</p>
            <div className="flex items-end md:items-center justify-between mb-6 md:flex-row flex-col gap-4">
              <h2 className="text-[32px] md:text-[38px] font-normal text-black">
                Explore more climate & sustainability projects
              </h2>
              <Link
                href="/projects/all-projects"
                className="text-black flex items-center gap-2 border border-gray-300 rounded-2xl px-2 py-2 hover:bg-gray-100 transition h-[56px] w-[200px] relative justify-center"
              >
                View all Projects <ArrowRight className="w-4 h-4 absolute right-[15px]" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-[60px]">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject._id}
                  href={`/projects/${relatedProject.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden transition-shadow duration-300">
                    {relatedProject.image?.asset?.url && (
                      <div className="shadow relative h-[220px] overflow-hidden rounded-[12px]">
                        <Image
                          src={relatedProject.image.asset.url}
                          alt={relatedProject.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-[12px]"
                        />
                      </div>
                    )}
                    <div className="mt-[24px]">
                      <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-blue-600 transition-colors duration-200">
                        {relatedProject.title}
                      </h3>
                      {relatedProject.description && (
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {relatedProject.description}
                        </p>
                      )}
                      {/* {relatedProject.categories && relatedProject.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {relatedProject.categories.slice(0, 2).map((category, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )} */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <CtaSection />
    </div>
  );
}
