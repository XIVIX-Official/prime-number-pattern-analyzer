"""
Core module for prime number generation and analysis.
"""

import numpy as np


def sieve_of_eratosthenes(limit: int) -> np.ndarray:
    """
    Generate all primes up to 'limit' using the Sieve of Eratosthenes.
    
    Args:
        limit (int): Upper bound for primes.
    
    Returns:
        np.ndarray: Array of primes.
    """
    if limit < 2:
        return np.array([])
    
    sieve = np.ones(limit + 1, dtype=bool)
    sieve[0:2] = False
    for i in range(2, int(np.sqrt(limit)) + 1):
        if sieve[i]:
            sieve[i*i::i] = False
    return np.nonzero(sieve)[0]


def calculate_gaps(primes: np.ndarray) -> np.ndarray:
    """
    Calculate gaps between consecutive primes.
    
    Args:
        primes (np.ndarray): Sorted array of primes.
    
    Returns:
        np.ndarray: Array of gaps.
    """
    if len(primes) < 2:
        return np.array([])
    return np.diff(primes)


def find_twin_primes(primes: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """
    Find twin prime pairs (primes differing by 2).
    
    Args:
        primes (np.ndarray): Sorted array of primes.
    
    Returns:
        tuple: Arrays of first and second primes in each pair.
    """
    gaps = calculate_gaps(primes)
    twin_indices = np.where(gaps == 2)[0]
    return primes[twin_indices], primes[twin_indices + 1]


def analyze_distribution(primes: np.ndarray, num_bins: int = 50) -> tuple[np.ndarray, np.ndarray]:
    """
    Analyze prime distribution via histogram bins.
    
    Args:
        primes (np.ndarray): Sorted array of primes.
        num_bins (int): Number of histogram bins.
    
    Returns:
        tuple: Bin edges and counts.
    """
    if len(primes) == 0:
        return np.array([]), np.array([])
    return np.histogram(primes, bins=num_bins)