import React, { useState } from 'react';
import { AnalyzeIcon } from './icons';

interface InputFormProps {
  onAnalyze: (limit: number) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isLoading }) => {
  const [limit, setLimit] = useState<string>('1000');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numLimit = parseInt(limit, 10);
    if (isNaN(numLimit) || numLimit < 2) {
      setError('Please enter a number greater than or equal to 2.');
    } else {
      setError('');
      onAnalyze(numLimit);
    }
  };

  const quickSetLimit = (value: number) => {
    setLimit(String(value));
    setError('');
    onAnalyze(value);
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-6">
      <form onSubmit={handleSubmit}>
        <label htmlFor="limit" className="block text-lg font-medium text-gray-300 mb-2">
          Analyze primes up to:
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input
            type="number"
            id="limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-full sm:w-64 bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
            placeholder="e.g., 1000"
            disabled={isLoading}
            max="2000000"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
          >
            <AnalyzeIcon className="w-5 h-5 mr-2" />
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-gray-400 text-sm font-medium mr-2">Quick presets:</span>
        {[100, 1000, 10000, 100000].map(val => (
            <button 
                key={val} 
                onClick={() => quickSetLimit(val)}
                disabled={isLoading}
                className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50"
            >
                {val.toLocaleString()}
            </button>
        ))}
      </div>
    </div>
  );
};

export default InputForm;