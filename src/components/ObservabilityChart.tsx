// app/page.tsx
"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import dynamic from "next/dynamic";
import * as XLSX from "xlsx";
import type { Data, Layout } from "plotly.js";
import Link from "next/link";

interface DataPoint {
  Cost: number;
  Carbon: number;
  ComfortMetric: number;
  ComplianceMetric: number;
  Circularity: number;
  Fabric: string;
  Orientation: string;
  Behaviour: string;
  ComfortLabel?: string;
  ComfortColor?: string;
  ComfortSymbol?: string;
  ComplianceLabel?: string;
  IconPath?: string;
}

// Detailed Data Box Component
const DetailedDataBox = ({
  dataPoint,
  isVisible,
  position,
}: {
  dataPoint: DataPoint | null;
  isVisible: boolean;
  position: { x: number; y: number } | null;
}) => {
  const [boxPosition, setBoxPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);

  useEffect(() => {
    if (!isVisible || !dataPoint || !position) {
      setBoxPosition(null);
      return;
    }

    const updatePosition = () => {
      // Get chart container bounds
      const chartContainer = document.getElementById("observability-chart");
      if (!chartContainer) return;

      const containerRect = chartContainer.getBoundingClientRect();
      const boxWidth = 280; // Approximate box width
      const boxHeight = 200; // Approximate box height
      const offset = 20; // Distance from cursor

      // Calculate initial position
      let left = position.x + offset;
      let top = position.y - boxHeight - offset;

      // Check right boundary
      if (left + boxWidth > containerRect.right) {
        left = position.x - boxWidth - offset;
      }

      // Check left boundary
      if (left < containerRect.left) {
        left = containerRect.left + 10;
      }

      // Check top boundary
      if (top < containerRect.top) {
        top = position.y + offset;
      }

      // Check bottom boundary
      if (top + boxHeight > containerRect.bottom) {
        top = containerRect.bottom - boxHeight - 10;
      }

      setBoxPosition({ left, top });
    };

    updatePosition();

    // Add scroll and resize listeners to update position with debouncing
    let scrollTimeout: NodeJS.Timeout;
    const debouncedUpdatePosition = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updatePosition, 10);
    };

    window.addEventListener("scroll", debouncedUpdatePosition, {
      passive: true,
    });
    window.addEventListener("resize", updatePosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", debouncedUpdatePosition);
      window.removeEventListener("resize", updatePosition);
      clearTimeout(scrollTimeout);
    };
  }, [isVisible, dataPoint, position]);

  if (!isVisible || !dataPoint || !boxPosition) return null;

  return (
    <div
      className="fixed z-50 border border-gray-300 rounded-lg shadow-xl p-3 max-w-sm backdrop-blur-sm"
      style={{
        left: boxPosition.left,
        top: boxPosition.top,
        backgroundColor: dataPoint.ComfortColor,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div className="space-y-1">
        <div className="grid grid-cols-1 text-[12px]">
          <div className="flex gap-2">
            <span className=" font-medium text-white">Fabric:</span>
            <div className="text-white">{dataPoint.Fabric}</div>
          </div>
          <div className="flex gap-2">
            <span className=" font-medium text-white">Orientation:</span>
            <div className="text-white">{dataPoint.Orientation}</div>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-white">Behaviour:</span>
            <div className="text-white">{dataPoint.Behaviour}</div>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-white">Compliance:</span>
            <div className="text-white">{dataPoint.ComplianceLabel}</div>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-white">Comfort:</span>
            <div className="text-white">{dataPoint.ComfortLabel}</div>
          </div>
          <div className="flex gap-2">
            <span className=" font-medium text-white">Cost</span>
            <div className="text-white">£{dataPoint.Cost.toFixed(0)}</div>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-white">Carbon</span>
            <div className="text-white">{dataPoint.Carbon.toFixed(1)}</div>
            <div className="text-[12px] text-white">kgCO₂e/m²</div>
          </div>
          <div className="flex gap-2">
            <div className=" font-medium text-white">Circularity</div>
            <div className="text-white">{dataPoint.Circularity}</div>
            <div className="text-[12px] text-white">score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Compliance Hover Card Component
const ComplianceHoverCard = ({
  dataPoint,
  isVisible,
  position,
}: {
  dataPoint: DataPoint | null;
  isVisible: boolean;
  position: { x: number; y: number } | null;
}) => {
  const [cardPosition, setCardPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);

  useEffect(() => {
    if (!isVisible || !dataPoint || !position) {
      setCardPosition(null);
      return;
    }

    const updatePosition = () => {
      // Get chart container bounds
      const chartContainer = document.getElementById("observability-chart");
      if (!chartContainer) return;

      const containerRect = chartContainer.getBoundingClientRect();
      const cardWidth = 320; // Approximate card width
      const cardHeight = 280; // Approximate card height
      const offset = 25; // Distance from cursor

      // Calculate initial position
      let left = position.x + offset;
      let top = position.y - cardHeight - offset;

      // Check right boundary
      if (left + cardWidth > containerRect.right) {
        left = position.x - cardWidth - offset;
      }

      // Check left boundary
      if (left < containerRect.left) {
        left = containerRect.left + 10;
      }

      // Check top boundary
      if (top < containerRect.top) {
        top = position.y + offset;
      }

      // Check bottom boundary
      if (top + cardHeight > containerRect.bottom) {
        top = containerRect.bottom - cardHeight - 10;
      }

      setCardPosition({ left, top });
    };

    updatePosition();

    // Add scroll and resize listeners to update position with debouncing
    let scrollTimeout: NodeJS.Timeout;
    const debouncedUpdatePosition = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updatePosition, 10);
    };

    window.addEventListener("scroll", debouncedUpdatePosition, {
      passive: true,
    });
    window.addEventListener("resize", updatePosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", debouncedUpdatePosition);
      window.removeEventListener("resize", updatePosition);
      clearTimeout(scrollTimeout);
    };
  }, [isVisible, dataPoint, position]);

  if (!isVisible || !dataPoint || !cardPosition) return null;

  // Get compliance icon
  const complianceIcon =
    dataPoint.IconPath || "/assets/Compliance-logos/default.png";
  const complianceLevel = dataPoint.ComplianceMetric || 0;

  return (
    <div
      className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 max-w-sm backdrop-blur-sm"
      style={{
        left: cardPosition.left,
        top: cardPosition.top,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* Header with compliance icon and level */}
      <div className="flex items-center gap-3 mb-1 border-b border-gray-100">
        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
          <img
            src={complianceIcon}
            alt={dataPoint.ComplianceLabel || "Compliance"}
            className="w-8 h-8 object-contain"
          />
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-sm">
            {dataPoint.ComplianceLabel || "Compliance Level"}
          </div>
          <div className="text-xs text-gray-500">
            Level {complianceLevel} • {dataPoint.Fabric}
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="grid grid-cols-1 text-[12px] text-black">
          {/* <div className="flex gap-2">
    <span className=" font-medium text-black">Fabric:</span>
    <div className="text-black">{dataPoint.Fabric}</div>
  </div> */}
          <div className="flex gap-2">
            <span className=" font-medium text-black">Orientation:</span>
            <div className="text-black">{dataPoint.Orientation}</div>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-black">Behaviour:</span>
            <div className="text-black">{dataPoint.Behaviour}</div>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-black">Compliance:</span>
            <div className="text-black">{dataPoint.ComplianceLabel}</div>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-black">Comfort:</span>
            <div className="text-black">{dataPoint.ComfortLabel}</div>
          </div>
          <div className="flex gap-2">
            <span className=" font-medium text-black">Cost</span>
            <div className="text-black">£{dataPoint.Cost.toFixed(0)}</div>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-black">Carbon</span>
            <div className="text-black">{dataPoint.Carbon.toFixed(1)}</div>
            <div className="text-[12px] text-black">kgCO₂e/m²</div>
          </div>
          <div className="flex gap-2">
            <div className=" font-medium text-black">Circularity</div>
            <div className="text-black">{dataPoint.Circularity}</div>
            <div className="text-[12px] text-black">score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Shimmer Component
const SkeletonShimmer = () => {
  return (
    <div className="w-full h-[620px]  rounded-lg p-6 animate-pulse">
      {/* Title skeleton */}
      <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>

      {/* Chart area skeleton */}
      <div className="relative w-full h-96 bg-gray-100 rounded border-2 border-dashed border-gray-300">
        {/* Y-axis skeleton */}
        <div className="absolute left-[50%] -translate-x-[50%] top-4 space-y-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-3 bg-gray-200 rounded w-8"></div>
          ))}
        </div>

        {/* X-axis skeleton */}
        <div className="absolute bottom-2 left-12 right-4 flex justify-between">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-3 bg-gray-200 rounded w-8"></div>
          ))}
        </div>

        {/* Data points skeleton */}
        <div className="absolute inset-16">
          {[
            { left: 10, top: 20, delay: 0 },
            { left: 25, top: 35, delay: 0.1 },
            { left: 40, top: 15, delay: 0.2 },
            { left: 55, top: 45, delay: 0.3 },
            { left: 70, top: 25, delay: 0.4 },
            { left: 15, top: 60, delay: 0.5 },
            { left: 30, top: 70, delay: 0.6 },
            { left: 45, top: 55, delay: 0.7 },
            { left: 60, top: 75, delay: 0.8 },
            { left: 75, top: 65, delay: 0.9 },
            { left: 20, top: 80, delay: 1.0 },
            { left: 35, top: 85, delay: 1.1 },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-gray-300 rounded-full animate-pulse"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${pos.delay}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Loading text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400 text-lg font-medium">
            Loading chart data...
          </div>
        </div>

        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer"></div>
      </div>

      {/* Legend skeleton */}
      <div className="flex gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>

      <style jsx>{`
        .shimmer {
          animation: shimmer 2s infinite linear;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

// Compact loading skeleton for dynamic Plot component
const PlotLoadingSkeleton = () => (
  <div className="flex items-center justify-center h-full bg-gray-50 rounded">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
      <div className="text-gray-600">Loading chart...</div>
    </div>
  </div>
);

// Dynamic import with skeleton loading
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PlotLoadingSkeleton />,
});

interface ObservabilityChartProps {
  selectedView?: string;
}

// Move static mappings outside component to prevent recreation
const COMFORT_SYMBOL = {
  [-1]: "↓°C",
  0: "◎",
  1: "◎",
  2: "↑°C",
} as const;

const COMFORT_COLOUR = {
  [-1]: "#3B82F6", // blue
  0: "#10B981", // green
  1: "#10B981", // green
  2: "#EF4444", // red
} as const;

const COMPLIANCE_ICON = {
  1: "partl.png",
  2: "nzr.png",
  3: "phc.png",
  4: "php.png",
  5: "5CZLogo.png",
} as const;

const COMPLIANCE_LABEL = {
  1: "Current regulations",
  2: "Net Zero ready",
  3: "Passivhaus Classic",
  4: "Passivhaus Plus",
  5: "Five C Zero",
} as const;

const COMFORT_LABEL_MAP = {
  [-1]: "Underheating",
  0: "Comfortable",
  1: "Feels nice",
  2: "Overheating",
} as const;

export default function ObservabilityChart({
  selectedView = "comfort",
}: ObservabilityChartProps) {
  const [mounted, setMounted] = useState(false);
  const [plotlyReady, setPlotlyReady] = useState(false);
  const [rawData, setRawData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDataPoint, setHoveredDataPoint] = useState<DataPoint | null>(
    null
  );
  const [hoverPosition, setHoverPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [complianceHoverData, setComplianceHoverData] =
    useState<DataPoint | null>(null);
  const [complianceHoverPosition, setComplianceHoverPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [chartZoom, setChartZoom] = useState<{
    x0: number;
    x1: number;
    y0: number;
    y1: number;
  } | null>(null);
  const [plotRef, setPlotRef] = useState<any>(null);
  const plotContainerRef = useRef<HTMLDivElement>(null);

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true);
    // Set a small delay to ensure Plotly is ready
    const timer = setTimeout(() => {
      setPlotlyReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Memoized data processing
  const processedData = useMemo(() => {
    if (!rawData.length) return null;

    // Process data with single pass
    const df: DataPoint[] = rawData.map((row: any) => {
      const cost = (row.Cost || 0) / 100;
      const carbon = (row.Carbon || 0) / 100;
      const comfortMetric = row.ComfortMetric as keyof typeof COMFORT_SYMBOL;
      const complianceMetric =
        row.ComplianceMetric as keyof typeof COMPLIANCE_LABEL;

      return {
        ...row,
        Cost: cost,
        Carbon: carbon,
        ComfortLabel: COMFORT_LABEL_MAP[comfortMetric] || "Unknown",
        ComfortColor: COMFORT_COLOUR[comfortMetric] || "#999999",
        ComfortSymbol: COMFORT_SYMBOL[comfortMetric] || "?",
        ComplianceLabel: COMPLIANCE_LABEL[complianceMetric] || "Unknown",
        IconPath: complianceMetric
          ? "/assets/Compliance-logos/" + COMPLIANCE_ICON[complianceMetric]
          : "/assets/Compliance-logos/default.png",
      };
    });

    // Pre-calculate arrays for traces (avoid mapping in render)
    const costs = df.map((d) => d.Cost);
    const carbons = df.map((d) => d.Carbon);
    const comfortColors = df
      .map((d) => d.ComfortColor)
      .filter((color): color is string => color !== undefined);
    const comfortLabels = df
      .map((d) => d.ComfortLabel)
      .filter((label): label is string => label !== undefined);
    const circularityValues = df.map((d) => d.Circularity);

    // Pre-calculate hover text
    const hoverText = df.map(
      (d) =>
        `Fabric: ${d.Fabric}<br>Orientation: ${d.Orientation}<br>Behaviour: ${d.Behaviour}<br>Compliance: ${d.ComplianceLabel}<br>Comfort: ${d.ComfortLabel}<br>Cost: £${d.Cost.toFixed(0)}/m²<br>Carbon: ${d.Carbon.toFixed(1)} kgCO₂e/m²<br>Circularity: ${d.Circularity}`
    );

    // Calculate sweet spot once
    const top5 = df
      .map((d, index) => ({ ...d, index }))
      .sort((a, b) => a.Cost + a.Carbon - (b.Cost + b.Carbon))
      .slice(0, 5);

    const minCost = Math.min(...costs);
    const maxCost = Math.max(...top5.map((d) => d.Cost));
    const minCarbon = Math.min(...carbons);
    const maxCarbon = Math.max(...top5.map((d) => d.Carbon));

    // Create layout images
    const layoutImages = df.map((d) => ({
      source: d.IconPath,
      x: d.Cost,
      y: d.Carbon,
      xref: "x" as const,
      yref: "y" as const,
      sizex: 20,
      sizey: 20,
      xanchor: "center" as const,
      yanchor: "middle" as const,
      layer: "above" as const,
      visible: false,
    }));

    return {
      df,
      costs,
      carbons,
      comfortColors,
      comfortLabels,
      circularityValues,
      hoverText,
      layoutImages,
      sweetSpot: {
        x0: minCost - 10,
        x1: maxCost + 5,
        y0: minCarbon - 10,
        y1: maxCarbon + 5,
        annotationX: minCost + 0.05,
        annotationY: minCarbon + 0.05,
      },
    };
  }, [rawData]);

  // Memoized plot data based on selected view
  const plotData = useMemo((): Data[] => {
    if (!processedData) return [];

    const {
      df,
      costs,
      carbons,
      comfortColors,
      comfortLabels,
      circularityValues,
      hoverText,
    } = processedData;

    // Determine visibility and title based on selected view
    let trace1Visible = true;
    let trace2Visible = false;
    let imagesVisible = false;

    switch (selectedView) {
      case "cost":
        trace1Visible = true;
        trace2Visible = false;
        imagesVisible = false;
        break;
      case "carbon":
        trace1Visible = true;
        trace2Visible = false;
        imagesVisible = false;
        break;
      case "comfort":
        trace1Visible = true;
        trace2Visible = false;
        imagesVisible = false;
        break;
      case "compliance":
        trace1Visible = false;
        trace2Visible = false;
        imagesVisible = true;
        break;
      case "circularity":
        trace1Visible = false;
        trace2Visible = true;
        imagesVisible = false;
        break;
      default:
        trace1Visible = true;
        trace2Visible = false;
        imagesVisible = false;
    }

    return [
      {
        x: costs,
        y: carbons,
        mode: "markers",
        type: "scatter",
        marker: {
          size: 16,
          color: comfortColors.filter(
            (color): color is string => color !== undefined
          ),
          symbol: "square",
          line: { width: 1, color: "white" },
        },
        text: comfortLabels.filter(
          (label): label is string => label !== undefined
        ),
        hoverinfo: "text",
        name: "Comfort",
        visible: trace1Visible,
        customdata: df as any, // Add the full data for hover events
      } as Data,
      {
        x: costs,
        y: carbons,
        mode: "markers",
        type: "scatter",
        marker: {
          size: 10,
          color: circularityValues,
          colorscale: "Greens",
          reversescale: true,
          colorbar: { title: "Circularity" },
        },
        hovertext: hoverText,
        hoverinfo: "text",
        name: "Circularity",
        visible: trace2Visible,
      } as Data,
      // Hidden trace for compliance hover events
      {
        x: costs,
        y: carbons,
        mode: "markers",
        type: "scatter",
        marker: {
          size: 0, // Invisible markers
          opacity: 0,
        },
        hoverinfo: "none",
        name: "Compliance Hover",
        visible: selectedView === "compliance", // Only visible in compliance view
        customdata: df as any, // Add the full data for hover events
        showlegend: false,
      } as Data,
    ];
  }, [processedData, selectedView]);

  // Memoized layout
  const layout = useMemo((): Partial<Layout> => {
    if (!processedData) return {};

    const { layoutImages, sweetSpot } = processedData;

    // Determine title based on selected view
    let title = "Cost vs Carbon";
    switch (selectedView) {
      case "cost":
        title = "Cost vs Carbon";
        break;
      case "carbon":
        title = "Cost vs Carbon";
        break;
      case "comfort":
        title = "Cost vs Carbon – Comfort";
        break;
      case "compliance":
        title = "Cost vs Carbon – Compliance";
        break;
      case "circularity":
        title = "Cost vs Carbon – Circularity";
        break;
    }

    // Calculate zoom ranges based on selected view
    let zoomRange = null;
    if (selectedView === "compliance") {
      // Zoom to show compliance icons clearly
      const complianceData = processedData.df.filter((d) => d.ComplianceMetric);
      if (complianceData.length > 0) {
        const costs = complianceData.map((d) => d.Cost);
        const carbons = complianceData.map((d) => d.Carbon);
        const costRange = Math.max(...costs) - Math.min(...costs);
        const carbonRange = Math.max(...carbons) - Math.min(...carbons);

        zoomRange = {
          x0: Math.min(...costs) - costRange * 0.12,
          x1: Math.max(...costs) + costRange * 0.12,
          y0: Math.min(...carbons) - carbonRange * 0.12,
          y1: Math.max(...carbons) + carbonRange * 0.12,
        };
      }
    } else if (selectedView === "comfort") {
      // Zoom to show comfort data points clearly
      const comfortData = processedData.df.filter(
        (d) => d.ComfortMetric !== undefined
      );
      if (comfortData.length > 0) {
        const costs = comfortData.map((d) => d.Cost);
        const carbons = comfortData.map((d) => d.Carbon);
        const costRange = Math.max(...costs) - Math.min(...costs);
        const carbonRange = Math.max(...carbons) - Math.min(...carbons);

        zoomRange = {
          x0: Math.min(...costs) - costRange * 0.05,
          x1: Math.max(...costs) + costRange * 0.05,
          y0: Math.min(...carbons) - carbonRange * 0.05,
          y1: Math.max(...carbons) + carbonRange * 0.05,
        };
      }
    } else if (selectedView === "circularity") {
      // Zoom to show circularity data points clearly
      const circularityData = processedData.df.filter(
        (d) => d.Circularity !== undefined
      );
      if (circularityData.length > 0) {
        const costs = circularityData.map((d) => d.Cost);
        const carbons = circularityData.map((d) => d.Carbon);
        const costRange = Math.max(...costs) - Math.min(...costs);
        const carbonRange = Math.max(...carbons) - Math.min(...carbons);

        zoomRange = {
          x0: Math.min(...costs) - costRange * 0.05,
          x1: Math.max(...costs) + costRange * 0.05,
          y0: Math.min(...carbons) - carbonRange * 0.05,
          y1: Math.max(...carbons) + carbonRange * 0.05,
        };
      }
    }

    return {
      // title: { text: title },
      xaxis: {
        title: { text: "Cost (£/m²)" },
        ...(zoomRange && { range: [zoomRange.x0, zoomRange.x1] }),
        autorange: !zoomRange,
      },
      yaxis: {
        title: { text: "Carbon (kgCO₂e/m²)" },
        ...(zoomRange && { range: [zoomRange.y0, zoomRange.y1] }),
        autorange: !zoomRange,
      },
      shapes: [
        {
          type: "rect",
          xref: "x",
          yref: "y",
          x0: sweetSpot.x0,
          x1: sweetSpot.x1,
          y0: sweetSpot.y0,
          y1: sweetSpot.y1,
          fillcolor: "transparent",
          line: { color: "transparent", width: 1 },
          layer: "below",
        },
      ],
      annotations: [],
      images: layoutImages.map((img) => ({
        ...img,
        visible: selectedView === "compliance",
        sizex: selectedView === "compliance" ? 50 : 50, // Larger icons for compliance view
        sizey: selectedView === "compliance" ? 200 : -60,
      })),
    };
  }, [processedData, selectedView]);

  // Optimized data fetching
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const file = await fetch("/assets/file/optioneering_min_final.xlsx");
      if (!file.ok) {
        throw new Error(`Failed to fetch file: ${file.status}`);
      }

      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer);
      const worksheet = workbook.Sheets["Sample dataset"];
      const rawData = XLSX.utils.sheet_to_json<any>(worksheet);

      // Clean column names efficiently
      const cleanedData = rawData.map((row: any) => {
        const cleanedRow: any = {};
        for (const [key, value] of Object.entries(row)) {
          const cleanKey = key.trim();
          let finalKey = cleanKey;

          // Use switch for better performance
          switch (cleanKey) {
            case "User behaviour":
              finalKey = "Behaviour";
              break;
            case "Compliance - metric":
              finalKey = "ComplianceMetric";
              break;
            case "Comfort - metric":
              finalKey = "ComfortMetric";
              break;
          }

          cleanedRow[finalKey] = value;
        }
        return cleanedRow;
      });

      setRawData(cleanedData);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle hover events for detailed data box
  const handleHover = useCallback(
    (event: any) => {
      if (event.points && event.points.length > 0) {
        const point = event.points[0];
        const dataPoint = point.customdata as DataPoint;

        if (dataPoint) {
          if (selectedView === "comfort") {
            setHoveredDataPoint(dataPoint);
            setHoverPosition({
              x: event.event.clientX,
              y: event.event.clientY,
            });
            // Clear compliance hover when in comfort view
            setComplianceHoverData(null);
            setComplianceHoverPosition(null);
          } else if (selectedView === "compliance") {
            setComplianceHoverData(dataPoint);
            setComplianceHoverPosition({
              x: event.event.clientX,
              y: event.event.clientY,
            });
            // Clear comfort hover when in compliance view
            setHoveredDataPoint(null);
            setHoverPosition(null);
          }
        }
      }
    },
    [selectedView]
  );

  const handleUnhover = useCallback(() => {
    if (selectedView === "comfort") {
      setHoveredDataPoint(null);
      setHoverPosition(null);
    } else if (selectedView === "compliance") {
      setComplianceHoverData(null);
      setComplianceHoverPosition(null);
    }
  }, [selectedView]);

  // Reset zoom function
  const resetZoom = useCallback(() => {
    // Force chart to reset by triggering a re-render
    setChartZoom(null);

    // Use a timeout to ensure the state update has taken effect
    setTimeout(() => {
      if (plotRef && plotRef.layout) {
        try {
          plotRef.relayout({
            "xaxis.autorange": true,
            "yaxis.autorange": true,
          });
        } catch (error) {
          console.log("Reset zoom error:", error);
        }
      }
    }, 50);
  }, [plotRef]);

  // Don't render until component is mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div id="observability-chart" className="w-fullbpx-[16px]">
        <div className="w-full bg-white p-[10px] md:p-[20px] rounded-lg shadow-md">
          <SkeletonShimmer />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="w-full h-[600px] flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <div className="font-medium mb-2">Error loading chart</div>
            <div className="text-sm">{error}</div>
            <button
              onClick={fetchData}
              className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 rounded text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="observability-chart" className="w-fullbpx-[16px]">
      <div className="w-full bg-white p-[10px] md:p-[20px] rounded-lg shadow-md flex flex-col gap-[50px]">
        {isLoading ? (
          <SkeletonShimmer />
        ) : plotData.length > 0 ? (
          <div className="relative h-[900px]">
            {/* Comfort Legend */}
            {selectedView === "comfort" && (
              <div className="flex justify-center items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#10B981] rounded"></div>
                  <span className="text-sm font-medium">Comfortable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#EF4444] rounded"></div>
                  <span className="text-sm font-medium">Overheating</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#3B82F6] rounded"></div>
                  <span className="text-sm font-medium">Underheating</span>
                </div>
              </div>
            )}

            {/* Compliance Legend */}
            {selectedView === "compliance" && (
              <div className="flex justify-center items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/Compliance-logos/partl.png"
                    alt="Current regulations"
                    className="w-6 h-6"
                  />
                  <span className="text-sm font-medium">
                    Current regulations
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/Compliance-logos/nzr.png"
                    alt="Net Zero ready"
                    className="w-6 h-6"
                  />
                  <span className="text-sm font-medium">Net Zero ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/Compliance-logos/phc.png"
                    alt="Passivhaus Classic"
                    className="w-6 h-6"
                  />
                  <span className="text-sm font-medium">
                    Passivhaus Classic
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/Compliance-logos/php.png"
                    alt="Passivhaus Plus"
                    className="w-6 h-6"
                  />
                  <span className="text-sm font-medium">Passivhaus Plus</span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/Compliance-logos/5CZLogo.png"
                    alt="Five C Zero"
                    className="w-6 h-6"
                  />
                  <span className="text-sm font-medium">Five C Zero</span>
                </div>
              </div>
            )}

            {/* Circularity Legend */}
            {selectedView === "circularity" && (
              <div className="flex justify-center items-center gap-4 mt-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 rounded"></div>
                  <span className="text-sm font-medium">Low Circularity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-300 rounded"></div>
                  <span className="text-sm font-medium">
                    Medium Circularity
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-600 rounded"></div>
                  <span className="text-sm font-medium">High Circularity</span>
                </div>
              </div>
            )}
            {/* Reset Zoom Button */}
            {/* {chartZoom && (
              <button
                onClick={resetZoom}
                className="absolute top-2 right-2 z-10 bg-white border border-gray-300 rounded-md px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
                title="Reset zoom"
              >
                Reset Zoom
              </button>
            )} */}
            {(() => {
              try {
                if (!plotlyReady) {
                  return <PlotLoadingSkeleton />;
                }
                return (
                  <Plot
                    data={plotData}
                    layout={layout}
                    config={{
                      responsive: true,
                      displayModeBar: false,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      paddingBottom: "20px",
                    }}
                    onHover={handleHover}
                    onUnhover={handleUnhover}
                    onRelayout={(eventData) => {
                      // Store zoom state when user manually zooms
                      const x0 = eventData["xaxis.range[0]"];
                      const x1 = eventData["xaxis.range[1]"];
                      const y0 = eventData["yaxis.range[0]"];
                      const y1 = eventData["yaxis.range[1]"];

                      if (
                        typeof x0 === "number" &&
                        typeof x1 === "number" &&
                        typeof y0 === "number" &&
                        typeof y1 === "number"
                      ) {
                        setChartZoom({
                          x0,
                          x1,
                          y0,
                          y1,
                        });
                      }
                    }}
                    onInitialized={(figure) => {
                      setPlotRef(figure);
                    }}
                    onError={(error) => {
                      console.error("Plotly error:", error);
                      setError("Failed to load chart");
                    }}
                  />
                );
              } catch (error) {
                console.error("Plot component error:", error);
                return (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">⚠️</div>
                      <div className="text-lg font-medium">
                        Chart loading error
                      </div>
                      <div className="text-sm">Please refresh the page</div>
                    </div>
                  </div>
                );
              }
            })()}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full  rounded-lg">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-lg font-medium">No data available</div>
              <div className="text-sm">Please check your data source</div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-[12px] text-gray-500">
            See how the Five C Framework helps you priortise the right decisions
          </p>
          <a
            href="https://outlook.office.com/book/ZeroBuildDiscoveryCall@zerobuild.io/s/0j-Jsl27BUuEcZ2ortBjhA2?ismsaljsauthenabled"
            target="_blank"
            className="w-full bg-[#484AB7] text-white border-neutral-200 px-2 rounded-xl max-w-[185px] h-[45px] flex items-center justify-center text-[16px] font-semibold hover:bg-[#3c3f9d] transition-colors duration-200"
          >
            Try the full toolset
          </a>
        </div>
      </div>

      {/* Detailed Data Box */}
      <DetailedDataBox
        dataPoint={hoveredDataPoint}
        isVisible={selectedView === "comfort" && !!hoveredDataPoint}
        position={hoverPosition}
      />

      {/* Compliance Hover Card */}
      <ComplianceHoverCard
        dataPoint={complianceHoverData}
        isVisible={selectedView === "compliance" && !!complianceHoverData}
        position={complianceHoverPosition}
      />
    </div>
  );
}
