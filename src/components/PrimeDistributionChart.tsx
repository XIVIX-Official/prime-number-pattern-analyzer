import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PrimeDistributionChartProps {
  primes: number[];
  limit: number;
}

const PrimeDistributionChart: React.FC<PrimeDistributionChartProps> = ({ primes, limit }) => {
  const numBuckets = Math.min(Math.max(10, Math.floor(limit / 100)), 50);
  const bucketSize = Math.ceil(limit / numBuckets);

  const data = Array.from({ length: numBuckets }, (_, i) => {
    const start = i * bucketSize;
    const end = start + bucketSize -1;
    return {
      name: `${start + 1}-${Math.min(end + 1, limit)}`,
      count: 0,
    };
  });

  primes.forEach(prime => {
    const bucketIndex = Math.floor((prime - 1) / bucketSize);
    if (data[bucketIndex]) {
      data[bucketIndex].count++;
    }
  });

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
          <YAxis stroke="#9ca3af" />
          <Tooltip 
            cursor={{fill: '#374151'}}
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }}
            labelStyle={{ color: '#d1d5db' }}
          />
          <Legend wrapperStyle={{ color: '#d1d5db' }} />
          <Bar dataKey="count" name="Prime Count" fill="#22d3ee" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrimeDistributionChart;