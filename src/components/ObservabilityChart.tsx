'use client';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useState, useRef, useEffect } from 'react';
import { Search, ZoomIn, RotateCcw } from 'lucide-react';

type DataPoint = {
  name: string;
  Fabric: string;
  Orientation: string;
  UserBehaviour: string;
  Compliance: string;
  Comfort: string;
  Cost: string;
  CostNum: number;
  Carbon: string;
  CarbonNum: number;
  Circularity: number;
  index?: number;
};

const rawData: DataPoint[] = [
   {
    name: '1',
    Fabric: 'Standard timber frame with rigid PIR insulation and brick cladding',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Feels nice',
    Cost: '£392,261',
    CostNum: 392261,
    Carbon: '67,425',
    CarbonNum: 67425,
    Circularity: 63,
  },
  {
    name: '2',
    Fabric: 'Timber frame with mineral wool insulation and render',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Overheating',
    Cost: '£373,385',
    CostNum: 373385,
    Carbon: '58,578',
    CarbonNum: 58578,
    Circularity: 76,
  },
  {
    name: '3',
    Fabric: 'Natural build-up with Hemplime and timber cladding',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Feels nice',
    Cost: '£384,151',
    CostNum: 384151,
    Carbon: '53,339',
    CarbonNum: 53339,
    Circularity: 66,
  },
  {
    name: '4',
    Fabric: 'Lime-rendered hemplime timber frame',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Feels nice',
    Cost: '£367,437',
    CostNum: 367437,
    Carbon: '54,250',
    CarbonNum: 54250,
    Circularity: 67,
  },
  {
    name: '5',
    Fabric: 'Brick and block cavity wall with mineral wool',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Average',
    Cost: '£351,900',
    CostNum: 351900,
    Carbon: '59,850',
    CarbonNum: 59850,
    Circularity: 60,
  },
  {
    name: '6',
    Fabric: 'Dense concrete block cavity wall with partial fill',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Cool',
    Cost: '£360,000',
    CostNum: 360000,
    Carbon: '61,000',
    CarbonNum: 61000,
    Circularity: 55,
  },
  {
    name: '7',
    Fabric: 'Clay block with PIR and brick slip finish',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Warm',
    Cost: '£370,000',
    CostNum: 370000,
    Carbon: '57,500',
    CarbonNum: 57500,
    Circularity: 65,
  },
  {
    name: '8',
    Fabric: 'Clay block and PIR with timber exterior',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Neutral',
    Cost: '£365,000',
    CostNum: 365000,
    Carbon: '56,200',
    CarbonNum: 56200,
    Circularity: 62,
  },
  {
    name: '9',
    Fabric: 'Clay block with mineral wool and render',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Moderate',
    Cost: '£355,000',
    CostNum: 355000,
    Carbon: '58,000',
    CarbonNum: 58000,
    Circularity: 64,
  },
  {
    name: '10',
    Fabric: 'Claylay block with woodfibre and cork',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Feels nice',
    Cost: '£345,000',
    CostNum: 345000,
    Carbon: '52,000',
    CarbonNum: 52000,
    Circularity: 68,
  },
    {
    name: "11",
    Fabric: "Standard timber frame with rigid PIR insulation and brick cladding",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "",
    Comfort: "Feels nice",
    Cost: "£386,613",
    CostNum: 386613,
    Carbon: "51,931",
    CarbonNum: 51931,
    Circularity: 63,
    index: 10
  },
  {
    name: "12",
    Fabric: "Timber frame with mineral wool insulation and render",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Overheating",
    Cost: "£372,900",
    CostNum: 372900,
    Carbon: "41,821",
    CarbonNum: 41821,
    Circularity: 76,
    index: 11
  },
  {
    name: "13",
    Fabric: "Natural build-up with Hemplime and timber cladding",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£383,662",
    CostNum: 383662,
    Carbon: "38,240",
    CarbonNum: 38240,
    Circularity: 67,
    index: 12
  },
  {
    name: "14",
    Fabric: "Lime-rendered hemplime timber frame",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£366,952",
    CostNum: 366952,
    Carbon: "37,608",
    CarbonNum: 37608,
    Circularity: 66,
    index: 13
  },
  // Entry 15
  {
    name: "15",
    Fabric: "Brick and block cavity wall with mineral wool",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£368,481",
    CostNum: 368481,
    Carbon: "49,606",
    CarbonNum: 49606,
    Circularity: 66,
    index: 14
  },
  {
    name: "16",
    Fabric: "Dense concrete block cavity wall with partial fill",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Feels nice",
    Cost: "£369,584",
    CostNum: 369584,
    Carbon: "49,602",
    CarbonNum: 49602,
    Circularity: 66,
    index: 15
  },
  {
    name: "17",
    Fabric: "Clay block with PIR and brick slip finish",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Overheating",
    Cost: "£370,458",
    CostNum: 370458,
    Carbon: "45,427",
    CarbonNum: 45427,
    Circularity: 70,
    index: 16
  },
  {
    name: "18",
    Fabric: "Clay block and PIR with timber exterior",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£377,314",
    CostNum: 377314,
    Carbon: "43,739",
    CarbonNum: 43739,
    Circularity: 79,
    index: 17
  },
  {
    name: "19",
    Fabric: "Clay block with mineral wool and render",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£362,586",
    CostNum: 362586,
    Carbon: "46,212",
    CarbonNum: 46212,
    Circularity: 82,
    index: 18
  },
  {
    name: "20",
    Fabric: "Claylay block with woodfibre and cork",
    Orientation: "East-West",
    UserBehaviour: "Unaware",
    Compliance: "Current regulations",
    Comfort: "Perfect!",
    Cost: "£379,204",
    CostNum: 379204,
    Carbon: "39,202",
    CarbonNum: 39202,
    Circularity: 80,
    index: 19
  },
];

