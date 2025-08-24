"use client";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import dynamic from "next/dynamic";
import * as XLSX from "xlsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

interface ObservabilityRadarChartProps {
  newBuildButtonText?: string;
  retrofitButtonText?: string;

  mainHeading?: unknown;
  newBuildIntroText?: unknown;
  newBuildSummaryText?: unknown;
  newBuildResultText?: unknown;
  newBuildResultCta?: { text?: string; link?: string };
  retrofitIntroText?: unknown;
  retrofitContent?: unknown;
  retrofitSlider?: Array<{
    image: { asset?: { url: string; metadata?: { dimensions?: { width: number; height: number } } } };
    altText: string;
  }>;
  retrofitResultText?: string;
  retrofitButtonUrl?: string;
}

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

// Chart loading skeleton
const ChartSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
      </div>
    </div>
  </div>
);

interface OptionData {
  Fabric: string;
  Orientation: string;
  User_behaviour: string;
  Carbon: number;
  Cost: number;
  Comfort_metric: number;
  Circularity: number;
  Compliance_metric: number;
  carbon_5cz: number;
  cost_5cz: number;
  comfort_5cz: number;
  circularity_5cz: number;
  compliance_5cz: number;
  color_tag: string;
}

// Cache for processed data
let dataCache: {
  rawData: OptionData[];
  combinedData: OptionData[];
  summaryData: OptionData[];
} | null = null;

// Shimmer loading component
const LoadingSkeleton: React.FC = () => (
  <div className="max-w-[1024px] mx-auto px-4 py-8">
    {/* Title skeleton */}
    <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-8 w-1/3 animate-pulse bg-[length:200%_100%] animate-shimmer"></div>

    {/* All Options Skeleton */}
    <div>
      <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-4 w-1/4 animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
      <div className="bg-white p-4 rounded-lg shadow-lg min-w-[2000px]">
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Summary Options Skeleton */}
    <div>
      <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-4 w-1/4 animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <style jsx>{`
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
    `}</style>
  </div>
);

// Memoized constants
const THETA_LABELS = [
  "Carbon",
  "Cost",
  "Comfort",
  "Circularity",
  "Compliance",
  "Carbon",
];
const COMFORT_SCORE_MAP: Record<number, number> = {
  [-1]: 35,
  0: 90,
  1: 75,
  2: 35,
};
const COMPLIANCE_SCORE_MAP: Record<number, number> = {
  1: 50,
  2: 60,
  3: 70,
  4: 80,
  5: 90,
};
const COLOR_MAP: Record<string, string> = {
  blue: "rgba(173,216,230,0.4)",
  red: "rgba(255,0,0,0.4)",
  green: "rgba(0,128,0,0.4)",
  purple: "rgba(128,0,128,0.4)",
  goldenrod: "rgba(218,165,32,0.4)",
};

