import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// ✅ Fetch single service by slug
async function getServiceBySlug(slug: string) {
  const res = await fetch(
    `https://zerobuild.eastlogic.com/wp-json/wp/v2/services?slug=${slug}&_embed`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch service");
  }

  const data = await res.json();
  return data.length > 0 ? data[0] : null;
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getServiceBySlug(params.slug);
  if (!service) return notFound();

  const title = service.title?.rendered || "Untitled";
  const content = service.content?.rendered || "";
  const featuredImage =
    service._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  // ✅ Fetch custom gallery images from meta field (set in WordPress functions.php)
  const galleryImages: { url: string; thumbnail: string; alt: string }[] =
    service.custom_gallery || [];

  return (
    <main className="text-gray-900 my-[120px]">
      {/* Back link */}
      <div className="container mx-auto px-[16px]">
        <Link href="/services" className="flex items-center gap-[15px]">
          <ArrowLeft />
          <span className="text-[20px]">Back to services</span>
        </Link>
      </div>

      {/* ✅ Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-4">
          {galleryImages.slice(0, 6).map((img, i) => (
            <div key={i} className="relative aspect-[4/3]">
              <Image
                src={img.url}
                alt={img.alt || `Image ${i + 1}`}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </section>
      )}

      {/* Main Section */}
      <div className="container grid grid-cols-1 lg:grid-cols-3 px-[16px] gap-[20px] mx-auto py-[80px]">
        {/* Left: Content */}
        <div className="lg:col-span-2 space-y-6">
          <h1
            className="text-3xl md:text-4xl font-semibold"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div
            className="text-gray-700 space-y-4 prose prose-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Right: CTA */}
        <div className="lg:col-span-1">
          <div className="rounded-[.75rem] border border-[#e0e0e0] p-[2rem]">
            <h3 className="text-[22px] font-semibold mb-2">
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
    </main>
  );
}
