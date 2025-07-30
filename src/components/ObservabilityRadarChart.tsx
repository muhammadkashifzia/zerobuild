// OptioneeringVisualization.tsx
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import * as XLSX from 'xlsx';

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

const OptioneeringVisualization: React.FC = () => {
  const [rawData, setRawData] = useState<OptionData[]>([]);
  const [combinedData, setCombinedData] = useState<OptionData[]>([]);
  const [summaryData, setSummaryData] = useState<OptionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/assets/file/optioneering_min_final.xlsx');
        if (!response.ok) throw new Error('Failed to fetch Excel file');
        
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);
        const worksheet = workbook.Sheets['5C'];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        const processedData = processRawData(jsonData);
        setRawData(processedData);
        
        const sampledData = sampleAndCombineData(processedData);
        setCombinedData(sampledData);
        
        const summary = createSummaryData(sampledData);
        setSummaryData(summary);
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div className="text-center py-8">Loading data...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Optioneering Visualization</h1>
      
      <div className="mb-12 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">All Options</h2>
        <div className="bg-white p-4 rounded-lg shadow-lg min-w-[2000px]">
          <MainRadarPlot data={combinedData} />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Summary Options</h2>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <SummaryRadarPlot data={summaryData} />
        </div>
      </div>
    </div>
  );
};

const MainRadarPlot: React.FC<{ data: OptionData[] }> = ({ data }) => {
  const rows = 5;
  const cols = 10;
  
  const makeSubplots = () => {
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
          type: 'scatterpolar',
          r: values,
          theta: ['Carbon', 'Cost', 'Comfort', 'Circularity', 'Compliance', 'Carbon'],
          fill: 'toself',
          mode: 'lines+markers',
          marker: { size: 6, color: 'black' },
          line: { color },
          fillcolor: fillColor,
          hoverinfo: 'text',
          hovertext: generateHoverText(option, index + 1),
          showlegend: false,
          subplot: `polar${index + 1}`
        });
      }
    }
    
    return subplots;
  };
  
  const layout = {
    height: 1000,
    width: 2000,
    grid: { rows, columns: cols, pattern: 'independent' },
    showlegend: false,
    margin: { l: 0, r: 0, t: 10, b: 10 },
    polar: Array.from({ length: rows * cols }, (_, i) => ({
      domain: {
        row: Math.floor(i / cols),
        column: i % cols,
        x: [(i % cols) / cols, ((i % cols) + 1) / cols],
        y: [1 - (Math.floor(i / cols) + 1) / rows, 1 - Math.floor(i / cols) / rows]
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
    }))
  };
  
  return <Plot data={makeSubplots()} layout={layout} config={{ displayModeBar: false }} />;
};

const SummaryRadarPlot: React.FC<{ data: OptionData[] }> = ({ data }) => {
  const traces = data.map((option, index) => {
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
      type: 'scatterpolar',
      r: values,
      theta: ['Carbon', 'Cost', 'Comfort', 'Circularity', 'Compliance', 'Carbon'],
      fill: 'toself',
      mode: 'lines+markers',
      marker: { size: 6, color: 'black', line: { width: 1, color: 'white' } },
      line: { color },
      fillcolor: fillColor,
      hoverinfo: 'text',
      hovertext: generateHoverText(option, index + 1),
      showlegend: false,
      subplot: `polar${index + 1}`
    };
  });
  
  const layout = {
    height: 400,
    width: 1200,
    grid: { rows: 1, columns: 3, pattern: 'independent' },
    showlegend: false,
    margin: { l: 50, r: 50, t: 50, b: 50 },
    polar: Array.from({ length: 3 }, (_, i) => ({
      domain: {
        row: 0,
        column: i,
        x: [i/3, (i+1)/3],
        y: [0, 1]
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
        direction: 'clockwise',
        ticks: ''
      }
    })),
    images: [
      {
        source: '/icons/carbon.png',
        xref: 'paper', yref: 'paper',
        x: 0.75, y: 0.5,
        sizex: 0.07, sizey: 0.07,
        xanchor: 'center', yanchor: 'middle',
        layer: 'above'
      },
      {
        source: '/icons/cost.png',
        xref: 'paper', yref: 'paper',
        x: 0.577, y: 0.738,
        sizex: 0.07, sizey: 0.07,
        xanchor: 'center', yanchor: 'middle',
        layer: 'above'
      },
      {
        source: '/icons/comfort.png',
        xref: 'paper', yref: 'paper',
        x: 0.298, y: 0.647,
        sizex: 0.07, sizey: 0.07,
        xanchor: 'center', yanchor: 'middle',
        layer: 'above'
      },
      {
        source: '/icons/circularity.png',
        xref: 'paper', yref: 'paper',
        x: 0.298, y: 0.353,
        sizex: 0.07, sizey: 0.07,
        xanchor: 'center', yanchor: 'middle',
        layer: 'above'
      },
      {
        source: '/icons/compliance.png',
        xref: 'paper', yref: 'paper',
        x: 0.577, y: 0.262,
        sizex: 0.07, sizey: 0.07,
        xanchor: 'center', yanchor: 'middle',
        layer: 'above'
      }
    ]
  };
  
  return <Plot data={traces} layout={layout} config={{ displayModeBar: false }} />;
};

