import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

def lotka_volterra(t, z, alpha, beta, gamma, delta):
    """
    Implementation of the Lotka-Volterra predator-prey model.
    
    Parameters:
    -----------
    t : float
        Time (independent variable)
    z : array
        Current state [x, y] where:
        x : float - Prey population
        y : float - Predator population
    alpha : float
        Prey growth rate (reproduction rate of prey when no predators)
    beta : float
        Predation rate (rate at which predators consume prey)
    gamma : float
        Predator death rate (mortality rate of predators without prey)
    delta : float
        Predator efficiency (conversion rate of consumed prey into predator births)
    
    Returns:
    --------
    dzdt : array
        Rate of change [dx/dt, dy/dt]
    """
    x, y = z
    dxdt = alpha * x - beta * x * y  # Rate of change of prey population
    dydt = -gamma * y + delta * x * y  # Rate of change of predator population
    return [dxdt, dydt]

def simulate_lotka_volterra(alpha=1.1, beta=0.4, gamma=0.4, delta=0.1, 
                            x0=10.0, y0=5.0, t_max=100, n_points=1000):
    """
    Run a simulation of the Lotka-Volterra model with the given parameters.
    
    Parameters:
    -----------
    alpha : float
        Prey growth rate
    beta : float
        Predation rate
    gamma : float
        Predator death rate
    delta : float
        Predator efficiency
    x0 : float
        Initial prey population
    y0 : float
        Initial predator population
    t_max : float
        Maximum simulation time
    n_points : int
        Number of time points to evaluate
        
    Returns:
    --------
    t : array
        Time points
    x : array
        Prey population at each time point
    y : array
        Predator population at each time point
    """
    # Time parameters
    t_span = (0, t_max)
    t_eval = np.linspace(t_span[0], t_span[1], n_points)
    
    # Solve the differential equations
    solution = solve_ivp(
        fun=lambda t, z: lotka_volterra(t, z, alpha, beta, gamma, delta),
        t_span=t_span,
        y0=[x0, y0],
        t_eval=t_eval,
        method='RK45'  # Runge-Kutta method
    )
    
    # Extract results
    t = solution.t
    x = solution.y[0]  # Prey population over time
    y = solution.y[1]  # Predator population over time
    
    return t, x, y

def plot_results(t, x, y, save_path=None):
    """
    Plot the results of a Lotka-Volterra simulation.
    
    Parameters:
    -----------
    t : array
        Time points
    x : array
        Prey population at each time point
    y : array
        Predator population at each time point
    save_path : str, optional
        If provided, save the figure to this path
    """
    plt.figure(figsize=(12, 8))
    
    # Population over time
    plt.subplot(2, 1, 1)
    plt.plot(t, x, 'b-', label='Prey (x)')
    plt.plot(t, y, 'r-', label='Predator (y)')
    plt.grid(True)
    plt.xlabel('Time')
    plt.ylabel('Population')
    plt.title('Lotka-Volterra Model: Population Dynamics')
    plt.legend()
    
    # Phase portrait
    plt.subplot(2, 1, 2)
    plt.plot(x, y, 'g-')
    plt.grid(True)
    plt.xlabel('Prey Population (x)')
    plt.ylabel('Predator Population (y)')
    plt.title('Phase Portrait')
    
    plt.tight_layout()
    
    if save_path:
        plt.savefig(save_path)
    else:
        plt.show()
    
    # Print some statistics
    print(f"Maximum prey population: {np.max(x):.2f}")
    print(f"Maximum predator population: {np.max(y):.2f}")
    print(f"Average prey population: {np.mean(x):.2f}")
    print(f"Average predator population: {np.mean(y):.2f}")

def generate_time_plot(t, x, y, save_path='population_time_plot.png'):
    """Generate and save the population vs time plot"""
    plt.figure(figsize=(10, 6))
    plt.plot(t, x, 'b-', linewidth=2, label='Prey (x)')
    plt.plot(t, y, 'r-', linewidth=2, label='Predator (y)')
    plt.grid(True, alpha=0.3)
    plt.xlabel('Time', fontsize=12)
    plt.ylabel('Population', fontsize=12)
    plt.title('Lotka-Volterra Model: Population Dynamics', fontsize=14)
    plt.legend(fontsize=12)
    
    # Add annotations for key points in the cycle
    # Find the first peak of prey population after initial transient
    start_idx = 100  # Skip initial transient
    prey_peak_idx = start_idx + np.argmax(x[start_idx:start_idx+200])
    
    # Add arrows and annotations
    plt.annotate('Prey increases', 
                 xy=(t[prey_peak_idx-80], x[prey_peak_idx-80]),
                 xytext=(t[prey_peak_idx-80]-10, x[prey_peak_idx-80]-2),
                 arrowprops=dict(facecolor='blue', shrink=0.05, width=1.5, headwidth=8))
                 
    plt.annotate('Predators increase\nas prey abundant', 
                 xy=(t[prey_peak_idx], y[prey_peak_idx]),
                 xytext=(t[prey_peak_idx]+5, y[prey_peak_idx]+3),
                 arrowprops=dict(facecolor='red', shrink=0.05, width=1.5, headwidth=8))
    
    plt.tight_layout()
    plt.savefig(save_path, dpi=150, bbox_inches='tight')
    plt.close()

def generate_phase_portrait(x, y, save_path='phase_portrait.png'):
    """Generate and save the phase portrait plot"""
    plt.figure(figsize=(8, 8))
    plt.plot(x, y, 'g-', linewidth=2)
    
    # Add arrow to show direction
    arrows_idx = np.linspace(0, len(x)-100, 8, dtype=int)
    for i in arrows_idx:
        plt.arrow(x[i], y[i], x[i+10]-x[i], y[i+10]-y[i], 
                  head_width=0.5, head_length=0.7, fc='g', ec='g')
    
    plt.grid(True, alpha=0.3)
    plt.xlabel('Prey Population (x)', fontsize=12)
    plt.ylabel('Predator Population (y)', fontsize=12)
    plt.title('Phase Portrait', fontsize=14)
    
    # Add equilibrium point
    eq_x = 4  # gamma/delta
    eq_y = 2.75  # alpha/beta
    plt.scatter([eq_x], [eq_y], color='red', s=100, zorder=5)
    plt.annotate('Equilibrium\nPoint', 
                 xy=(eq_x, eq_y),
                 xytext=(eq_x+2, eq_y+2),
                 arrowprops=dict(facecolor='black', shrink=0.05, width=1.5, headwidth=8))
    
    plt.tight_layout()
    plt.savefig(save_path, dpi=150, bbox_inches='tight')
    plt.close()

if __name__ == "__main__":
    # Simulate the model
    t, x, y = simulate_lotka_volterra(alpha=1.1, beta=0.4, gamma=0.4, delta=0.1, 
                                     x0=10.0, y0=5.0, t_max=100, n_points=1000)
    
    # Generate individual plots for the web app
    generate_time_plot(t, x, y)
    generate_phase_portrait(x, y)
    
    # Also generate the combined plot
    plot_results(t, x, y)