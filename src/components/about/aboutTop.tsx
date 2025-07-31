// components/FionaProfile.tsx
"use client"; // use this only if you're using the app directory

import Image from "next/image";

export default function AboutTop() {
  return (
    <div>
      <div className="container mx-auto px-[16px]">
        <h1 className="text-[32px] md:text-[68px] font-bold mb-4 text-black">About Us</h1>
        <p className="text-[#525050] mb-8 text-[20px]">
          We believe buildings can be perfect, because they are built on data,
          Data that can shape perfectly comfortable homes for every age group,
          weather and location Data that can help us choose materials with the
          lowest environmental impact. Data that can optimise how we use
          resources, and Data that can help even generate income from energy
          rather than simply paying for it Data that can inform all functional,
          and technical design decisions with measurable outcomes. Our mission
          is to harness this data to create buildings that are not just
          compliant, but outstanding in comfort, carbon performance, cost
          efficiency, and circularity. We bring clarity to Net Zero by turning
          complexity into simple, confident decisions.
        </p>
        <Image
          src="/assets/images/about-image.png"
          alt="About Us"
          width={1200}
          height={600}
          className="w-full h-auto object-cover rounded-lg mb-8 max-w-full md:max-w-[800px] mx-auto"
        />
      </div>
    </div>
  );
}
