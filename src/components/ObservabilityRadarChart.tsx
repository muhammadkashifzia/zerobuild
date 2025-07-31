"use client";
import React, { useEffect, useState, useMemo, useCallback, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import * as XLSX from 'xlsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { Autoplay, Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";


const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <ChartSkeleton />
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
  <div className="container mx-auto px-4 py-8">
    {/* Title skeleton */}
    <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-8 w-1/3 animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
    
    {/* All Options Skeleton */}
    <div className="mb-12">
      <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-4 w-1/4 animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
      <div className="bg-white p-4 rounded-lg shadow-lg min-w-[2000px]">
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
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
            <div key={i} className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <style jsx>{`
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
    `}</style>
  </div>
);

// Memoized constants
const THETA_LABELS = ['Carbon', 'Cost', 'Comfort', 'Circularity', 'Compliance', 'Carbon'];
const COMFORT_SCORE_MAP: Record<number, number> = { [-1]: 35, 0: 90, 1: 75, 2: 35 };
const COMPLIANCE_SCORE_MAP: Record<number, number> = { 1: 50, 2: 60, 3: 70, 4: 80, 5: 90 };
const COLOR_MAP: Record<string, string> = {
  blue: 'rgba(173,216,230,0.4)',
  red: 'rgba(255,0,0,0.4)',
  green: 'rgba(0,128,0,0.4)',
  purple: 'rgba(128,0,128,0.4)',
  goldenrod: 'rgba(218,165,32,0.4)'
};

