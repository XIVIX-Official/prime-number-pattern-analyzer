
export interface PrimeAnalysisResult {
  primes: number[];
  limit: number;
  primeCount: number;
  twinPrimes: [number, number][];
  gaps: { [gap: string]: number }; // Frequency of each gap size, key is string for chart data
  gapStats: {
    min: number;
    max: number;
    average: number;
  };
}
