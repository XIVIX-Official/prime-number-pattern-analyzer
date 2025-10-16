import React, { useState, useCallback } from 'react';
import { PrimeAnalysisResult } from './types';
import { analyzePrimes } from './services/primeService';
import InputForm from './components/InputForm';
import AnalysisResults from './components/AnalysisResults';
import PrimeDistributionChart from './components/PrimeDistributionChart';
import PrimeGapsChart from './components/PrimeGapsChart';
import TwinPrimesList from './components/TwinPrimesList';

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<PrimeAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback((limit: number) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    // Run analysis in a timeout to allow the UI to update to the loading state
    setTimeout(() => {
      try {
        if (limit > 2000000) {
            throw new Error("Analysis limit cannot exceed 2,000,000 to ensure browser performance.");
        }
        const result = analyzePrimes(limit);
        setAnalysisResult(result);
      } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("An unknown error occurred during analysis.");
        }
      } finally {
        setIsLoading(false);
      }
    }, 50); // Small delay
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-grow">
        <header className="text-center mb-6 pb-4 border-b border-gray-700">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-2 animated-gradient-text">
              Codexus Technologies
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 tracking-tight">Prime Number Pattern Analyzer</h2>
            <p className="text-gray-400 mt-1">Visualize the intricate world of prime numbers.</p>
        </header>

        <main>
          <InputForm onAnalyze={handleAnalyze} isLoading={isLoading} />

          {isLoading && (
            <div className="flex justify-center items-center mt-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                <p className="ml-4 text-lg">Analyzing primes... this may take a moment for large numbers.</p>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
          )}

          {analysisResult && (
            <div className="mt-8 space-y-6">
              <AnalysisResults result={analysisResult} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gray-800 p-4 rounded-lg shadow-xl">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-300">Prime Distribution</h3>
                  <PrimeDistributionChart primes={analysisResult.primes} limit={analysisResult.limit} />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-xl">
                    <h3 className="text-xl font-semibold mb-4 text-cyan-300">Twin Primes Found</h3>
                    <TwinPrimesList twinPrimes={analysisResult.twinPrimes} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-cyan-300">Prime Gap Frequencies</h3>
                <PrimeGapsChart gaps={analysisResult.gaps} />
              </div>
            </div>
          )}

          {!isLoading && !analysisResult && !error && (
            <div className="mt-10 text-center text-gray-500">
                <p>Enter a number up to 2,000,000 and click "Analyze" to begin.</p>
            </div>
          )}
        </main>
      </div>
      <footer className="text-center py-4 text-gray-500 text-sm">
          <p>Powered by XIVIX</p>
      </footer>
    </div>
  );
};

export default App;