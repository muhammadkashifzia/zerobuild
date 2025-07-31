// components/FionaProfile.tsx
"use client"; 
import Image from "next/image";
export default function AboutTop() {
  return (
          <div>
       <section
        className="pt-[4rem] pb-24 mb-10"
        style={{
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundImage: `url("/assets/images/coding-background-texture.jpg"), linear-gradient(180deg, #474ab6 0%, #9271f6 100%)`,
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-6xl font-normal text-white leading-tight max-w-4xl">
            About Us
          </h1>
          <p className="text-base md:text-2xl text-white mt-4 max-w-3xl">
            From metro systems to concert halls, our sustainability projects
            shape a better world.
          </p>
        </div>
      </section>
         <div className="container mx-auto px-[16px]">
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
