import { PrimeAnalysisResult } from '../types';

/**
 * Generates prime numbers up to a given limit using the Sieve of Eratosthenes.
 * @param limit The upper bound to find primes.
 * @returns An array of prime numbers.
 */
function generatePrimes(limit: number): number[] {
  if (limit < 2) return [];
  const sieve = new Array(limit + 1).fill(true);
  sieve[0] = sieve[1] = false;

  for (let p = 2; p * p <= limit; p++) {
    if (sieve[p]) {
      for (let i = p * p; i <= limit; i += p) {
        sieve[i] = false;
      }
    }
  }

  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (sieve[i]) {
      primes.push(i);
    }
  }
  return primes;
}

/**
 * Analyzes a list of prime numbers to find patterns.
 * @param limit The upper bound for prime number analysis.
 * @returns A PrimeAnalysisResult object.
 */
export function analyzePrimes(limit: number): PrimeAnalysisResult {
  if (limit < 2) {
      return {
          primes: [],
          limit,
          primeCount: 0,
          twinPrimes: [],
          gaps: {},
          gapStats: { min: 0, max: 0, average: 0 },
      };
  }

  const primes = generatePrimes(limit);
  const primeCount = primes.length;

  const twinPrimes: [number, number][] = [];
  const gaps: { [gap: string]: number } = {};
  let totalGap = 0;
  let minGap = Infinity;
  let maxGap = 0;

  for (let i = 0; i < primes.length - 1; i++) {
    const p1 = primes[i];
    const p2 = primes[i + 1];
    const gap = p2 - p1;

    // Calculate gaps
    totalGap += gap;
    if (gap < minGap) minGap = gap;
    if (gap > maxGap) maxGap = gap;
    gaps[gap] = (gaps[gap] || 0) + 1;

    // Find twin primes
    if (gap === 2) {
      twinPrimes.push([p1, p2]);
    }
  }

  const numGaps = primes.length > 1 ? primes.length - 1 : 0;
  const averageGap = numGaps > 0 ? totalGap / numGaps : 0;

  return {
    primes,
    limit,
    primeCount,
    twinPrimes,
    gaps,
    gapStats: {
      min: numGaps > 0 ? minGap : 0,
      max: numGaps > 0 ? maxGap : 0,
      average: parseFloat(averageGap.toFixed(2)),
    },
  };
}