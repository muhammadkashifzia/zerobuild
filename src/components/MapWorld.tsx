"use client";
import React, { useState, useEffect } from "react";
import { WorldMap } from "../components/ui/world-map";
import { motion } from "framer-motion"; // ✅ keep only framer-motion
import { WorldMapHeader } from "@/types/home";
import { getWorldMapHeading } from "@/sanity/sanity-utils";

export function MapWorld() {
  // 1. Define 24 countries with coordinates
  const countryCoords: Record<string, { lat: number; lng: number }> = {
    Pakistan: { lat: 30.3753, lng: 69.3451 },
    India: { lat: 20.5937, lng: 78.9629 },
    Bangladesh: { lat: 23.685, lng: 90.3563 },
    China: { lat: 35.8617, lng: 104.1954 },
    Japan: { lat: 35.6762, lng: 139.6503 },
    SouthKorea: { lat: 37.5665, lng: 126.978 },
    UAE: { lat: 23.4241, lng: 53.8478 },
    SaudiArabia: { lat: 24.7136, lng: 46.6753 },
    Qatar: { lat: 25.276987, lng: 51.520008 },
    Turkey: { lat: 38.9637, lng: 35.2433 },
    UK: { lat: 51.5074, lng: -0.1278 },
    France: { lat: 48.8566, lng: 2.3522 },
    Germany: { lat: 52.52, lng: 13.405 },
    Spain: { lat: 40.4637, lng: -3.7492 },
    Italy: { lat: 41.8719, lng: 12.5674 },
    USA: { lat: 40.7128, lng: -74.006 },
    Canada: { lat: 45.4215, lng: -75.6972 },
    Brazil: { lat: -14.235, lng: -51.9253 },
    Argentina: { lat: -38.4161, lng: -63.6167 },
    Nigeria: { lat: 9.082, lng: 8.6753 },
    Egypt: { lat: 26.8206, lng: 30.8025 },
    SouthAfrica: { lat: -30.5595, lng: 22.9375 },
    Australia: { lat: -33.8688, lng: 151.2093 },
    NewZealand: { lat: -40.9006, lng: 174.886 },
  };

  // 2. Define specific connections
  const connections = [
    { from: "Pakistan", to: "UAE" },
    { from: "Pakistan", to: "India" },
    { from: "India", to: "Bangladesh" },
    { from: "Japan", to: "SouthKorea" },
    { from: "China", to: "Pakistan" },
    { from: "SaudiArabia", to: "Qatar" },
    { from: "Turkey", to: "Germany" },
    { from: "France", to: "UK" },
    { from: "Spain", to: "Italy" },
    { from: "USA", to: "Canada" },
    { from: "USA", to: "Brazil" },
    { from: "Argentina", to: "Brazil" },
    { from: "Nigeria", to: "SouthAfrica" },
    { from: "Egypt", to: "SaudiArabia" },
    { from: "Australia", to: "NewZealand" },
    { from: "Japan", to: "Australia" },
    { from: "Germany", to: "France" },
    { from: "UK", to: "USA" },
    { from: "SouthAfrica", to: "Australia" },
    { from: "China", to: "Japan" },
    { from: "India", to: "China" },
    { from: "Bangladesh", to: "Qatar" },
    { from: "NewZealand", to: "Canada" },
    { from: "Brazil", to: "France" },
  ];

  // 3. Transform into dots (start → end)
  const dots = connections.map(({ from, to }) => ({
    start: {
      lat: countryCoords[from].lat,
      lng: countryCoords[from].lng,
      label: from,
    },
    end: {
      lat: countryCoords[to].lat,
      lng: countryCoords[to].lng,
      label: to,
    },
  }));

  // 4. State for heading data
  const [worldMaps, setWorldMaps] = useState<WorldMapHeader | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headingRes = await getWorldMapHeading();

        // ✅ Handle if API returns array or object
        if (Array.isArray(headingRes)) {
          setWorldMaps(headingRes[0] || null);
        } else {
          setWorldMaps(headingRes || null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="py-0 bg-white w-full">
      {worldMaps && (
        <div className="max-w-7xl mx-auto text-center mb-[40px] px-4">
          <p className="font-bold text-[32px] md:text-[48px] text-black max-w-[440px] md:max-w-full mx-auto md:mx-0">
            {worldMaps.mainheading}
            {worldMaps.bluehighlight && (
              <span className="text-[#484AB7] ml-[8px]">
                {worldMaps.bluehighlight.split("").map((letter, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-block"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.03 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            )}
          </p>

          <p className="text-sm md:text-lg text-black max-w-2xl mx-auto py-4">
            {worldMaps.subtext}
          </p>
        </div>
      )}
      <WorldMap dots={dots} lineColor="#484AB7" />
    </div>
  );
}