// Add index to each data point
const data: DataPoint[] = rawData.map((item, index) => ({ ...item, index }));

// Custom dot shape for highlighting on hover and priority
type CustomDotProps = {
  cx?: number;
  cy?: number;
  payload: any;
  priority: 'Comfort' | 'Compliance' | 'Circularity';
};

const CustomDot = (props: CustomDotProps) => {
  const { cx, cy, payload, priority } = props;

  // Helper to interpolate between two hex colors
  function lerpColor(a: string, b: string, t: number) {
    const ah = a.replace('#', '');
    const bh = b.replace('#', '');
    const ar = parseInt(ah.substring(0, 2), 16);
    const ag = parseInt(ah.substring(2, 4), 16);
    const ab = parseInt(ah.substring(4, 6), 16);
    const br = parseInt(bh.substring(0, 2), 16);
    const bg = parseInt(bh.substring(2, 4), 16);
    const bb = parseInt(bh.substring(4, 6), 16);
    const rr = Math.round(ar + (br - ar) * t);
    const rg = Math.round(ag + (bg - ag) * t);
    const rb = Math.round(ab + (bb - ab) * t);
    return `#${rr.toString(16).padStart(2, '0')}${rg.toString(16).padStart(2, '0')}${rb.toString(16).padStart(2, '0')}`;
  }

  let fill = '#8884d8';

  if (priority === 'Circularity' && payload && typeof payload.Circularity === 'number') {
    // Circularity gradient: light green (#bbf7d0) to dark green (#166534)
    const minCirc = 55; // lowest in your data
    const maxCirc = 82; // highest in your data
    const t = Math.max(0, Math.min(1, (payload.Circularity - minCirc) / (maxCirc - minCirc)));
    fill = lerpColor('#bbf7d0', '#166534', t);
  } else if (payload && payload.Comfort) {
    const comfort = payload.Comfort.toLowerCase();
    if (comfort === 'underheating') fill = '#2563eb'; // blue
    else if (comfort === 'overheating') fill = '#ef4444'; // red
    else if (comfort === 'feels nice' || comfort === 'perfect!') fill = '#22c55e'; // green
    else fill = '#8884d8'; // fallback
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={payload && payload.index !== undefined ? 8 : 5}
      fill={fill}
      stroke="#156082"
      strokeWidth={payload && payload.index !== undefined ? 2 : 1}
      opacity={1}
    />
  );
};

