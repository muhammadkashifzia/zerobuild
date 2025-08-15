"use client";
import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const musicSchoolTestimonials = [
  {
    quote:
      "CIBSE – widely respected internationally",
    name: "City of York Council 🇬🇧",
    title: "Active Building Centre (merged into ESC)",
    logo: "/assets/Compliance-logos/5CZLogo.png"
  },
   {
    quote:
      "CIBSE – widely respected internationally",
    name: "City of York Council 🇬🇧",
    title: "Active Building Centre (merged into ESC)",
    logo: "/assets/Compliance-logos/nzr.png"
  },
   {
    quote:
      "CIBSE – widely respected internationally",
    name: "City of York Council 🇬🇧",
    title: "Active Building Centre (merged into ESC)",
    logo: "/assets/Compliance-logos/partl.png"
  },
   {
    quote:
      "CIBSE – widely respected internationally",
    name: "City of York Council 🇬🇧",
    title: "Active Building Centre (merged into ESC)",
    logo: "/assets/Compliance-logos/phc.png"
  },
   {
    quote:
      "CIBSE – widely respected internationally",
    name: "City of York Council 🇬🇧",
    title: "Active Building Centre (merged into ESC)",
    logo: "/assets/Compliance-logos/php.png"
  },
   {
    quote:
      "CIBSE – widely respected internationally",
    name: "City of York Council 🇬🇧",
    title: "Active Building Centre (merged into ESC)",
    logo: "/assets/Compliance-logos/5CZLogo.png"
  },

];

function TestimonialCard() {
  return (
    <div className="w-full relative flex flex-col items-center justify-center overflow-hidden">
    
      <div className="flex justify-center w-full overflow-hidden px-0 sm:px-6 lg:px-8">
        <div className="w-full">
          <InfiniteMovingCards
            items={musicSchoolTestimonials}
            direction="right"
            speed="normal"
          />
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
