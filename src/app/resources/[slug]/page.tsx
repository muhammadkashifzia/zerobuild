import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { getResource, getRelatedResources, getResourcesPageBanner } from "@/sanity/sanity-utils";
import { Resource } from "@/types/Resource";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight  } from "lucide-react";
import CtaSection from "@/components/CtaSection";
import Accordion from "@/components/ui/accordion";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource: Resource = await getResource(slug);

  if (!resource) {
    return {
      title: "Resource Not Found | ZeroBuild",
      description: "The requested resource could not be found.",
    };
  }

  const title = `${resource.title} - ZeroBuild Net Zero Decarbonisation Resource`;
  const description = resource.description || `Access ${resource.title} resource from ZeroBuild. Our comprehensive Net Zero decarbonisation knowledge hub provides insights, tools, and guidance for architects, engineers, developers, and local authorities.`;
  const keywords = `${resource.title}, ZeroBuild resource, Net Zero decarbonisation resource, ${resource.purpose?.join(', ') || 'sustainability resource'}, built environment resource, carbon assessment guide, energy modelling tool, retrofit resource, new build resource, sustainability best practices, architect sustainability resource, engineer decarbonisation resource, developer Net Zero resource, local authority sustainability resource, housing association decarbonisation resource, Whole Life Carbon resource, building performance resource, procurement guide, funding application resource, SHDF resource, PSDS resource, ESG compliance resource`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/resources/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://zerobuild.io/resources/${slug}`,
      siteName: 'ZeroBuild',
      images: resource.image?.asset?.url ? [
        {
          url: resource.image.asset.url,
          width: 1200,
          height: 630,
          alt: `${resource.title} - ZeroBuild Resource`,
        },
      ] : [
        {
          url: '/assets/images/coding-background-texture.jpg',
          width: 1200,
          height: 630,
          alt: `${resource.title} - ZeroBuild Resource`,
        },
      ],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: resource.image?.asset?.url ? [resource.image.asset.url] : ['/assets/images/coding-background-texture.jpg'],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource: Resource = await getResource(slug);
  const resourcesPageBanner = await getResourcesPageBanner();

  if (!resource) {
    return (
      <div className="text-center mt-10 text-lg text-red-500">
        Resource not found
      </div>
    );
  }

  // Get related resources
  const relatedResources = await getRelatedResources(slug, resource.purpose, resource.focusArea);

  return (
    <div className="px-[16px] py-[30px] mx-auto space-y-5 mt-[60px]">
  <Link href="/resources" className="text-black text-[20px] font-semibold flex gap-[10px] mb-[20px] link items-center"> <ArrowLeft /> 
      <span className="hover:link-underline">Back to Resources</span>
      </Link>
   
       <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 !mb-[48px]">
        <h1 className="text-black text-[24px] md:text-[40px] leading-[1.1] font-normal max-w-[740px]">
          {resource.title}
        </h1>
       {resource.purpose && Array.isArray(resource.purpose) ? (
  <div className="text-[#9b9b9b] text-[18px] md:text-[24px] leading-tight">
    {resource.purpose.slice(0, 1).map((item: string, index: number) => (
      <div key={index}>{item}</div>
    ))}
  </div>
) : (
  <div className="text-[#9b9b9b] text-[18px] md:text-[24px] leading-tight">
    {resource.purpose}
  </div>
)}
      </div>
      {(resource.gallery?.length ?? 0) > 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(resource.gallery ?? []).map((img, idx) => (
              <Image
                key={idx}
                src={img.asset.url}
                alt={`Gallery image ${idx + 1}`}
                width={400}
                height={300}
                className="rounded-md object-cover w-full h-auto md:h-[300px] lg:h-[515px] object-top shadow-md"
              />
            ))}
          </div>
        </div>
      )}
      <div className="container grid grid-cols-1 lg:grid-cols-3 px-0 md:px-[16px] gap-[20px] mx-auto pt-0 md:pt-[40px] pb-[10px] md:pb-[60px]">
        {/* Left: Content */}
        <div className="lg:col-span-2 space-y-2">
          {/* Cover Image */}
          {resource.image?.asset?.url && (
            <Image
              src={resource.image.asset.url}
              alt={resource.title}
              width={900}
              height={500}
              className="rounded-xl object-cover"
            />
          )}
          {/* Purpose */}
          {/* {(resource.purpose?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {(resource.purpose ?? []).map((purpose: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                >
                  {purpose}
                </span>
              ))}
            </div>
          )} */}
          {/* Focus Area */}
          {/* {(resource.focusArea?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-sm font-medium text-gray-700">Focus Area:</span>
              {(resource.focusArea ?? []).map((focus: string, index: number) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full"
                >
                  {focus}
                </span>
              ))}
            </div>
          )} */}

          {/* Rich Body Content */}
          {resource.body && (
            <div className="prose prose-blue max-w-none mt-8 text-black mb-[48px] service-body-content">
              <PortableText
                value={resource.body}
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

          {/* Resource Accordion */}
          {resource.accordion && resource.accordion.length > 0 && (
            <div className="mt-12">
              <Accordion 
                items={resource.accordion} 
                className="mt-6"
              />
            </div>
          )}
        </div>

        {/* Right: CTA */}
        <div className="lg:col-span-1 hidden md:block">
          <div className="rounded-[.75rem] border border-[#e0e0e0] p-[2rem] sticky top-[90px]">
            <h3 className="text-[22px] font-semibold mb-2 text-black">
              {resourcesPageBanner?.ctaTitle || "Get in touch with our team"}
            </h3>
            <Link
              href={resourcesPageBanner?.ctaButtonLink || "/contact"}
              className="relative w-full bg-[#484AB7] text-white p-5 rounded-xl max-w-[150px] h-[50px] flex items-center text-lg font-semibold hover:bg-[#3c3f9d] transition-colors duration-200 mt-[2rem]"
            >
              <span>{resourcesPageBanner?.ctaButtonText || "Contact"}</span>
              <span className="absolute right-[15px]">→</span>
            </Link>
          </div>
        </div>
      </div>
      {/* Related Resources Section */}
      {relatedResources.length > 0 && (
        <div className="container mx-auto px-0 md:px-[16px] py-[30px] md:py-[60px]">
          <div className="lg:col-span-3">
            <p className="text-[20px] text-[#757575] mb-[0px]">Resources</p>
            <div className="flex items-end md:items-center justify-between mb-6 md:flex-row flex-col gap-4">
              <h2 className="text-[20px] md:text-[38px] font-normal text-black max-w-full md:max-w-[650px]">
                Explore more climate & sustainability resources
              </h2>
              <Link
                href="/resources"
                className="text-black flex items-center gap-2 border border-gray-300 rounded-2xl px-5 py-2 hover:bg-gray-100 transition max-w-[220px] h-[56px] relative justify-center"
              >
                View all Resources <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedResources.map((relatedResource) => (
                <Link
                  key={relatedResource._id}
                  href={`/resources/${relatedResource.slug}`}
                  className="group block "
                >
                  <div className="overflow-hidden transition-shadow duration-300">
                    {relatedResource.image?.asset?.url && (
                      <div className=" relative h-[220px] overflow-hidden rounded-[12px]">
                        <Image
                          src={relatedResource.image.asset.url}
                          alt={relatedResource.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-[12px]"
                        />
                      </div>
                    )}
                    <div className="mt-[24px]">
                      <h3 className="text-[18px] md:text-lg font-semibold text-black mb-2 group-hover:text-blue-600 transition-colors duration-200">
                        {relatedResource.title}
                      </h3>
                      {relatedResource.description && (
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {relatedResource.description}
                        </p>
                      )}
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