export default function ObservabilityChart() {
  const [xAxisType, setXAxisType] = useState<'CostNum' | 'CarbonNum'>('CarbonNum');
  const [priority, setPriority] = useState<'Comfort' | 'Compliance' | 'Circularity'>('Comfort');
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomDomain, setZoomDomain] = useState<{ x: number[] | null; y: number[] | null }>({ x: null, y: null });
  const [box, setBox] = useState({
    x: 0.9, // percent (0-1)
    y: 0.9,
    width: 0.3,
    height: 0.3,
    dragging: false,
    resizing: false,
    dragStart: { x: 0, y: 0 },
    boxStart: { x: 0, y: 0, width: 0, height: 0 },
    resizeDir: '',
  });
  const [ctaVisible, setCtaVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartDims, setChartDims] = useState({ left: 0, top: 0, width: 1, height: 1 });

  // Get chart dimensions for overlay
  useEffect(() => {
    if (chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect();
      setChartDims({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    }
  }, []);

  // Show CTA after box is moved or resized
  const showCTA = () => {
    if (!ctaVisible) setCtaVisible(true);
  };

  // Handle zoom in based on box position
  const handleZoomIn = () => {
    const xKey = xAxisType;
    const yKey = xAxisType === 'CostNum' ? 'CarbonNum' : 'CostNum';
    const xMin = Math.min(...data.map((d) => d[xKey]));
    const xMax = Math.max(...data.map((d) => d[xKey]));
    const yMin = Math.min(...data.map((d) => d[yKey]));
    const yMax = Math.max(...data.map((d) => d[yKey]));
    
    const boxX0 = xMin + box.x * (xMax - xMin);
    const boxX1 = xMin + (box.x + box.width) * (xMax - xMin);
    const boxY0 = yMin + box.y * (yMax - yMin);
    const boxY1 = yMin + (box.y + box.height) * (yMax - yMin);
    
    setZoomDomain({
      x: [boxX0, boxX1],
      y: [boxY0, boxY1]
    });
    setIsZoomed(true);
    showCTA();
  };

  // Reset zoom
  const resetZoom = () => {
    setIsZoomed(false);
    setZoomDomain({ x: null, y: null });
  };

  // Mouse/touch handlers for drag/resize
  const onBoxMouseDown = (e: React.MouseEvent | React.TouchEvent, resizeDir = '') => {
    e.stopPropagation();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setBox((prev) => ({
      ...prev,
      dragging: !resizeDir,
      resizing: !!resizeDir,
      dragStart: { x: clientX, y: clientY },
      boxStart: { x: prev.x, y: prev.y, width: prev.width, height: prev.height },
      resizeDir,
    }));
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!box.dragging && !box.resizing) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      let dx = (clientX - box.dragStart.x) / chartDims.width;
      let dy = (clientY - box.dragStart.y) / chartDims.height;
      let newBox = { ...box };
      if (box.dragging) {
        newBox.x = Math.max(0, Math.min(1 - box.width, box.boxStart.x + dx));
        newBox.y = Math.max(0, Math.min(1 - box.height, box.boxStart.y + dy));
      } else if (box.resizing) {
        if (box.resizeDir === 'br') {
          newBox.width = Math.max(0.05, Math.min(1 - box.x, box.boxStart.width + dx));
          newBox.height = Math.max(0.05, Math.min(1 - box.y, box.boxStart.height + dy));
        }
      }
      setBox({ ...newBox, dragging: box.dragging, resizing: box.resizing, dragStart: box.dragStart, boxStart: box.boxStart, resizeDir: box.resizeDir });
    };
    
    const onUp = () => {
      if (box.dragging || box.resizing) {
        handleZoomIn(); // Zoom immediately after drag/resize ends
      }
      setBox((prev) => ({ ...prev, dragging: false, resizing: false }));
      document.body.style.userSelect = '';
    };
    
    if (box.dragging || box.resizing) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [box, chartDims]);

  // Axis labels and formatters
  const xAxisLabel = xAxisType === 'CostNum' ? 'Lifecycle Cost (£/m²)' : 'Whole Life Carbon (kgCO₂e/m²)';
  const yAxisLabel = xAxisType === 'CostNum' ? 'Whole Life Carbon (kgCO₂e/m²)' : 'Lifecycle Cost (£/m²)';
  const xAxisFormatter = (v: number) => xAxisType === 'CostNum' ? `£${(v / 1000).toFixed(0)}k` : `${(v / 1000).toFixed(0)}k`;
  const yAxisFormatter = (v: number) => xAxisType === 'CostNum' ? `${(v / 1000).toFixed(0)}k` : `£${(v / 1000).toFixed(0)}k`;

  // Box pixel position/size
  const boxPx = {
    left: chartDims.width * box.x,
    top: chartDims.height * box.y,
    width: chartDims.width * box.width,
    height: chartDims.height * box.height,
  };

  // Priority toggle button style
  const priorityBtn = (val: typeof priority) =>
    `px-4 py-2 rounded mr-2 ${priority === val ? 'bg-[#484AB7] text-white' : 'bg-gray-200 text-gray-700'}`;

  // Calculate domains
  const xKey = xAxisType;
  const yKey = xAxisType === 'CostNum' ? 'CarbonNum' : 'CostNum';
  const xMin = Math.min(...data.map((d) => d[xKey]));
  const xMax = Math.max(...data.map((d) => d[xKey]));
  const yMin = Math.min(...data.map((d) => d[yKey]));
  const yMax = Math.max(...data.map((d) => d[yKey]));

  return (
    <div className="px-[16px] graph-icon relative">
      <div className='bg-white text-gray-900 px-2 py-4 md:p-6 rounded-lg w-full md:mx-auto'>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Explore how our client used our Five C Zero Framework to evaluate 1000+ design options in under 24 hours, unlocking smarter decisions from day one.
        </h2>
        <p className="text-gray-600 mb-2">
          Choose what matters most
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="flex items-center justify-center font-semibold text-gray-700">Priority:</span>
          {/* Cost and Carbon always selected, not clickable */}
          <button className="px-4 py-2 rounded mr-2 bg-[#484AB7] text-white cursor-default" disabled>Cost</button>
          <button className="px-4 py-2 rounded mr-2 bg-[#484AB7] text-white cursor-default" disabled>Carbon</button>
          {/* Only one of Comfort, Compliance, Circularity can be selected */}
          <button onClick={() => setPriority('Comfort')} className={priorityBtn('Comfort')}>Comfort</button>
          <button onClick={() => setPriority('Compliance')} className={priorityBtn('Compliance')}>Compliance</button>
          <button onClick={() => setPriority('Circularity')} className={priorityBtn('Circularity')}>Circularity</button>
        </div>

        <div 
          ref={chartRef} 
          className="relative w-full h-[600px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Hover Top Bar */}
          <div 
            className={`absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-[#484AB7] to-[#6366f1] rounded-t-lg flex items-center justify-between px-4 transition-all duration-300 z-10 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <div className="flex items-center text-white text-sm font-medium">
              <Search className="w-4 h-4 mr-2" />
              Analyze Data Points
            </div>
            <div className="flex items-center gap-2">
              {isZoomed && (
                <button
                  onClick={resetZoom}
                  className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-white text-sm transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
              {/* Zoom button removed */}
            </div>
          </div>

          {/* Chart Container with top margin when hovered */}
          <div className={`w-full h-full transition-all duration-300 ${isHovered ? 'mt-12' : 'mt-0'}`}>
            {/* Always show overlays if chartDims are valid */}
            {chartDims.width > 10 && chartDims.height > 10 && (
              <>
                {/* Dimming overlay */}
                <div style={{
                  position: 'absolute',
                  left: 0, 
                  top: isHovered ? 48 : 0, 
                  width: '100%', 
                  height: isHovered ? 'calc(100% - 48px)' : '100%',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}>
                  {/* Dimmed areas */}
                  <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: boxPx.top, background: 'rgba(0,0,0,0.3)' }} />
                  <div style={{ position: 'absolute', left: 0, top: boxPx.top + boxPx.height, width: '100%', height: `calc(100% - ${boxPx.top + boxPx.height}px)`, background: 'rgba(0,0,0,0.3)' }} />
                  <div style={{ position: 'absolute', left: 0, top: boxPx.top, width: boxPx.left, height: boxPx.height, background: 'rgba(0,0,0,0.3)' }} />
                  <div style={{ position: 'absolute', left: boxPx.left + boxPx.width, top: boxPx.top, width: `calc(100% - ${boxPx.left + boxPx.width}px)`, height: boxPx.height, background: 'rgba(0,0,0,0.3)' }} />
                </div>
                
                {/* Draggable/Resizable Box */}
                <div
                  style={{
                    position: 'absolute',
                    left: boxPx.left,
                    top: boxPx.top + (isHovered ? 48 : 0),
                    width: boxPx.width,
                    height: boxPx.height,
                    background: 'rgba(72,74,183,0.18)',
                    border: '2px solid #484ab7',
                    borderRadius: 8,
                    zIndex: 3,
                    cursor: box.dragging ? 'grabbing' : 'grab',
                    boxShadow: '0 2px 8px rgba(72,74,183,0.12)',
                    transition: 'box-shadow 0.2s',
                    userSelect: 'none',
                  }}
                  onMouseDown={(e) => onBoxMouseDown(e)}
                  onTouchStart={(e) => onBoxMouseDown(e)}
                >
                  {/* Zoom instruction */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 px-3 py-1 rounded text-xs font-medium text-gray-700">
                      Drag to select area
                    </div>
                  </div>
                  
                  {/* Resize handle (bottom-right) */}
                  <div
                    style={{
                      position: 'absolute',
                      right: 0, bottom: 0, width: 18, height: 18,
                      background: '#484ab7',
                      borderRadius: '0 0 8px 0',
                      cursor: 'nwse-resize',
                      zIndex: 4,
                      display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
                    }}
                    onMouseDown={(e) => onBoxMouseDown(e, 'br')}
                    onTouchStart={(e) => onBoxMouseDown(e, 'br')}
                  >
                    <svg width="18" height="18">
                      <rect x="6" y="12" width="6" height="2" fill="#fff" />
                      <rect x="12" y="6" width="2" height="6" fill="#fff" />
                    </svg>
                  </div>
                </div>
              </>
            )}
            
            {/* Chart */}
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  dataKey={xKey}
                  stroke="#156082"
                  tickFormatter={xAxisFormatter}
                  label={{
                    value: xAxisLabel,
                    position: 'insideBottom',
                    offset: -6,
                    fill: '#156082',
                  }}
                  domain={isZoomed && zoomDomain.x ? zoomDomain.x : [xMin, xMax]}
                />
                <YAxis
                  type="number"
                  dataKey={yKey}
                  domain={isZoomed && zoomDomain.y ? zoomDomain.y : [yMin, yMax]}
                  stroke="#156082"
                  tickFormatter={yAxisFormatter}
                  label={{
                    value: yAxisLabel,
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#555',
                  }}
                />
                <Tooltip
                  content={({ active, payload }: any) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white border border-gray-200 p-4 rounded shadow text-sm text-gray-800">
                          <p><strong>Fabric:</strong> {d.Fabric}</p>
                          <p><strong>Orientation:</strong> {d.Orientation}</p>
                          <p><strong>Compliance:</strong> {d.Compliance}</p>
                          <p><strong>Comfort:</strong> {d.Comfort}</p>
                          <p><strong>Circularity:</strong> {d.Circularity}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={{ stroke: '#8884d8', strokeWidth: 1 }}
                />
                <Legend />
                <Scatter
                  name="Data Points"
                  data={data}
                  shape={(props: any) => <CustomDot {...props} priority={priority} />}
                  opacity={1}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Zoom Status */}
        {isZoomed && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-blue-700">
                <ZoomIn className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Zoomed view active - showing selected data range</span>
              </div>
              <button
                onClick={resetZoom}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Reset to full view
              </button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className={`mt-8 transition-all duration-700 flex flex-col items-center ${ctaVisible || isZoomed ? 'opacity-100' : 'opacity-60'}`}>
          <div className="text-lg font-semibold text-gray-800 mb-2 text-center">
            See how the Five C Framework helps you prioritise the right decisions.
          </div>
          <button className="bg-[#484AB7] text-white font-bold py-3 px-8 rounded-lg shadow-lg text-lg transition-all hover:bg-[#3d3f9f]">
            Try the full toolset
          </button>
        </div>
      </div>
    </div>
  );
}