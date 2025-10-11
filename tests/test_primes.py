"""
Basic tests for primes module.
Run: pytest tests/
"""

import pytest
import numpy as np
from src.primes import sieve_of_eratosthenes, calculate_gaps, find_twin_primes


def test_sieve_small():
    primes = sieve_of_eratosthenes(10)
    expected = np.array([2, 3, 5, 7])
    np.testing.assert_array_equal(primes, expected)


def test_gaps():
    primes = np.array([2, 3, 5, 7])
    gaps = calculate_gaps(primes)
    expected = np.array([1, 2, 2])
    np.testing.assert_array_equal(gaps, expected)


def test_twin_primes():
    primes = np.array([3, 5, 7, 11])
    p1, p2 = find_twin_primes(primes)
    expected_p1 = np.array([3, 5])
    expected_p2 = np.array([5, 7])
    np.testing.assert_array_equal(p1, expected_p1)
    np.testing.assert_array_equal(p2, expected_p2)
