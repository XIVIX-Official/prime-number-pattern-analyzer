
import React from 'react';
import { PrimeAnalysisResult } from '../types';
import { ChartBarIcon, CalculatorIcon, ScaleIcon, ArrowsRightLeftIcon } from './icons';

interface AnalysisResultsProps {
  result: PrimeAnalysisResult;
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-gray-800 p-4 rounded-lg flex items-center">
    <div className={`mr-4 p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);


const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  const { limit, primeCount, gapStats, twinPrimes } = result;
  
  const primeDensity = limit > 0 ? (primeCount / limit * 100).toFixed(2) : 0;

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Analysis for numbers up to {limit.toLocaleString()}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<CalculatorIcon className="w-6 h-6 text-white"/>} 
          label="Total Primes Found" 
          value={primeCount.toLocaleString()}
          color="bg-blue-500"
        />
        <StatCard 
          icon={<ChartBarIcon className="w-6 h-6 text-white"/>} 
          label="Prime Density" 
          value={`${primeDensity}%`}
          color="bg-green-500"
        />
         <StatCard 
          icon={<ScaleIcon className="w-6 h-6 text-white"/>} 
          label="Largest Gap" 
          value={gapStats.max.toLocaleString()}
          color="bg-red-500"
        />
        <StatCard 
          icon={<ArrowsRightLeftIcon className="w-6 h-6 text-white"/>} 
          label="Twin Prime Pairs" 
          value={twinPrimes.length.toLocaleString()}
          color="bg-purple-500"
        />
      </div>
    </div>
  );
};

export default AnalysisResults;
