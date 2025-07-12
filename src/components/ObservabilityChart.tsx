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
import { useState } from 'react';

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
    name: '11',
    Fabric: 'Claylay block with woodfibre and cork',
    Orientation: 'North-South',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Perfect!',
    Cost: '£379,679',
    CostNum: 379679,
    Carbon: '56510',
    CarbonNum: 56510,
    Circularity:   79 ,
  },
   {
    name: '11',
    Fabric: 'Standard timber frame with rigid PIR insulation and brick cladding',
    Orientation: 'East-West',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Feels nice',
    Cost: '£386,613',
    CostNum: 386613,
    Carbon: '51931',
    CarbonNum: 52000,
    Circularity: 63,
  },
     {
    name: '12',
    Fabric: 'Standard timber frame with rigid PIR insulation and brick cladding',
    Orientation: 'East-West',
    UserBehaviour: 'Unaware',
    Compliance: 'Current regulations',
    Comfort: 'Feels nice',
    Cost: '336419.069557001',
    CostNum: 386613,
    Carbon: '-330426',
    CarbonNum: 52000,
    Circularity: 63,
  },
];

// Add index to each data point
const data: DataPoint[] = rawData.map((item, index) => ({ ...item, index }));

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 p-4 rounded shadow text-sm text-gray-800">
        <p><strong>Fabric:</strong> {d.Fabric}</p>
        <p><strong>Orientation:</strong> {d.Orientation}</p>
        <p><strong>User Behaviour:</strong> {d.UserBehaviour}</p>
        <p><strong>Compliance:</strong> {d.Compliance}</p>
        <p><strong>Comfort:</strong> {d.Comfort}</p>
        <p><strong>Cost:</strong> {d.Cost}</p>
        <p><strong>Carbon:</strong> {d.Carbon}</p>
      </div>
    );
  }
  return null;
};

// Custom dot shape for highlighting on hover
const CustomDot = ({
  cx,
  cy,
  fill,
  index,
  hoveredIndex,
}: {
  cx: number;
  cy: number;
  fill: string;
  index: number;
  hoveredIndex: number | null;
}) => (
  <circle
    cx={cx}
    cy={cy}
    r={hoveredIndex === index ? 8 : 5}
    fill={hoveredIndex === index ? '#000' : fill}
    stroke="#333"
    strokeWidth={hoveredIndex === index ? 2 : 1}
  />
);

export default function ObservabilityChart() {
  const [xAxisType, setXAxisType] = useState<'CostNum' | 'CarbonNum'>('CostNum');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const xAxisLabel = xAxisType === 'CostNum' ? 'Lifecycle Cost (£)' : 'Whole Life Carbon (kg)';
  const xAxisFormatter = (v: number) =>
    xAxisType === 'CostNum' ? `£${(v / 1000).toFixed(0)}k` : `${(v / 1000).toFixed(0)}k`;

  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md w-full max-w-6xl mx-auto border border-gray-200">
      <h3 className="text-sm text-gray-500 mb-1">📊 Observability</h3>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {xAxisType === 'CostNum'
          ? 'Lifecycle Cost vs Whole Life Carbon'
          : 'Whole Life Carbon vs Lifecycle Cost'}
      </h2>
      <p className="text-gray-600 mb-4">
        Toggle between cost or carbon as X-axis to visualize trends.
      </p>

      <div className="mb-4">
        <button
          onClick={() => setXAxisType('CostNum')}
          className={`px-4 py-2 mr-2 rounded ${
            xAxisType === 'CostNum' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Cost
        </button>
        <button
          onClick={() => setXAxisType('CarbonNum')}
          className={`px-4 py-2 rounded ${
            xAxisType === 'CarbonNum' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Carbon
        </button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            dataKey={xAxisType}
            stroke="#000"
            tickFormatter={xAxisFormatter}
            label={{
              value: xAxisLabel,
              position: 'insideBottom',
              offset: -6,
              fill: '#555',
            }}
          />
          <YAxis
            type="number"
            dataKey={xAxisType === 'CostNum' ? 'CarbonNum' : 'CostNum'}
            domain={['dataMin - 10000', 'dataMax + 10000']} // Supports negative
            stroke="#000"
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            label={{
              value:
                xAxisType === 'CostNum'
                  ? 'Whole Life Carbon (kg)'
                  : 'Lifecycle Cost (£)',
              angle: -90,
              position: 'insideLeft',
              fill: '#555',
            }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                setHoveredIndex(payload[0].payload.index);
              } else {
                setHoveredIndex(null);
              }
              return <CustomTooltip active={active} payload={payload} />;
            }}
            cursor={{ stroke: '#8884d8', strokeWidth: 1 }}
          />
          <Legend />
          <Scatter
            name="Data Points"
            data={data}
            fill={xAxisType === 'CostNum' ? '#f4a261' : '#e63946'}
            shape={(props) => (
              <CustomDot
                {...props}
                index={props.payload.index}
                hoveredIndex={hoveredIndex}
              />
            )}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
