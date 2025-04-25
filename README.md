# Interactive Lotka-Volterra Predator-Prey Model

This repository contains an interactive web application for exploring the Lotka-Volterra predator-prey equations, with a focus on connecting the mathematical notation to actual Python code implementation.

## Features

- Interactive equations with hover explanations for each term
- Direct links between equation variables/constants and their code implementations
- Complete Python implementation of the model
- Interactive tooltips show code snippets for each mathematical component
- Tabbed interface to switch between math and code views

## Files

- `index.html` - The main HTML file for the interactive documentation
- `styles.css` - CSS styles for the application
- `script.js` - JavaScript for the interactive features
- `lotka_volterra.py` - Python implementation of the Lotka-Volterra model

## How to Use

1. Open `index.html` in a web browser
2. Hover over any term in the equations to see:
   - Its meaning in the model
   - How it's implemented in Python code
3. Switch between "Equations" and "Python Implementation" tabs to see different views
4. Run the Python implementation directly with `python lotka_volterra.py`

## The Lotka-Volterra Model

The Lotka-Volterra equations describe the dynamics of a simple predator-prey ecosystem. The model consists of two coupled differential equations:

1. For prey population growth: dx/dt = αx - βxy
2. For predator population growth: dy/dt = -γy + δxy

Where:
- x: Prey population
- y: Predator population
- α: Prey growth rate
- β: Predation rate
- γ: Predator death rate
- δ: Predator efficiency

## Requirements for Python Implementation

- Python 3.x
- NumPy
- Matplotlib
- SciPy

Install dependencies with:
```
pip install numpy matplotlib scipy
```