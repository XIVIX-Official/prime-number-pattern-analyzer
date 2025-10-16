import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PrimeGapsChartProps {
  gaps: { [gap: string]: number };
}

const PrimeGapsChart: React.FC<PrimeGapsChartProps> = ({ gaps }) => {
  const data = Object.entries(gaps)
    .map(([gap, frequency]) => ({
      gap: parseInt(gap, 10),
      frequency,
    }))
    .sort((a, b) => a.gap - b.gap)
    .slice(0, 50); // Show up to first 50 gap sizes for clarity

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="gap" name="Gap Size" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            cursor={{fill: '#374151'}}
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }}
            labelFormatter={(label) => `Gap Size: ${label}`}
          />
          <Legend wrapperStyle={{ color: '#d1d5db' }} />
          <Bar dataKey="frequency" name="Frequency" fill="#818cf8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrimeGapsChart;