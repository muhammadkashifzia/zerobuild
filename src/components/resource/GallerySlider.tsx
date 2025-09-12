"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

export default function GallerySlider({ gallery }: { gallery: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mt-[60px] relative w-full pt-14 overflow-x-hidden project-slider">
      <div className="absolute left-[20px] top-0 z-20 text-lg font-semibold text-black">
        {activeIndex + 1} — {gallery.length}
      </div>
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button className="swiper-button-prev">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button className="swiper-button-next">
          <ArrowRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1.25}
        centeredSlides
        loop={true}
        spaceBetween={10}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
        className="!overflow-visible mb-12"
      >
        {gallery.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src={img.asset?.url ?? "/placeholder.png"}
                alt={`Gallery image ${idx + 1}`}
                width={900}
                height={400}
                className="w-full h-[250px] md:h-[400px] object-cover rounded-xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