const OptioneeringVisualization: React.FC = () => {
  const [rawData, setRawData] = useState<OptionData[]>([]);
  const [combinedData, setCombinedData] = useState<OptionData[]>([]);
  const [summaryData, setSummaryData] = useState<OptionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
  const [projectType, setProjectType] = useState<'new-build' | 'retrofit' | null>('new-build');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchData = async () => {
      try {
        // Check cache first
        if (dataCache) {
          setRawData(dataCache.rawData);
          setCombinedData(dataCache.combinedData);
          setSummaryData(dataCache.summaryData);
          setIsLoading(false);
          return;
        }

        const response = await fetch('/assets/file/optioneering_min_final.xlsx');
        if (!response.ok) throw new Error('Failed to fetch Excel file');

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);
        const worksheet = workbook.Sheets['5C'];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const processedData = processRawData(jsonData);
        const sampledData = sampleAndCombineData(processedData);
        const summary = createSummaryData(sampledData);

        // Cache the results
        dataCache = {
          rawData: processedData,
          combinedData: sampledData,
          summaryData: summary
        };

        setRawData(processedData);
        setCombinedData(sampledData);
        setSummaryData(summary);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
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
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Which type of project are you working on?</h1>
      
      {/* Project Type Selection */}
      <div className="mb-8">
    
        <div className="flex gap-4">
          <button
            onClick={() => setProjectType('new-build')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              projectType === 'new-build'
                ? 'w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-5 rounded-2xl max-w-[256px] h-[56px] flex items-center justify-center text-[16px] font-semibold hover:bg-[#3c3f9d] transition-colors duration-200'
                : 'flex h-14 w-full items-center justify-center !rounded-2xl border border-transparent bg-white text-sm text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 hover:shadow-lg max-w-[256px] text-[16px] font-semibold'
            }`}
          >
            New Build
          </button>
          <button
            onClick={() => setProjectType('retrofit')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              projectType === 'retrofit'
                ? 'w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-5 rounded-2xl max-w-[256px] h-[56px] flex items-center justify-center text-[16px] font-semibold hover:bg-[#3c3f9d] transition-colors duration-200'
                : 'flex h-14 w-full items-center justify-center !rounded-2xl border border-transparent bg-white text-sm text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 hover:shadow-lg max-w-[256px] text-[16px] font-semibold'
            }`}
          >
            Retrofit
          </button>
        </div>
      </div>

      {/* New Build Content */}
      {projectType === 'new-build' && (
        <>
          <div className="mb-12 overflow-x-auto  rounded-lg shadow-lg p-[20px] bg-white relative">
            <p className="text-2xl font-semibold mb-4 text-black">Ever wondered what might&apos;ve happened if you chose a different strategy, system, or construction method? One that could have performed better over the long term?</p>
            
            <p className="mb-4 text-black">Now you don&apos;t have to wonder.</p>
            
            <p className="mb-6 text-black">Our 5C Zero New Build Framework allows teams to explore over 1,000 design options at any stage of the design. We combine our expertise in building physics, dynamic simulation modelling, life cycle assessment with in-house datasets covering all of the 5Cs to rapidly score and filter high-performing options.</p>
            
            <div>
              
              <Suspense fallback={<ChartSkeleton />}>
                <MainRadarPlot data={combinedData} />
              </Suspense>
            </div>
          </div>

          <div>
            <p className='text-black mb-4'>We eliminate poor-performing and non-compliant options and score the remaining against the client&apos;s priorities. This helps us get clear, evidence-based rationale for the design decisions. We recommend using these outputs to develop brief for architects and engineers</p>
            <div className="bg-white p-4 rounded-lg shadow-lg relative">
              
              <Suspense fallback={<ChartSkeleton />}>
                <SummaryRadarPlot data={summaryData} />
              </Suspense>
        
               <div className='flex flex-col justify-center items-center'>
                <p className='text-black text-center'>The result: A confident, futureproof path to Net Zero from day one.</p>
           <button className='mt-[10px] px-6 py-3 rounded-lg font-medium transition-all duration-200 w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-5 max-w-[256px] h-[56px] flex items-center justify-center text-[16px]  hover:bg-[#3c3f9d]'> Explore new build projects</button>
            </div>
            </div>
          </div>
        </>
      )}

      {/* Retrofit Content */}
      {projectType === 'retrofit' && (
        <>
          <div className="mb-12 overflow-x-auto">
            <p className="text-2xl font-semibold mb-4 text-black">We treat retrofit projects with care — because they carry heritage, sentiment, and unique constraints.</p>
            
            <p className="mb-4 text-black"> Our 5C Zero Retrofit Framework begins with deep diagnostics.</p>
            
            <p className="mb-6 text-black"> We use SLAM + LiDAR 3D scanners to build an accurate BIM of the building.</p>
             <p className="mb-6 text-black">  We combine this with thermal imaging, moisture readings, air permeability tests, internal climate sensors, and smart HTC monitoring to build a performance scorecard of the building&apos;s current state. </p>
            
             <div className="relative w-full pt-14 overflow-x-hidden project-slider">
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
    <SwiperSlide >
      <div className="relative rounded-xl overflow-hidden">

          <Image
            src="/assets/images/image1.jpg"
            alt="asdsa"
            width={900}
            height={400}
            className="w-full h-[400px] object-cover rounded-xl"
          />
      
      </div>
    </SwiperSlide>
        <SwiperSlide >
      <div className="relative rounded-xl overflow-hidden">

          <Image
            src="/assets/images/image1.jpg"
            alt="asdsa"
            width={900}
            height={400}
            className="w-full h-[400px] object-cover rounded-xl"
          />
      </div>
    </SwiperSlide>
        <SwiperSlide >
      <div className="relative rounded-xl overflow-hidden">

          <Image
            src="/assets/images/image1.jpg"
            alt="asdsa"
            width={900}
            height={400}
            className="w-full h-[400px] object-cover rounded-xl"
          />
      </div>
    </SwiperSlide>
        <SwiperSlide >
      <div className="relative rounded-xl overflow-hidden">

          <Image
            src="/assets/images/image1.jpg"
            alt="asdsa"
            width={900}
            height={400}
            className="w-full h-[400px] object-cover rounded-xl"
          />
      </div>
    </SwiperSlide>
        <SwiperSlide >
      <div className="relative rounded-xl overflow-hidden">

          <Image
            src="/assets/images/image1.jpg"
            alt="asdsa"
            width={900}
            height={400}
            className="w-full h-[400px] object-cover rounded-xl"
          />
      </div>
    </SwiperSlide>

</Swiper>
</div>
          </div>
          <div>
            <p className='text-black mb-4'>We then simulate and compare retrofit pathways:</p>
            <ul className='text-black'><li> Fabric-first</li>
            <li> Systems-led</li>
            <li>Hybrid approaches</li></ul>
            <p className='text-black'>Each is evaluated across the building&apos;s future lifecycle, scored against the 5Cs, and mapped to your priorities.</p>
            <div className="bg-white p-4 rounded-lg shadow-lg relative">
              
              <Suspense fallback={<ChartSkeleton />}>
                <SummaryRadarPlot data={summaryData} />
              </Suspense>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-black text-center'>The result: a clear pathway to improvement that&apos;s aligned with both project&apos;s values and Net Zero goals.</p>
           <button className='mt-[10px] px-6 py-3 rounded-lg font-medium transition-all duration-200 w-full bg-[#484AB7] text-white border-neutral-200 dark:border-[#484AB7] p-5 max-w-[256px] h-[56px] flex items-center justify-center text-[16px]  hover:bg-[#3c3f9d]'>Explore retrofit projects</button>
            </div>
            </div>
          </div>
        </>
      )}

      {/* Default State */}
      {!projectType && (
        <div className="text-center py-12">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-600">Select a project type to view the optioneering visualization</h3>
            <p className="text-gray-500">Choose between New Build or Retrofit to explore different design options and performance scenarios.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Memoized MainRadarPlot component
const MainRadarPlot: React.FC<{ data: OptionData[] }> = React.memo(({ data }) => {
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
          option.carbon_5cz
        ];

        const color = getColor(option);
        const fillColor = rgbaFromColor(color);

        subplots.push({
          type: 'scatterpolar' as const,
          r: values,
          theta: THETA_LABELS,
          fill: 'toself' as const,
          mode: 'lines+markers' as const,
          marker: { size: 6, color: 'black' },
          line: { color },
          fillcolor: fillColor,
          hoverinfo: 'text' as const,
          hovertext: generateHoverText(option, index + 1),
          showlegend: false,
          subplot: `polar${index + 1}`
        });
      }
    }

    return subplots;
  }, [data]);

  const layout = useMemo(() => ({
    height: 1000,
    width: 1300,
    grid: { rows, columns: cols, pattern: 'independent' as const },
    showlegend: false,
    margin: { l: 0, r: 0, t: 10, b: 10 },
    hovermode: 'closest' as const,
    ...Array.from({ length: rows * cols }, (_, i) => ({
      [`polar${i + 1}`]: {
        domain: {
          row: Math.floor(i / cols),
          column: i % cols,
          x: [(i % cols) / cols + 0.01, ((i % cols) + 1) / cols - 0.01],
          y: [1 - (Math.floor(i / cols) + 1) / rows + 0.01, 1 - Math.floor(i / cols) / rows - 0.01]
        },
        radialaxis: {
          visible: true,
          showticklabels: false,
          range: [0, 100],
          gridcolor: '#ddd',
          gridwidth: 0.5
        },
        angularaxis: {
          visible: true,
          showticklabels: false,
          gridcolor: '#ccc',
          gridwidth: 0.5
        }
      }
    })).reduce((acc, polar) => ({ ...acc, ...polar }), {})
  }), [rows, cols]);

  return <Plot 
    data={makeSubplots()} 
    layout={layout} 
    config={{ 
      displayModeBar: true, 
      modeBarButtonsToRemove: ['pan2d', 'select2d', 'lasso2d'],
      displaylogo: false,
      responsive: true
    }} 
    useResizeHandler={true}
  />;
});

