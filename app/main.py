"""
Modern Streamlit UI for prime number analyzer.
Run: streamlit run app/main.py
"""

import streamlit as st
import matplotlib.pyplot as plt
import io
from typing import Tuple

import numpy as np

from src.primes import sieve_of_eratosthenes, calculate_gaps, find_twin_primes, analyze_distribution
from visualizations.plots import plot_prime_distribution, plot_prime_gaps, plot_twin_primes


# Custom CSS for modern, stylish look
st.markdown("""
    <style>
    .main {background-color: #f0f2f6;}
    .stMetric {background-color: #ffffff; border-radius: 10px; padding: 10px;}
    .stPlotlyChart {border-radius: 10px;}
    h1 {color: #1f77b4; font-family: 'Segoe UI', sans-serif;}
    .stSlider > div > div > div > div {background-color: #1f77b4;}
    </style>
""", unsafe_allow_html=True)

# Page config for modern layout
st.set_page_config(page_title="Prime Pattern Analyzer", layout="wide", initial_sidebar_state="expanded")

st.title("🔢 Prime Number Pattern Analyzer")
st.markdown("---")

# Sidebar for inputs
st.sidebar.header("⚙️ Controls")
limit = st.sidebar.slider("Prime Limit", min_value=1000, max_value=100000, value=10000, step=1000)
num_bins = st.sidebar.slider("Histogram Bins (for Gaps/Distribution)", 10, 100, 50)

# Generate primes once
@st.cache_data
def get_primes(limit: int):
    return sieve_of_eratosthenes(limit)

primes = get_primes(limit)
gaps = calculate_gaps(primes)
p1, p2 = find_twin_primes(primes)
dist_bins, dist_counts = analyze_distribution(primes, num_bins)

# Metrics row
col1, col2, col3, col4 = st.columns(4)
with col1:
    st.metric("Total Primes", f"{len(primes):,}")
with col2:
    st.metric("Max Gap", f"{np.max(gaps) if len(gaps)>0 else 0}")
with col3:
    st.metric("Twin Pairs", f"{len(p1)}")
with col4:
    st.metric("Mean Gap", f"{np.mean(gaps):.2f}" if len(gaps)>0 else "N/A")

st.markdown("---")

# Tabs for analyses
tab1, tab2, tab3 = st.tabs(["📈 Distribution", "📊 Gaps", "👯 Twin Primes"])

with tab1:
    st.subheader("Cumulative Prime Distribution")
    fig_dist = plot_prime_distribution(limit)
    st.pyplot(fig_dist)
    
    # Download button
    buf = io.BytesIO()
    fig_dist.savefig(buf, format='png')
    st.download_button("Download Plot", buf.getvalue(), "distribution.png", "image/png")

with tab2:
    st.subheader("Prime Gaps Histogram")
    fig_gaps = plot_prime_gaps(limit)
    st.pyplot(fig_gaps)
    
    buf = io.BytesIO()
    fig_gaps.savefig(buf, format='png')
    st.download_button("Download Plot", buf.getvalue(), "gaps.png", "image/png")

with tab3:
    st.subheader("Twin Primes Scatter")
    fig_twins = plot_twin_primes(limit)
    st.pyplot(fig_twins)
    
    buf = io.BytesIO()
    fig_twins.savefig(buf, format='png')
    st.download_button("Download Plot", buf.getvalue(), "twins.png", "image/png")

# Footer
st.markdown("---")
st.markdown("*Powered by XIVIX*")