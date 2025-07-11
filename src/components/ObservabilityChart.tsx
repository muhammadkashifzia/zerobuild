'use client';

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid,
} from 'recharts';

const data = [
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
    name: '3',
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
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 p-4 rounded shadow text-sm text-gray-800">
        <p><strong>Point:</strong> {label}</p>    
        <p><strong>Cost:</strong> {d.Cost}</p>
        {d.Fabric && (
          <>
            <hr className="my-2" />
            <p><strong>Fabric:</strong> {d.Fabric}</p>
            <p><strong>Orientation:</strong> {d.Orientation}</p>
            <p><strong>User Behaviour:</strong> {d.UserBehaviour}</p>
            <p><strong>Compliance:</strong> {d.Compliance}</p>
            <p><strong>Comfort:</strong> {d.Comfort}</p>
            <p><strong>Cost (Num):</strong> {d.Cost}</p>
            <p><strong>Carbon:</strong> {d.Carbon}</p>
            <p><strong>Circularity:</strong> {d.Circularity}</p>
          </>
        )}
      </div>
    );
  }
  return null;
};

export default function ObservabilityChart() {
  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md w-full max-w-6xl mx-auto border border-gray-200">
      <h3 className="text-sm text-gray-500 mb-1">📊 Observability</h3>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Route-aware observability.</h2>
      <p className="text-gray-600 mb-6">Monitor and analyze the performance and traffic of your projects.</p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          <Line
            type="monotone"
            dataKey="Circularity"
            stroke="#10b981" // green
            strokeWidth={2}
            dot={true}
          />
          <Line
            type="monotone"
            dataKey="CostNum"
            stroke="#facc15" // yellow
            strokeWidth={2}
            dot={true}
            name="Cost"
          />
          
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