MainRadarPlot.displayName = 'MainRadarPlot';

// Memoized SummaryRadarPlot component
const SummaryRadarPlot: React.FC<{ data: OptionData[] }> = React.memo(({ data }) => {
  const traces = useMemo(() => data.map((option, index) => {
    const values = [
      option.carbon_5cz,
      option.cost_5cz,
      option.comfort_5cz,
      option.circularity_5cz,
      option.compliance_5cz,
      option.carbon_5cz
    ];

    const color = getColor(option);
    const fillColor = rgbaFromColor(color);

    return {
      type: 'scatterpolar' as const,
      r: values,
      theta: THETA_LABELS,
      fill: 'toself' as const,
      mode: 'lines+markers' as const,
      marker: { size: 6, color: 'black', line: { width: 1, color: 'white' } },
      line: { color },
      fillcolor: fillColor,
      hoverinfo: 'text' as const,
      hovertext: generateHoverText(option, index + 1),
      showlegend: false,
      subplot: `polar${index + 1}`
    };
  }), [data]);

  const layout = useMemo(() => ({
    height: 400,
    width: 1200,
    grid: { rows: 1, columns: 3, pattern: 'independent' as const },
    showlegend: false,
    margin: { l: 50, r: 50, t: 50, b: 50 },
    hovermode: 'closest' as const,
    ...Array.from({ length: 3 }, (_, i) => ({
      [`polar${i + 1}`]: {
        domain: {
          row: 0,
          column: i,
          x: [i / 3 + 0.04, (i + 1) / 3 - 0.02],
          y: [0.03, 0.98]
        },
        radialaxis: {
          visible: true,
          range: [0, 100],
          showticklabels: false,
          ticks: '',
          showline: false,
          gridcolor: 'rgba(0,0,0,0.2)',
          gridwidth: 2
        },
        angularaxis: {
          visible: true,
          tickfont: { size: 13, family: 'Arial Black', color: 'black' },
          tickangle: 0,
          rotation: 90,
          direction: 'clockwise' as const,
          ticks: ''
        }
      }
    })).reduce((acc, polar) => ({ ...acc, ...polar }), {}),
    images: [
      {
        // source: '/icons/carbon.png',
        xref: 'paper' as const, yref: 'paper' as const,
        x: 0.75, y: 0.5,
        sizex: 0.07, sizey: 0.07,
        xanchor: 'center' as const, yanchor: 'middle' as const,
        layer: 'above' as const
      },
      {
        // source: '/icons/cost.png',
        xref: 'paper' as const, yref: 'paper' as const,
        x: 0.577, y: 0.738,
        sizex: 0.07, sizey: 0.07,
        xanchor: 'center' as const, yanchor: 'middle' as const,
        layer: 'above' as const
      },
      {
        // source: '/icons/comfort.png',
        xref: 'paper' as const, yref: 'paper' as const,
        x: 0.298, y: 0.647,
        sizex: 0.07, sizey: 0.07,
        xanchor: 'center' as const, yanchor: 'middle' as const,
        layer: 'above' as const
      },
      {
        // source: '/icons/circularity.png',
        xref: 'paper' as const, yref: 'paper' as const,
        x: 0.298, y: 0.353,
        sizex: 0.07, sizey: 0.07,
        xanchor: 'center' as const, yanchor: 'middle' as const,
        layer: 'above' as const
      },
      {
        // source: '/icons/compliance.png',
        xref: 'paper' as const, yref: 'paper' as const,
        x: 0.577, y: 0.262,
        sizex: 0.07, sizey: 0.07,
        xanchor: 'center' as const, yanchor: 'middle' as const,
        layer: 'above' as const
      }
    ]
  }), []);

  return <Plot 
    data={traces} 
    layout={layout} 
    config={{ 
      displayModeBar: true, 
      modeBarButtonsToRemove: ['pan2d', 'select2d', 'lasso2d'],
      displaylogo: false,
      responsive: true
    }} 
    useResizeHandler={true}
  />;
});

