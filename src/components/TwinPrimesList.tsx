import React from 'react';

interface TwinPrimesListProps {
  twinPrimes: [number, number][];
}

const TwinPrimesList: React.FC<TwinPrimesListProps> = ({ twinPrimes }) => {
  return (
    <div className="h-80 overflow-y-auto pr-2">
      {twinPrimes.length > 0 ? (
        <ul className="space-y-2">
          {twinPrimes.map(([p1, p2], index) => (
            <li key={index} className="flex justify-between items-center bg-gray-700/50 p-2 rounded-md">
              <span className="font-mono text-cyan-400">({p1.toLocaleString()}, {p2.toLocaleString()})</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
            <p>No twin primes found in this range.</p>
        </div>
      )}
    </div>
  );
};

export default TwinPrimesList;