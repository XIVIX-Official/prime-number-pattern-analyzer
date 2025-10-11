# Prime Number Pattern Analyzer

Analyze and visualize prime number patterns, including distribution, gaps, and twin primes using Python and Matplotlib.

## Features
- Efficient prime generation (Sieve of Eratosthenes).
- Statistical analysis: Gaps, twin primes, distribution histograms.
- Interactive web UI with Streamlit.
- CLI for quick plots.

## Installation
1. Clone the repo: `git clone https://github.com/XIVIX/prime-number-pattern-analyzer.git`
2. Install dependencies: `pip install -r requirements.txt`
3. Run the UI: `streamlit run app/main.py`
4. Or CLI: `python main.py --limit 10000 --plot gaps`

## Usage
- **UI**: Open in browser, adjust slider for limit, explore tabs.
- **CLI Example**: `python main.py --limit 50000 --plot twins` (shows plot and saves optionally).

## Project Structure
prime-number-pattern-analyzer/
├── src/                 # Core logic
│   └── primes.py
├── visualizations/      # Matplotlib plots
│   └── plots.py
├── app/                 # Streamlit UI
│   └── main.py
├── tests/               # Unit tests
│   └── test_primes.py
├── main.py              # CLI entry
├── requirements.txt
├── README.md
├── LICENSE
└── .gitignore

## Contributing
1. Fork and branch: `git checkout -b feature/your-feature`.
2. Add code/tests, commit, push, PR.
3. Run tests: `pytest`.

## License
MIT License (see LICENSE).