SummaryRadarPlot.displayName = 'SummaryRadarPlot';

// Optimized helper functions
const safeNormalize = (value: number, min: number, max: number): number =>
  max === min ? 50 : 50 + ((max - value) / (max - min)) * 40;

const getColor = (row: OptionData): string => {
  if (row.Comfort_metric === -1) return 'blue';

  const vals = [
    row.carbon_5cz,
    row.cost_5cz,
    row.comfort_5cz,
    row.circularity_5cz,
    row.compliance_5cz
  ];

  if (vals.some(v => v < 50)) return 'red';
  if (vals.filter(v => v >= 80).length >= 4) return 'purple';
  if (vals.every(v => v > 70)) return 'green';
  return 'goldenrod';
};

const rgbaFromColor = (name: string): string => {
  return COLOR_MAP[name] || 'rgba(100,100,100,0.4)';
};

const generateHoverText = (row: OptionData, index: number): string => {
  const comfortLabels: Record<number, string> = {
    [-1]: 'Too Cold',
    0: 'Comfortable',
    1: 'Warm',
    2: 'Too Hot'
  };

  const complianceLabels: Record<number, string> = {
    1: 'Current Regs',
    2: 'Net Zero Ready',
    3: 'PH Classic',
    4: 'PH Plus',
    5: '5C Zero'
  };

  return `
    <b>Option ${index}</b><br>
    Fabric: ${row.Fabric}<br>
    Orientation: ${row.Orientation}<br>
    User behaviour: ${row.User_behaviour}<br>
    Compliance: ${complianceLabels[row.Compliance_metric] || 'Unknown'}<br>
    Comfort: ${comfortLabels[row.Comfort_metric] || 'Unknown'}<br>
    Cost: £${Math.round(row.Cost / 1000)}k/m<sup>2</sup><br>
    Carbon: ${Math.round(row.Carbon / 1000)} tCO₂e/m<sup>2</sup><br>
    Circularity: ${Math.round(row.Circularity)}
  `;
};

