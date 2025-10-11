"""
CLI entrypoint for non-UI usage.
Run: python main.py --limit 10000
"""

import argparse
import matplotlib.pyplot as plt

from src.primes import sieve_of_eratosthenes
from visualizations.plots import plot_prime_distribution, plot_prime_gaps, plot_twin_primes


def main():
    parser = argparse.ArgumentParser(description="Analyze prime number patterns.")
    parser.add_argument("--limit", type=int, default=10000, help="Upper limit for primes")
    parser.add_argument("--plot", choices=["distribution", "gaps", "twins"], help="Plot type")
    args = parser.parse_args()
    
    primes = sieve_of_eratosthenes(args.limit)
    print(f"Generated {len(primes):,} primes up to {args.limit:,}")
    
    if args.plot == "distribution":
        plot_prime_distribution(args.limit)
    elif args.plot == "gaps":
        plot_prime_gaps(args.limit)
    elif args.plot == "twins":
        plot_twin_primes(args.limit)
    else:
        # Default: Show all
        plot_prime_distribution(args.limit)
        plot_prime_gaps(args.limit)
        plot_twin_primes(args.limit)
    
    plt.show()


if __name__ == "__main__":
    main()