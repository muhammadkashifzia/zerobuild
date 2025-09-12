import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import {
  getResource,
  getRelatedResources,
  getResourcesPageBanner,
} from "@/sanity/sanity-utils";
import { Resource } from "@/types/Resource";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CtaSection from "@/components/CtaSection";
import Accordion from "@/components/ui/accordion";
import GallerySlider from "@/components/resource/GallerySlider"; 


export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const resource: Resource = await getResource(slug);

  if (!resource) {
    return {
      title: "Resource Not Found | ZeroBuild",
      description: "The requested resource could not be found.",
    };
  }

  const title = `${resource.title} - ZeroBuild Net Zero Decarbonisation Resource`;
  const description =
    resource.description ||
    `Access ${resource.title} resource from ZeroBuild. Our comprehensive Net Zero decarbonisation knowledge hub provides insights, tools, and guidance for architects, engineers, developers, and local authorities.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://zerobuild.io/resources/${slug}`,
      siteName: "ZeroBuild",
      images: resource.image?.asset?.url
        ? [{ url: resource.image.asset.url, width: 1200, height: 630 }]
        : [{ url: "/assets/images/coding-background-texture.jpg", width: 1200, height: 630 }],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: resource.image?.asset?.url
        ? [resource.image.asset.url]
        : ["/assets/images/coding-background-texture.jpg"],
    },
  };
}


export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const resource: Resource = await getResource(slug);
  const resourcesPageBanner = await getResourcesPageBanner();
  const relatedResources = await getRelatedResources(
    slug,
    resource?.purpose,
    resource?.focusArea
  );

  if (!resource) {
    return (
      <div className="text-center mt-10 text-lg text-red-500">
        Resource not found
      </div>
    );
  }

  return (
    <div className="px-[16px] py-[30px] mx-auto space-y-5 mt-[60px]">
      <Link
        href="/resources"
        className="text-black text-[20px] font-semibold flex gap-[10px] mb-[20px] link items-center"
      >
        <ArrowLeft />
        <span className="hover:link-underline">Back to Resources</span>
      </Link>

      {/* Title + Purpose */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 !mb-[48px]">
        <h1 className="text-black text-[24px] md:text-[40px] leading-[1.1] font-normal max-w-[740px]">
          {resource.title}
        </h1>
        {resource.purpose && Array.isArray(resource.purpose) ? (
          <div className="text-[#9b9b9b] text-[18px] md:text-[24px] leading-tight">
            {resource.purpose[0]}
          </div>
        ) : (
          <div className="text-[#9b9b9b] text-[18px] md:text-[24px] leading-tight">
            {resource.purpose}
          </div>
        )}
      </div>

      {/* ✅ Client Gallery */}
      {resource.gallery && resource.gallery.length > 0 && (
        <GallerySlider gallery={resource.gallery} />
      )}

      {/* Content Section */}
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-[20px] mx-auto pt-[0px] md:pt-[40px] pb-[30px] md:pb-[60px]">
        <div className="lg:col-span-2 space-y-2">
          {resource.image?.asset?.url && (
            <Image
              src={resource.image.asset.url}
              alt={resource.title}
              width={900}
              height={500}
              className="rounded-xl object-cover"
            />
          )}

          {resource.body && (
            <div className="prose max-w-none mt-0 md:mt-8 text-black mb-[48px]">
              <PortableText value={resource.body} />
            </div>
          )}

          {resource.accordion && resource.accordion.length > 0 && (
            <Accordion items={resource.accordion} className="mt-6" />
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

      {/* Related Resources */}
      {relatedResources.length > 0 && (
        <div className="container mx-auto py-[20px] md:py-[60px]">
          <div>
            <p className="text-[20px] text-[#757575]">Resources</p>
            <div className="flex items-end md:items-center justify-between mb-6 md:flex-row flex-col gap-4">
              <h2 className="text-[20px] md:text-[38px] font-normal text-black max-w-full md:max-w-[650px]">
                Explore more climate & sustainability resources
              </h2>
              <Link
                href="/resources"
                className="text-black flex items-center gap-2 border border-gray-300 rounded-2xl px-5 py-2 hover:bg-gray-100 transition max-w-[220px] h-[56px] justify-center"
              >
                View all Resources <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedResources.map((relatedResource) => (
                <Link
                  key={relatedResource._id}
                  href={`/resources/${relatedResource.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden">
                    {relatedResource.image?.asset?.url && (
                      <div className="relative h-[250px] md:h-[220px] overflow-hidden rounded-[12px]">
                        <Image
                          src={relatedResource.image.asset.url}
                          alt={relatedResource.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform rounded-[12px] h-auto"
                        />
                      </div>
                    )}
                    <div className="mt-[24px]">
                      <h3 className="text-[18px] md:text-lg font-semibold text-black mb-2 group-hover:text-blue-600">
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
