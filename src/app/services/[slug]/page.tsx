import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { getService, getServices, getServicesPageBanner } from "@/sanity/sanity-utils";
import { Service } from "@/types/Service";
import type { Metadata } from "next";
import Accordion from "@/components/ui/accordion";
import { ArrowRight, ArrowLeft } from "lucide-react";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service: Service = await getService(slug);

  if (!service) {
    return {
      title: "Service Not Found | ZeroBuild",
      description: "The requested service could not be found.",
    };
  }

  const title = `${service.title} - ZeroBuild Net Zero Decarbonisation Services`;
  const description = service.description || `Explore ${service.title} services from ZeroBuild. Our expert Net Zero decarbonisation solutions help architects, engineers, developers, and local authorities achieve their sustainability goals.`;
  const keywords = `${service.title}, ZeroBuild services, Net Zero decarbonisation, ${service.disciplines?.join(', ') || 'sustainability services'}, built environment, carbon assessment, energy modelling, retrofit, new build, architects, engineers, developers, local authorities, housing associations`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://zerobuild.io/services/${slug}`,
      siteName: 'ZeroBuild',
      images: service.image?.asset?.url ? [
        {
          url: service.image.asset.url,
          width: 1200,
          height: 630,
          alt: `${service.title} - ZeroBuild Services`,
        },
      ] : [
        {
          url: '/assets/images/coding-background-texture.jpg',
          width: 1200,
          height: 630,
          alt: `${service.title} - ZeroBuild Services`,
        },
      ],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: service.image?.asset?.url ? [service.image.asset.url] : ['/assets/images/coding-background-texture.jpg'],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>; // Changed to Promise
}) {
  const { slug } = await params; // Await the params
  const service: Service = await getService(slug); // Use the awaited slug
  const allServices = await getServices(); // Fetch all services for the banner
  const servicesPageBanner = await getServicesPageBanner();

  if (!service) {
    return (
      <div className="text-center mt-10 text-lg text-red-500">
        Service not found
      </div>
    );
  }

  // Build related services: 3 by discipline and 3 by project stage (no duplicates)
  const sharesAnyTag = (a?: string[], b?: string[]) => {
    if (!a || !b) return false;
    return a.some((item) => b.includes(item));
  };

  const candidates = allServices.filter((s) => s._id !== service._id);

  const relatedByDiscipline = candidates
    .filter((s) => sharesAnyTag(s.disciplines, service.disciplines))
    .slice(0, 3);

  const disciplineIds = new Set(relatedByDiscipline.map((s) => s._id));

  const relatedByProjectStage = candidates
    .filter((s) => !disciplineIds.has(s._id))
    .filter((s) => sharesAnyTag(s.projectStage, service.projectStage))
    .slice(0, 3);

  const hasAnyRelated =
    relatedByDiscipline.length > 0 || relatedByProjectStage.length > 0;

  return (
    <div className="px-[16px] md:p-8 mx-auto space-y-5 mt-16">
          <Link href="/services" className="text-black text-[20px] font-semibold flex gap-[10px] mb-[30px] link items-center"> <ArrowLeft /> 
      <span className="hover:link-underline">Back to Services</span>
      </Link>
      {(service.gallery?.length ?? 0) > 0 && (
        <div>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(service.gallery ?? []).map((img, idx) => (
              <Image
                key={idx}
                src={img.asset.url}
                alt={`Gallery image ${idx + 1}`}
                width={400}
                height={300}
                className="rounded-md object-cover w-full h-auto md:h-[300px] lg:h-[400px] object-top shadow-md"
              />
            ))}
          </div>
        </div>
      )}
      <h1 className="text-black !mt-[40px] text-[40px] leading-9 font-bold max-w-full md:max-w-[650px]">{service.title}</h1>
      <div className="container grid grid-cols-1 lg:grid-cols-3 px-0 md:px-[16px] gap-[20px] mx-auto pt-0 md:pt-[40px] pb-[60px]">
        {/* Left: Content */}
        <div className="lg:col-span-2 space-y-2">
          {/* Cover Image */}
          {service.image?.asset?.url && (
            <Image
              src={service.image.asset.url}
              alt={service.title}
              width={900}
              height={500}
              className="rounded-xl object-cover"
            />
          )}
       
          {/* {(service.disciplines?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {(service.disciplines ?? []).map((discipline: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                >
                  {discipline}
                </span>
              ))}
            </div>
          )}

       
          {(service.projectStage?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
            
              {(service.projectStage ?? []).map((stage: string, index: number) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full"
                >
                  {stage}
                </span>
              ))}
            </div>
          )} */}

          {/* Rich Body Content */}
          {service.body && (
            <div className="prose prose-blue max-w-none mt-8 text-black mb-[48px] service-body-content">
              <PortableText
                value={service.body}
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

          {/* FAQ Accordion */}
          {service.accordion && service.accordion.length > 0 && (
            <div>
              <Accordion 
                items={service.accordion} 
                className="max-w-none"
              />
            </div>
          )}

          
        </div>

        {/* Right: CTA */}
        <div className="lg:col-span-1">
          <div className="rounded-[.75rem] border border-[#e0e0e0] p-[2rem] sticky top-[90px]">
            <h3 className="text-[22px] font-semibold mb-2 text-black">
              {servicesPageBanner?.ctaTitle || "Get in touch with our team"}
            </h3>
            <Link
              href={servicesPageBanner?.ctaButtonLink || "/contact"}
              className="relative w-full bg-[#484AB7] text-white p-5 rounded-xl max-w-[150px] h-[50px] flex items-center text-lg font-semibold hover:bg-[#3c3f9d] transition-colors duration-200 mt-[2rem]"
            >
              <span>{servicesPageBanner?.ctaButtonText || "Contact"}</span>
              <span className="absolute right-[15px]">→</span>
            </Link>
          </div>
        </div>
      </div>
         <section className="container mx-auto">
      <div className="bg-gray-50 py-12 px-4 md:px-12">
        {/* Heading */}
        <p className="text-sm text-gray-600 mb-2">Explore</p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-medium mb-4 md:mb-0 text-black">
            Discover more of our expertise:
          </h2>
          <Link href="/services" className="text-black flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 hover:bg-gray-100 transition">
            View all services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related Services: 3 by Discipline, 3 by Project Stage */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-2xl md:text-3xl font-medium mb-6 text-black">Services</h3>
          {hasAnyRelated ? (
            <div className="space-y-5">
              {relatedByDiscipline.length > 0 && (
                <div>
      
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 md:gap-x-8 text-gray-800">
                    {relatedByDiscipline.map((serviceItem, index) => (
                      <Link
                        key={serviceItem._id}
                        href={`/services/${serviceItem.slug}`}
                        className={`pr-4 border-gray-200 hover:text-[#484AB7] transition-colors duration-200 ${
                          (index + 1) % 2 === 0 && "sm:border-r md:border-none"
                        } ${index < 4 && "sm:pb-4"}`}
                      >
                        {serviceItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedByProjectStage.length > 0 && (
                <div>
        
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 md:gap-x-8 text-gray-800">
                    {relatedByProjectStage.map((serviceItem, index) => (
                      <Link
                        key={serviceItem._id}
                        href={`/services/${serviceItem.slug}`}
                        className={`pr-4 border-gray-200 hover:text-[#484AB7] transition-colors duration-200 ${
                          (index + 1) % 2 === 0 && "sm:border-r md:border-none"
                        } ${index < 4 && "sm:pb-4"}`}
                      >
                        {serviceItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 md:gap-x-8 text-gray-800">
              {allServices
                .filter((s) => s._id !== service._id)
                .slice(0, 6)
                .map((serviceItem, index) => (
                  <Link
                    key={serviceItem._id}
                    href={`/services/${serviceItem.slug}`}
                    className={`pr-4 border-gray-200 hover:text-[#484AB7] transition-colors duration-200 ${
                      (index + 1) % 2 === 0 && "sm:border-r md:border-none"
                    } ${index < 4 && "sm:pb-4"}`}
                  >
                    {serviceItem.title}
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
    </div>
  );
}