// Helper functions
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
  const colorMap: Record<string, string> = {
    'blue': 'rgba(173,216,230,0.4)',
    'red': 'rgba(255,0,0,0.4)',
    'green': 'rgba(0,128,0,0.4)',
    'purple': 'rgba(128,0,128,0.4)',
    'goldenrod': 'rgba(218,165,32,0.4)'
  };
  return colorMap[name] || 'rgba(100,100,100,0.4)';
};

const generateHoverText = (row: OptionData, index: number): string => {
  const comfortLabels: Record<number, string> = {
    [-1]: "Too Cold",
    0: "Comfortable",
    1: "Warm",
    2: "Too Hot"
  };
  
  const complianceLabels: Record<number, string> = {
    1: "Current Regs",
    2: "Net Zero Ready",
    3: "PH Classic",
    4: "PH Plus",
    5: "5C Zero"
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
  return jsonData.map((item: any) => {
    const row = {
      ...item,
      Comfort_metric: item['Comfort - metric'] || item['Comfort_metric'],
      Compliance_metric: item['Compliance - metric'] || item['Compliance_metric']
    };

    const carbonMin = Math.max(...jsonData.map((r: any) => r.Carbon));
    const carbonMax = Math.min(...jsonData.map((r: any) => r.Carbon));
    const carbon_5cz = 50 + ((carbonMin - row.Carbon) / (carbonMin - carbonMax)) * 40;

    const costMin = Math.max(...jsonData.map((r: any) => r.Cost));
    const costMax = Math.min(...jsonData.map((r: any) => r.Cost));
    const cost_5cz = 50 + ((costMin - row.Cost) / (costMin - costMax)) * 40;

    const comfortScoreMap: Record<number, number> = { [-1]: 35, 0: 90, 1: 75, 2: 35 };
    const comfort_5cz = comfortScoreMap[row.Comfort_metric] || 50;

    const complianceScoreMap: Record<number, number> = { 1: 50, 2: 60, 3: 70, 4: 80, 5: 90 };
    const compliance_5cz = complianceScoreMap[row.Compliance_metric] || 50;

    return {
      ...row,
      carbon_5cz,
      cost_5cz,
      comfort_5cz,
      circularity_5cz: row.Circularity,
      compliance_5cz,
      color_tag: ''
    };
  }).filter((row: any) => 
    row.Carbon !== undefined && 
    row.Cost !== undefined && 
    row.Comfort_metric !== undefined && 
    row.Circularity !== undefined && 
    row.Compliance_metric !== undefined
  );
};

const sampleAndCombineData = (data: OptionData[]): OptionData[] => {
  const withColors = data.map(row => ({
    ...row,
    color_tag: getColor(row)
  }));

  const df_red = withColors.filter(row => row.color_tag === 'red').slice(0, 15);
  const df_blue = withColors.filter(row => row.color_tag === 'blue').slice(0, 10);
  const df_green = withColors.filter(row => row.color_tag === 'green').slice(0, 7);
  const df_purple = withColors.filter(row => row.color_tag === 'purple').slice(0, 2);

  const usedIndices = new Set([
    ...df_red.map(row => data.indexOf(row)),
    ...df_blue.map(row => data.indexOf(row)),
    ...df_green.map(row => data.indexOf(row)),
    ...df_purple.map(row => data.indexOf(row))
  ]);

  const df_yellow = withColors.filter(
    (row, index) => row.color_tag === 'goldenrod' && !usedIndices.has(index)
  ).slice(0, 16);

  const combined = [...df_red, ...df_blue, ...df_green, ...df_purple, ...df_yellow];
  return combined.sort(() => Math.random() - 0.5);
};

const createSummaryData = (data: OptionData[]): OptionData[] => {
  const red_sample = data.filter(row => row.color_tag === 'red').slice(0, 1);
  const blue_sample = data.filter(row => row.color_tag === 'blue').slice(0, 1);
  const yellow_sample = data.filter(
    row => row.color_tag === 'goldenrod' && row.Compliance_metric === 1
  ).slice(0, 1);
  const green_sample = data.filter(
    row => row.color_tag === 'green' && row.Compliance_metric !== 4
  ).slice(0, 1);
  const purple_sample = data.filter(
    row => row.color_tag === 'purple' && row.Compliance_metric === 5
  ).slice(0, 1);

  return [...yellow_sample, ...green_sample, ...purple_sample];
};

export default OptioneeringVisualization;