const processRawData = (jsonData: any[]): OptionData[] => {
  const carbonMin = Math.min(...jsonData.map((r: any) => r.Carbon));
  const carbonMax = Math.max(...jsonData.map((r: any) => r.Carbon));
  const costMin = Math.min(...jsonData.map((r: any) => r.Cost));
  const costMax = Math.max(...jsonData.map((r: any) => r.Cost));

  return jsonData.map((item: any) => {
    const row = {
      ...item,
      Comfort_metric: item['Comfort - metric'] ?? item['Comfort_metric'],
      Compliance_metric: item['Compliance - metric'] ?? item['Compliance_metric']
    };

    return {
      ...row,
      carbon_5cz: safeNormalize(row.Carbon, carbonMin, carbonMax),
      cost_5cz: safeNormalize(row.Cost, costMin, costMax),
      comfort_5cz: COMFORT_SCORE_MAP[row.Comfort_metric] || 50,
      compliance_5cz: COMPLIANCE_SCORE_MAP[row.Compliance_metric] || 50,
      circularity_5cz: row.Circularity,
      color_tag: ''
    };
  }).filter(row =>
    row.Carbon !== undefined &&
    row.Cost !== undefined &&
    row.Comfort_metric !== undefined &&
    row.Circularity !== undefined &&
    row.Compliance_metric !== undefined
  );
};

const sampleAndCombineData = (data: OptionData[]): OptionData[] => {
  const withColors = data.map(row => ({ ...row, color_tag: getColor(row) }));

  const df_red = withColors.filter(r => r.color_tag === 'red').slice(0, 15);
  const df_blue = withColors.filter(r => r.color_tag === 'blue').slice(0, 10);
  const df_green = withColors.filter(r => r.color_tag === 'green').slice(0, 7);
  const df_purple = withColors.filter(r => r.color_tag === 'purple').slice(0, 2);

  const used = new Set([...df_red, ...df_blue, ...df_green, ...df_purple].map(r => r));

  const df_yellow = withColors.filter(r => r.color_tag === 'goldenrod' && !used.has(r)).slice(0, 16);

  return [...df_red, ...df_blue, ...df_green, ...df_purple, ...df_yellow].sort(() => Math.random() - 0.5);
};

const createSummaryData = (data: OptionData[]): OptionData[] => {
  const red = data.find(r => r.color_tag === 'red');
  const blue = data.find(r => r.color_tag === 'blue');
  const yellow = data.find(r => r.color_tag === 'goldenrod' && r.Compliance_metric === 1);
  const green = data.find(r => r.color_tag === 'green' && r.Compliance_metric !== 4);
  const purple = data.find(r => r.color_tag === 'purple' && r.Compliance_metric === 5);

  // Ensure we always have 3 charts by providing fallbacks
  const result: OptionData[] = [];
  
  if (yellow) result.push(yellow);
  else if (data.find(r => r.color_tag === 'goldenrod')) result.push(data.find(r => r.color_tag === 'goldenrod')!);
  
  if (green) result.push(green);
  else if (data.find(r => r.color_tag === 'green')) result.push(data.find(r => r.color_tag === 'green')!);
  
  if (purple) result.push(purple);
  else if (data.find(r => r.color_tag === 'purple')) result.push(data.find(r => r.color_tag === 'purple')!);
  
  // If we still don't have 3, add any available data
  while (result.length < 3 && data.length > 0) {
    const remaining = data.filter(r => !result.includes(r));
    if (remaining.length > 0) {
      result.push(remaining[0]);
    } else {
      break;
    }
  }

  return result.slice(0, 3);
};

// Export with dynamic loading to prevent SSR issues
export default dynamic(() => Promise.resolve(OptioneeringVisualization), {
  ssr: false,
  loading: () => <LoadingSkeleton />
});
