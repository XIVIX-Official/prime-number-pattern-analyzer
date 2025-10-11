"""
Visualization module using Matplotlib for prime patterns.
"""

import matplotlib.pyplot as plt
import numpy as np
from typing import Tuple

from src.primes import sieve_of_eratosthenes, calculate_gaps, find_twin_primes, analyze_distribution


def plot_prime_distribution(limit: int, save_path: str = None) -> plt.Figure:
    """
    Plot cumulative prime distribution.
    
    Args:
        limit (int): Upper bound for primes.
        save_path (str): Optional path to save the figure.
    
    Returns:
        plt.Figure: The generated plot.
    """
    primes = sieve_of_eratosthenes(limit)
    x = np.arange(1, limit + 1)
    y = np.cumsum(np.isin(x, primes).astype(int))
    
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.plot(x, y, 'b-', linewidth=1.5, label='Cumulative Primes')
    ax.set_xlabel('Number')
    ax.set_ylabel('Number of Primes ≤ n')
    ax.set_title(f'Prime Number Distribution up to {limit:,}')
    ax.grid(True, alpha=0.3)
    ax.legend()
    plt.tight_layout()
    
    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
    return fig


def plot_prime_gaps(limit: int, save_path: str = None) -> plt.Figure:
    """
    Plot histogram of prime gaps.
    
    Args:
        limit (int): Upper bound for primes.
        save_path (str): Optional path to save the figure.
    
    Returns:
        plt.Figure: The generated plot.
    """
    primes = sieve_of_eratosthenes(limit)
    gaps = calculate_gaps(primes)
    
    fig, ax = plt.subplots(figsize=(10, 6))
    if len(gaps) > 0:
        ax.hist(gaps, bins=30, edgecolor='black', alpha=0.7, color='orange')
        ax.axvline(np.mean(gaps), color='red', linestyle='--', label=f'Mean Gap: {np.mean(gaps):.2f}')
    ax.set_xlabel('Gap Size')
    ax.set_ylabel('Frequency')
    ax.set_title(f'Prime Gaps Distribution up to {limit:,}')
    ax.grid(True, alpha=0.3)
    ax.legend()
    plt.tight_layout()
    
    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
    return fig


def plot_twin_primes(limit: int, save_path: str = None) -> plt.Figure:
    """
    Scatter plot of twin prime pairs.
    
    Args:
        limit (np.ndarray): Upper bound for primes.
        save_path (str): Optional path to save the figure.
    
    Returns:
        plt.Figure: The generated plot.
    """
    primes = sieve_of_eratosthenes(limit)
    p1, p2 = find_twin_primes(primes)
    
    fig, ax = plt.subplots(figsize=(10, 6))
    if len(p1) > 0:
        ax.scatter(p1, p2, s=20, alpha=0.6, color='green')
        for i in range(0, len(p1), max(1, len(p1)//10)):  # Label every 10th for readability
            ax.annotate(f'({p1[i]}, {p2[i]})', (p1[i], p2[i]), xytext=(5, 5), textcoords='offset points')
    ax.plot([0, limit], [0, limit], 'k--', alpha=0.3)  # Diagonal for reference
    ax.set_xlabel('First Twin Prime')
    ax.set_ylabel('Second Twin Prime')
    ax.set_title(f'Twin Primes up to {limit:,} (Count: {len(p1)})')
    ax.grid(True, alpha=0.3)
    plt.tight_layout()
    
    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
    return fig