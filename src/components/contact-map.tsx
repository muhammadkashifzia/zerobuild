"use client";
import {WorldMap } from "@/components/ui/contact-world-map";
import { motion } from "motion/react";

export function WorldMapDemo() {
  return (
    <div className="dark:bg-black bg-white w-full ">
     
      <WorldMap
        dots={[
          {
            start: { lat: 53.4808, lng: -2.2426, label: "Manchester" }, // Manchester
            end: { lat: 28.6139, lng: 77.209, label: "New Delhi" }, // New Delhi
          },
        ]}
      />
    </div>
  );
}
