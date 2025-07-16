"use client";
import { WorldMap } from "@/components/ui/world-map";
import { motion } from "framer-motion";

export function MapWorld() {
  return (
    <div className="py-0 bg-white w-full">
      <div className="max-w-7xl mx-auto text-center mb-[40px]">
        <p className="font-bold text-[32px] md:text-[48px] text-black max-w-[290px] md:max-w-full mx-auto md:mx-0">
          Trusted by teams
          <span className="text-[#484AB7] ml-[5px]">
            {"worldwide.".split("").map((letter, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-black max-w-2xl mx-auto py-4">
          We have supported new build and retrofit design strategies across sectors and regions,
          delivering clarity, speed and better outcomes.
        </p>
      </div>

      <WorldMap
        dots={[
          { start: { lat: 30.3753, lng: 69.3451 }, end: { lat: 20.5937, lng: 78.9629 } }, // Pakistan → India
          { start: { lat: 30.3753, lng: 69.3451 }, end: { lat: 35.8617, lng: 104.1954 } }, // Pakistan → China
          { start: { lat: 30.3753, lng: 69.3451 }, end: { lat: 23.4241, lng: 53.8478 } }, // Pakistan → UAE
          { start: { lat: 30.3753, lng: 69.3451 }, end: { lat: 24.7136, lng: 46.6753 } }, // Pakistan → Saudi Arabia
          { start: { lat: 30.3753, lng: 69.3451 }, end: { lat: 25.276987, lng: 51.520008 } }, // Pakistan → Qatar
          { start: { lat: 30.3753, lng: 69.3451 }, end: { lat: 38.9637, lng: 35.2433 } }, // Pakistan → Turkey
          { start: { lat: 30.3753, lng: 69.3451 }, end: { lat: 51.5074, lng: -0.1278 } }, // Pakistan → UK
          { start: { lat: 30.3753, lng: 69.3451 }, end: { lat: 40.7128, lng: -74.006 } }, // Pakistan → USA
          { start: { lat: 30.3753, lng: 69.3451 }, end: { lat: 45.4215, lng: -75.6972 } }, // Pakistan → Canada
          { start: { lat: 30.3753, lng: 69.3451 }, end: { lat: 52.52, lng: 13.405 } }, // Pakistan → Germany
          { start: { lat: 30.3753, lng: 69.3451 }, end: { lat: 48.8566, lng: 2.3522 } }, // Pakistan → France
          { start: { lat: 30.3753, lng: 69.3451 }, end: { lat: -33.8688, lng: 151.2093 } }, // Pakistan → Australia
          { start: { lat: 30.3753, lng: 69.3451 }, end: { lat: 35.6762, lng: 139.6503 } }, // Pakistan → Japan
          { start: { lat: 30.3753, lng: 69.3451 }, end: { lat: -30.5595, lng: 22.9375 } }, // Pakistan → South Africa
        ]}
      />
    </div>
  );
}
