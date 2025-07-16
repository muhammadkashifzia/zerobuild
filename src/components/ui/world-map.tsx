"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMap({
  dots = [
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
  ],
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const { theme } = useTheme();

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: theme === "dark" ? "black" : "white",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full bg-white relative font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="[mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none h-auto md:h-[395px] w-full object-cover object-top"
        alt="world map"
        height="395"
        width="1056"
        draggable={true}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
              />
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

       {dots.map((dot, i) => (
  <g key={`points-group-${i}`}>
    {/* Start Point */}
    <g>
      <circle
        cx={projectPoint(dot.start.lat, dot.start.lng).x}
        cy={projectPoint(dot.start.lat, dot.start.lng).y}
        r="4"
        fill={lineColor}
      >
        {dot.start.label && <title>{dot.start.label}</title>}
      </circle>
      <circle
        cx={projectPoint(dot.start.lat, dot.start.lng).x}
        cy={projectPoint(dot.start.lat, dot.start.lng).y}
        r="4"
        fill={lineColor}
        opacity="0.5"
      >
        <animate attributeName="r" from="4" to="12" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </g>

    {/* End Point */}
    <g>
      <circle
        cx={projectPoint(dot.end.lat, dot.end.lng).x}
        cy={projectPoint(dot.end.lat, dot.end.lng).y}
        r="4"
        fill={lineColor}
      >
        {dot.end.label && <title>{dot.end.label}</title>}
      </circle>
      <circle
        cx={projectPoint(dot.end.lat, dot.end.lng).x}
        cy={projectPoint(dot.end.lat, dot.end.lng).y}
        r="4"
        fill={lineColor}
        opacity="0.5"
      >
        <animate attributeName="r" from="4" to="12" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </g>
  </g>
))}

      </svg>
    </div>
  );
}