const OptioneeringVisualization: React.FC<ObservabilityRadarChartProps> = ({
  newBuildButtonText = "New Build",
  retrofitButtonText = "Retrofit",

  mainHeading = "Pick your Project Type",
  newBuildIntroText = "Ever wondered what might've happened if you chose a different strategy, system, or construction method? One that could have performed better over the long term?",
  newBuildSummaryText = "We eliminate poor-performing and non-compliant options and score the remaining against the client's priorities. This helps us get clear, evidence-based rationale for the design decisions. We recommend using these outputs to develop brief for architects and engineers",
  newBuildResultText = "The result: A confident, futureproof path to Net Zero from day one.",
  newBuildResultCta,
  retrofitIntroText = "We then simulate and compare retrofit pathways:",
  retrofitContent,
  retrofitSlider,
  retrofitResultText = "The result: a clear pathway to improvement that's aligned with both project's values and Net Zero goals.",
  retrofitButtonUrl,
}) => {
  // Debug logging for props
  console.log("ObservabilityRadarChart props received:", {
    newBuildButtonText,
    retrofitButtonText,
    mainHeading,
    newBuildIntroText,
    newBuildSummaryText,
    newBuildResultText,
    newBuildResultCta,
    retrofitIntroText,
    retrofitContent,
    retrofitSlider,
    retrofitResultText,
    retrofitButtonUrl,
  });
  
  // Validate required props
  if (!newBuildButtonText || !retrofitButtonText) {
    console.warn("ObservabilityRadarChart: Missing button text props", { newBuildButtonText, retrofitButtonText });
  }
  const [rawData, setRawData] = useState<OptionData[]>([]);
  const [combinedData, setCombinedData] = useState<OptionData[]>([]);
  const [summaryData, setSummaryData] = useState<OptionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [projectType, setProjectType] = useState<
    "new-build" | "retrofit" | null
  >("new-build");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const safeText = (value: unknown, fallback: string): string =>
    typeof value === "string" && value.trim().length > 0 ? value : fallback;

  const isBlocks = (value: unknown): value is any[] =>
    Array.isArray(value) && (value as any[]).length > 0 && typeof (value as any[])[0] === "object";

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchData = async () => {
      try {
        console.log("Starting data fetch...");
        
        // Check cache first
        if (dataCache && dataCache.rawData && dataCache.combinedData && dataCache.summaryData) {
          console.log("Using cached data");
          setRawData(dataCache.rawData);
          setCombinedData(dataCache.combinedData);
          setSummaryData(dataCache.summaryData);
          setIsLoading(false);
          return;
        }

        console.log("Fetching Excel file...");
        const response = await fetch(
          "/assets/file/optioneering_min_final.xlsx"
        );
        
        if (!response.ok) {
          console.error("Excel file fetch failed:", response.status, response.statusText);
          throw new Error(`Failed to fetch Excel file: ${response.status} ${response.statusText}`);
        }

        console.log("Excel file fetched successfully, processing...");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);
        const worksheet = workbook.Sheets["5C"];
        
        if (!worksheet) {
          console.error("Worksheet '5C' not found in Excel file");
          throw new Error("Worksheet '5C' not found in Excel file");
        }
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log("Excel data parsed:", jsonData?.length, "rows");
        
        if (!jsonData || !Array.isArray(jsonData) || jsonData.length === 0) {
          console.error("No data found in worksheet");
          throw new Error("No data found in worksheet");
        }

        console.log("Processing raw data...");
        const processedData = processRawData(jsonData);
        console.log("Processed data:", processedData?.length, "rows");
        
        const sampledData = sampleAndCombineData(processedData);
        console.log("Sampled data:", sampledData?.length, "rows");
        
        const summary = createSummaryData(sampledData);
        console.log("Summary data:", summary?.length, "rows");

        // Cache the results
        if (processedData && sampledData && summary) {
          dataCache = {
            rawData: processedData,
            combinedData: sampledData,
            summaryData: summary,
          };
          console.log("Data cached successfully");
        }

        setRawData(processedData || []);
        setCombinedData(sampledData || []);
        setSummaryData(summary || []);
        setIsLoading(false);
        console.log("Data loading completed successfully");
      } catch (err) {
        console.error("Error in data fetch:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isClient]);

  // Don't render anything until client-side
  if (!isClient) {
    return <LoadingSkeleton />;
  }

  if (isLoading) return <LoadingSkeleton />;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!rawData || rawData.length === 0)
    return <div className="text-center py-8 text-gray-500">No data available</div>;

  const handleProjectTypeChange = (type: "new-build" | "retrofit") => {
    if (type === projectType) return;
    setProjectType(type);
  };

  return (
    <div className="max-w-[1024px] mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[24px] md:text-[38px] font-bold mb-8 text-black text-center max-w-full md:max-w-[900px] mx-auto"
              >
          {safeText(mainHeading, "Pick your Project Type")}
        </motion.h1>

      {/* Project Type Selection */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleProjectTypeChange("new-build")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              projectType === "new-build"
                ? "w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-5 rounded-2xl max-w-[256px] h-[56px] flex items-center justify-center text-[16px] font-semibold hover:bg-[#3c3f9d] transition-colors duration-200 shadow-lg"
                : "flex h-14 w-full items-center justify-center !rounded-2xl border border-transparent bg-white text-sm text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 hover:shadow-lg max-w-[256px] text-[16px] font-semibold hover:bg-gray-50"
            }`}
                      >
              {newBuildButtonText}
            </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleProjectTypeChange("retrofit")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              projectType === "retrofit"
                ? "w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-5 rounded-2xl max-w-[256px] h-[56px] flex items-center justify-center text-[16px] font-semibold hover:bg-[#3c3f9d] transition-colors duration-200 shadow-lg"
                : "flex h-14 w-full items-center justify-center !rounded-2xl border border-transparent bg-white text-sm text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 hover:shadow-lg max-w-[256px] text-[16px] font-semibold hover:bg-gray-50"
            }`}
                      >
              {retrofitButtonText}
            </motion.button>
        </div>
      </motion.div>

      {/* Content Sections with Enhanced Animations */}
      <AnimatePresence mode="wait">
        {projectType === "new-build" ? (
          <motion.div
            key="new-build"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-12 relative"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-black"
                          >
              {isBlocks(newBuildIntroText) ? (
                <div className="prose max-w-none text-black">
                  <PortableText value={newBuildIntroText as any[]} />
                </div>
              ) : (
                <div className="prose max-w-none text-black">
                  {safeText(
                    newBuildIntroText,
                    "Ever wondered what might've happened if you chose a different strategy, system, or construction method? One that could have performed better over the long term?"
                  )}
                </div>
              )}
            </motion.div>

            {/* Removed: newBuildSubText and newBuildDescription sections */}

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="overflow-x-auto text-center"
            >
              <Suspense fallback={<ChartSkeleton />}>
                {combinedData && combinedData.length > 0 ? (
                  <MainRadarPlot data={combinedData} />
                ) : (
                  <ChartSkeleton />
                )}
              </Suspense>
            </motion.div>
          </motion.div>
        ) : null}

        {projectType === "retrofit" ? (
          <motion.div
            key="retrofit"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-12 overflow-x-auto overflow-y-hidden"
          >
            {retrofitContent ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-4 text-black"
              >
                {isBlocks(retrofitContent) ? (
                  <div className="prose max-w-none text-black">
                    <PortableText value={retrofitContent as any[]} />
                  </div>
                ) : (
                  <div className="prose max-w-none text-black">
                    {safeText(
                      retrofitContent,
                      "Retrofit projects focus on improving existing buildings through strategic upgrades and modifications."
                    )}
                  </div>
                )}
              </motion.div>
            ) : null}



            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative w-full pt-14 overflow-x-hidden project-slider"
            >
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
                loop
                spaceBetween={15}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {retrofitSlider?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative rounded-xl overflow-hidden">
                      <Image
                        src={image.image.asset?.url || "/assets/images/image1.jpg"}
                        alt={image.altText}
                        width={image.image.asset?.metadata?.dimensions?.width || 900}
                        height={image.image.asset?.metadata?.dimensions?.height || 400}
                        className="w-full h-[400px] object-cover rounded-xl"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Summary Section - Animated based on project type */}
      <AnimatePresence mode="wait">
        {projectType ? (
          <motion.div
            key={`summary-${projectType}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {projectType === "new-build" ? (
              <div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-black mb-4 text-[20px]"
                                  >
                  {safeText(
                    newBuildSummaryText,
                    "We eliminate poor-performing and non-compliant options and score the remaining against the client's priorities. This helps us get clear, evidence-based rationale for the design decisions. We recommend using these outputs to develop brief for architects and engineers"
                  )}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className=" relative"
                >
                  <div className="overflow-x-auto">
                    <Suspense fallback={<ChartSkeleton />}>
                      {summaryData && summaryData.length > 0 ? (
                        <SummaryRadarPlot data={summaryData} />
                      ) : (
                        <ChartSkeleton />
                      )}
                    </Suspense>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-black text-center">
                      {safeText(
                        newBuildResultText,
                        "The result: A confident, futureproof path to Net Zero from day one."
                      )}
                    </p>
                    {newBuildResultCta?.text && newBuildResultCta?.link ? (
                      <Link
                        href={newBuildResultCta.link}
                        className="mt-[10px] px-6 py-3 rounded-lg font-medium transition-all duration-200 w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-5 max-w-[256px] h-[56px] flex items-center justify-center text-[16px] hover:bg-[#3c3f9d] shadow-lg"
                      >
                        {newBuildResultCta.text}
                      </Link>
                    ) : (
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-[10px] px-6 py-3 rounded-lg font-medium transition-all duration-200 w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-5 max-w-[256px] h-[56px] flex items-center justify-center text[16px] hover:bg-[#3c3f9d] shadow-lg"
                      >
                        Explore new build projects
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </div>
            ) : (
              <div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-black mb-4"
                                  >
                  {safeText(
                    retrofitIntroText,
                    "We then simulate and compare retrofit pathways:"
                  )}
                </motion.p>
              
                {/* TODO: Add additional content for retrofit if needed */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="relative"
                >
                  <Suspense fallback={<ChartSkeleton />}>
                    {summaryData && summaryData.length > 0 ? (
                      <SummaryRadarPlot data={summaryData} />
                    ) : (
                      <ChartSkeleton />
                    )}
                  </Suspense>
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-black text-center">
                      {retrofitResultText || "The result: a clear pathway to improvement that's aligned with both project's values and Net Zero goals."}
                    </p>
                    <Link href={retrofitButtonUrl || "/projects"} className="mt-[10px] px-6 py-3 rounded-lg font-medium transition-all duration-200 w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-5 max-w-[256px] h-[56px] flex items-center justify-center text-[16px] hover:bg-[#3c3f9d] shadow-lg">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {retrofitButtonText}
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Default State - Only show when no project type is selected */}
      <AnimatePresence mode="wait">
        {!projectType ? (
          <motion.div
            key="default"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="text-center py-12"
          >
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-gray-600">
                Select a project type to view the optioneering visualization
              </h3>
              <p className="text-gray-500">
                Choose between New Build or Retrofit to explore different design options and performance scenarios.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

// Memoized MainRadarPlot component
const MainRadarPlot: React.FC<{ data: OptionData[] }> = React.memo(
  ({ data }) => {
    const rows = 5;
    const cols = 10;

    const makeSubplots = useCallback(() => {
      const subplots: any[] = [];

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const index = i * cols + j;
          if (index >= data.length) break;

          const option = data[index];
          const values = [
            option.carbon_5cz,
            option.cost_5cz,
            option.comfort_5cz,
            option.circularity_5cz,
            option.compliance_5cz,
            option.carbon_5cz,
          ];

          const color = getColor(option);
          const fillColor = rgbaFromColor(color);

          subplots.push({
            type: "scatterpolar" as const,
            r: values,
            theta: THETA_LABELS,
            fill: "toself" as const,
            mode: "lines+markers" as const,
            marker: { size: 6, color: "black" },
            line: { color },
            fillcolor: fillColor,
            hoverlabel: {
              bgcolor: adjustAlpha(fillColor, 0.9),
              bordercolor: color,
              font: { color: getContrastingTextColor(fillColor) },
              padding: { l: 5, r: 5, t: 5, b: 5 },
            },
            hoverinfo: "text" as const,
            hovertext: generateHoverText(option, index + 1),
            showlegend: false,
            subplot: `polar${index + 1}`,
          });
        }
      }

      return subplots;
    }, [data]);

    const layout = useMemo(
      () => ({
        height: 1000,
        width: 1300,
        grid: { rows, columns: cols, pattern: "independent" as const },
        showlegend: false,
        margin: { l: 0, r: 0, t: 10, b: 10 },
        hovermode: "closest" as const,
        ...Array.from({ length: rows * cols }, (_, i) => {
          const key = `polar${i + 1}`;
          return {
            [key]: {
              domain: {
                row: Math.floor(i / cols),
                column: i % cols,
                x: [(i % cols) / cols + 0.01, ((i % cols) + 1) / cols - 0.01],
                y: [
                  1 - (Math.floor(i / cols) + 1) / rows + 0.01,
                  1 - Math.floor(i / cols) / rows - 0.01,
                ],
              },
              radialaxis: {
                visible: true,
                showticklabels: false, 
                range: [0, 100],
                gridcolor: "#ddd",
                gridwidth: 0.5,
              },
              angularaxis: {
                visible: true,
                showticklabels: true,
                tickfont: { size: 9, color: "#333" },
                tickangle: 0,
                rotation: 90,
                direction: "clockwise" as const,
                gridcolor: "#ccc",
                gridwidth: 0.5,
              },
            },
          };
        }).reduce((acc, polar) => ({ ...acc, ...polar }), {}),
      }),
      [rows, cols]
    );

    try {
      const plotData = makeSubplots();
      console.log("MainRadarPlot data:", plotData?.length, "traces");
      console.log("MainRadarPlot layout:", layout);
      
      return (
        <Plot
          data={plotData}
          layout={layout}
          config={{
            displayModeBar: false,
            modeBarButtonsToRemove: ["pan2d", "select2d", "lasso2d"],
            displaylogo: false,
            responsive: true,
          }}
          useResizeHandler={true}
          onError={(error) => {
            console.error("Plotly error in MainRadarPlot:", error);
          }}
        />
      );
    } catch (error) {
      console.error("Error rendering MainRadarPlot:", error);
      return <ChartSkeleton />;
    }
  }
);

MainRadarPlot.displayName = "MainRadarPlot";

// Memoized SummaryRadarPlot component
const SummaryRadarPlot: React.FC<{ data: OptionData[] }> = React.memo(
  ({ data }) => {
    const traces = useMemo(
      () =>
        data.map((option, index) => {
          const values = [
            option.carbon_5cz,
            option.cost_5cz,
            option.comfort_5cz,
            option.circularity_5cz,
            option.compliance_5cz,
            option.carbon_5cz,
          ];

          const color = getColor(option);
          const fillColor = rgbaFromColor(color);

          return {
            type: "scatterpolar" as const,
            r: values,
            theta: THETA_LABELS,
            fill: "toself" as const,
            mode: "lines+markers" as const,
            marker: {
              size: 6,
              color: "black",
              line: { width: 1, color: "white" },
            },
            line: { color },
            fillcolor: fillColor,
            hoverlabel: {
              bgcolor: adjustAlpha(fillColor, 0.9),
              bordercolor: color,
              font: { color: getContrastingTextColor(fillColor) },
              padding: { l: 5, r: 5, t: 5, b: 5 },
            },
            hoverinfo: "text" as const,
            hovertext: generateHoverText(option, index + 1),
            showlegend: false,
            subplot: index === 0 ? ("polar" as const) : (`polar${index + 1}` as const),
          };
        }),
      [data]
    );

    const layout = useMemo(
      () => ({
        autosize: true,
        grid: { rows: 1, columns: 3, pattern: "independent" as const },
        showlegend: false,
        margin: { l: 20, r: 20, t: 20, b: 20 },
        hovermode: "closest" as const,
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        ...Array.from({ length: 3 }, (_, i) => {
          const key = i === 0 ? "polar" : `polar${i + 1}`;
          return {
            [key]: {
              domain: {
                row: 0,
                column: i,
                x: [i / 3 + 0.04, (i + 1) / 3 - 0.02],
                y: [0.05, 0.95],
              },
              bgcolor: "rgba(0,0,0,0)",
              radialaxis: {
                visible: true,
                range: [0, 100],
                showticklabels: false,
                ticks: "",
                showline: false,
                gridcolor: "rgba(0,0,0,0.15)",
                gridwidth: 1.5,
              },
              angularaxis: {
                visible: true,
                tickfont: { size: 13, family: "Arial Black", color: "black" },
                tickangle: 0,
                rotation: 90,
                direction: "clockwise" as const,
                ticks: "",
              },
            },
          };
        }).reduce((acc, polar) => ({ ...acc, ...polar }), {}),
        images: [
          {
            // source: '/icons/carbon.png',
            xref: "paper" as const,
            yref: "paper" as const,
            x: 0.75,
            y: 0.5,
            sizex: 0.07,
            sizey: 0.07,
            xanchor: "center" as const,
            yanchor: "middle" as const,
            layer: "above" as const,
          },
          {
            // source: '/icons/cost.png',
            xref: "paper" as const,
            yref: "paper" as const,
            x: 0.577,
            y: 0.738,
            sizex: 0.07,
            sizey: 0.07,
            xanchor: "center" as const,
            yanchor: "middle" as const,
            layer: "above" as const,
          },
          {
            // source: '/icons/comfort.png',
            xref: "paper" as const,
            yref: "paper" as const,
            x: 0.298,
            y: 0.647,
            sizex: 0.07,
            sizey: 0.07,
            xanchor: "center" as const,
            yanchor: "middle" as const,
            layer: "above" as const,
          },
          {
            // source: '/icons/circularity.png',
            xref: "paper" as const,
            yref: "paper" as const,
            x: 0.298,
            y: 0.353,
            sizex: 0.07,
            sizey: 0.07,
            xanchor: "center" as const,
            yanchor: "middle" as const,
            layer: "above" as const,
          },
          {
            // source: '/icons/compliance.png',
            xref: "paper" as const,
            yref: "paper" as const,
            x: 0.577,
            y: 0.262,
            sizex: 0.07,
            sizey: 0.07,
            xanchor: "center" as const,
            yanchor: "middle" as const,
            layer: "above" as const,
          },
        ],
      }),
      [data]
    );

    try {
      console.log("SummaryRadarPlot data:", traces?.length, "traces");
      console.log("SummaryRadarPlot layout:", layout);
      
      return (
        <div className="w-full h-[360px] sm:h-[420px]">
          <Plot
            data={traces}
            layout={layout}
            config={{
              displayModeBar: false,
              modeBarButtonsToRemove: ["pan2d", "select2d", "lasso2d"],
              displaylogo: false,
              responsive: true,
            }}
            style={{ width: "100%", height: "100%" }}
            useResizeHandler={true}
            onError={(error) => {
              console.error("Plotly error in SummaryRadarPlot:", error);
            }}
          />
        </div>
      );
    } catch (error) {
      console.error("Error rendering SummaryRadarPlot:", error);
      return <ChartSkeleton />;
    }
  }
);

SummaryRadarPlot.displayName = "SummaryRadarPlot";

// Optimized helper functions
const safeNormalize = (value: number, min: number, max: number): number =>
  max === min ? 50 : 50 + ((max - value) / (max - min)) * 40;

const getColor = (row: OptionData): string => {
  if (!row || typeof row.Comfort_metric !== 'number') return "goldenrod";
  if (row.Comfort_metric === -1) return "blue";

  const vals = [
    row.carbon_5cz || 50,
    row.cost_5cz || 50,
    row.comfort_5cz || 50,
    row.circularity_5cz || 50,
    row.compliance_5cz || 50,
  ];

  if (vals.some((v) => v < 50)) return "red";
  if (vals.filter((v) => v >= 80).length >= 4) return "purple";
  if (vals.every((v) => v > 70)) return "green";
  return "goldenrod";
};

const rgbaFromColor = (name: string): string => {
  return COLOR_MAP[name] || "rgba(100,100,100,0.4)";
};

// Increase or change the alpha of an rgba color string
const adjustAlpha = (rgbaColor: string, alpha: number): string => {
  const match = rgbaColor.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\)/i);
  if (!match) return rgbaColor;
  const r = match[1];
  const g = match[2];
  const b = match[3];
  return `rgba(${r},${g},${b},${alpha})`;
};

const getContrastingTextColor = (rgbaColor: string): string => {
  const match = rgbaColor.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!match) return "white";
  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "black" : "white";
};

const generateHoverText = (row: OptionData, index: number): string => {
  if (!row) return `<b>Option ${index}</b><br>No data available`;
  
  const comfortLabels: Record<number, string> = {
    [-1]: "Too Cold",
    0: "Comfortable",
    1: "Warm",
    2: "Too Hot",
  };

  const complianceLabels: Record<number, string> = {
    1: "Current Regs",
    2: "Net Zero Ready",
    3: "PH Classic",
    4: "PH Plus",
    5: "5C Zero",
  };

  return `
    <b>Option ${index}</b><br>
    Fabric: ${row.Fabric || 'N/A'}<br>
    Orientation: ${row.Orientation || 'N/A'}<br>
    User behaviour: ${row.User_behaviour || 'N/A'}<br>
    Compliance: ${complianceLabels[row.Compliance_metric] || "Unknown"}<br>
    Comfort: ${comfortLabels[row.Comfort_metric] || "Unknown"}<br>
    Cost £${Math.round((row.Cost || 0) / 1000)}k<br>
    Carbon ${Math.round((row.Carbon || 0) / 1000)} tCO₂e<br>
    Circularity: ${Math.round(row.Circularity || 0)}
  `;
};

const processRawData = (jsonData: any[]): OptionData[] => {
  try {
    console.log("processRawData input:", jsonData?.length, "rows");
    
    if (!jsonData || !Array.isArray(jsonData) || jsonData.length === 0) {
      console.log("processRawData: No input data");
      return [];
    }
    
    // Log first few rows to see structure
    console.log("processRawData first row:", jsonData[0]);
    
    const carbonValues = jsonData.map((r: any) => r.Carbon).filter(val => typeof val === 'number' && !isNaN(val));
    const costValues = jsonData.map((r: any) => r.Cost).filter(val => typeof val === 'number' && !isNaN(val));
    
    console.log("processRawData carbon values:", carbonValues.length, "valid values");
    console.log("processRawData cost values:", costValues.length, "valid values");
    
    if (carbonValues.length === 0 || costValues.length === 0) {
      console.log("processRawData: No valid carbon or cost values");
      return [];
    }
    
    const carbonMin = Math.min(...carbonValues);
    const carbonMax = Math.max(...carbonValues);
    const costMin = Math.min(...costValues);
    const costMax = Math.max(...costValues);
    
    console.log("processRawData ranges:", { carbonMin, carbonMax, costMin, costMax });
    
    // If we don't have valid min/max values, return empty array
    if (isNaN(carbonMin) || isNaN(carbonMax) || isNaN(costMin) || isNaN(costMax)) {
      console.log("processRawData: Invalid min/max values");
      return [];
    }

    const processed = jsonData
      .map((item: any, index: number) => {
        try {
          const row = {
            ...item,
            Comfort_metric: item["Comfort - metric"] ?? item["Comfort_metric"],
            Compliance_metric:
              item["Compliance - metric"] ?? item["Compliance_metric"],
            User_behaviour: item["User behaviour"] ?? item["User_behaviour"] ?? item["User_behavior"] ?? "Standard",
          };

          return {
            ...row,
            carbon_5cz: safeNormalize(row.Carbon || 0, carbonMin, carbonMax),
            cost_5cz: safeNormalize(row.Cost || 0, costMin, costMax),
            comfort_5cz: COMFORT_SCORE_MAP[row.Comfort_metric] || 50,
            compliance_5cz: COMPLIANCE_SCORE_MAP[row.Compliance_metric] || 50,
            circularity_5cz: row.Circularity,
            color_tag: "",
          };
        } catch (rowError) {
          console.error(`processRawData: Error processing row ${index}:`, rowError, item);
          return null;
        }
      })
      .filter((row) => {
        if (!row) return false;
        return (
          row.Carbon !== undefined && row.Carbon !== null && !isNaN(row.Carbon) &&
          row.Cost !== undefined && row.Cost !== null && !isNaN(row.Cost) &&
          row.Comfort_metric !== undefined && row.Comfort_metric !== null &&
          row.Circularity !== undefined && row.Circularity !== null && !isNaN(row.Circularity) &&
          row.Compliance_metric !== undefined && row.Compliance_metric !== null &&
          row.User_behaviour !== undefined && row.User_behaviour !== null
        );
      });
    
    console.log("processRawData output:", processed.length, "valid rows");
    return processed;
  } catch (error) {
    console.error("processRawData error:", error);
    return [];
  }
};

const sampleAndCombineData = (data: OptionData[]): OptionData[] => {
  try {
    console.log("sampleAndCombineData input:", data?.length, "rows");
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log("sampleAndCombineData: No input data");
      return [];
    }
  
    const withColors = data.map((row) => ({ ...row, color_tag: getColor(row) }));
    console.log("sampleAndCombineData: Colors assigned");

    const df_red = withColors.filter((r) => r.color_tag === "red").slice(0, 15);
    const df_blue = withColors.filter((r) => r.color_tag === "blue").slice(0, 10);
    const df_green = withColors
      .filter((r) => r.color_tag === "green")
      .slice(0, 7);
    const df_purple = withColors
      .filter((r) => r.color_tag === "purple")
      .slice(0, 2);

    console.log("sampleAndCombineData: Filtered by color", {
      red: df_red.length,
      blue: df_blue.length,
      green: df_green.length,
      purple: df_purple.length
    });

    const used = new Set(
      [...df_red, ...df_blue, ...df_green, ...df_purple].map((r) => r)
    );

    const df_yellow = withColors
      .filter((r) => r.color_tag === "goldenrod" && !used.has(r))
      .slice(0, 16);

    const result = [...df_red, ...df_blue, ...df_green, ...df_purple, ...df_yellow].sort(
      () => Math.random() - 0.5
    );
    
    console.log("sampleAndCombineData output:", result.length, "rows");
    return result;
  } catch (error) {
    console.error("sampleAndCombineData error:", error);
    return [];
  }
};

const createSummaryData = (data: OptionData[]): OptionData[] => {
  try {
    console.log("createSummaryData input:", data?.length, "rows");
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log("createSummaryData: No input data");
      return [];
    }
  
    const red = data.find((r) => r.color_tag === "red");
    const blue = data.find((r) => r.color_tag === "blue");
    const yellow = data.find(
      (r) => r.color_tag === "goldenrod" && r.Compliance_metric === 1
    );
    const green = data.find(
      (r) => r.color_tag === "green" && r.Compliance_metric !== 4
    );
    const purple = data.find(
      (r) => r.color_tag === "purple" && r.Compliance_metric === 5
    );

    console.log("createSummaryData: Found options", {
      red: !!red,
      blue: !!blue,
      yellow: !!yellow,
      green: !!green,
      purple: !!purple
    });

    // Ensure we always have 3 charts by providing fallbacks
    const result: OptionData[] = [];

    if (yellow) result.push(yellow);
    else if (data.find((r) => r.color_tag === "goldenrod"))
      result.push(data.find((r) => r.color_tag === "goldenrod")!);

    if (green) result.push(green);
    else if (data.find((r) => r.color_tag === "green"))
      result.push(data.find((r) => r.color_tag === "green")!);

    if (purple) result.push(purple);
    else if (data.find((r) => r.color_tag === "purple"))
      result.push(data.find((r) => r.color_tag === "purple")!);

    // If we still don't have 3, add any available data
    while (result.length < 3 && data.length > 0) {
      const remaining = data.filter((r) => !result.includes(r));
      if (remaining.length > 0) {
        result.push(remaining[0]);
      } else {
        break;
      }
    }

    console.log("createSummaryData output:", result.length, "rows");
    return result.slice(0, 3);
  } catch (error) {
    console.error("createSummaryData error:", error);
    return [];
  }
};

// Export with dynamic loading to prevent SSR issues
export default dynamic(() => Promise.resolve(OptioneeringVisualization), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
});
