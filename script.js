// Highlight the code
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
});

// Tab switching functionality
function switchTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Deactivate all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Activate the selected tab and content
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.tab[onclick="switchTab('${tabId}')"]`).classList.add('active');
}

// Position tooltips properly when hovered
document.addEventListener('DOMContentLoaded', function() {
    const terms = document.querySelectorAll('.term');
    
    terms.forEach(term => {
        term.addEventListener('mouseenter', function(e) {
            const tooltip = this.querySelector('.tooltip');
            if (!tooltip) return;
            
            // Get position of term
            const rect = this.getBoundingClientRect();
            
            // Calculate best position for tooltip
            const tooltipWidth = 450; // Same as in CSS
            const windowWidth = window.innerWidth;
            
            // Default positioning above the term
            let top = rect.top - tooltip.offsetHeight - 10;
            let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
            
            // Adjust horizontal position if too close to edge
            if (left < 10) left = 10;
            if (left + tooltipWidth > windowWidth - 10) 
                left = windowWidth - tooltipWidth - 10;
            
            // If tooltip would be above viewport, position it below the term
            if (top < 10) {
                top = rect.bottom + 10;
            }
            
            // Position tooltip
            tooltip.style.top = `${top}px`;
            tooltip.style.left = `${left}px`;
        });
    });
});

// Ensure MathJax properly processes the equations
window.onload = function() {
    // Highlight all code blocks
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
    
    // MathJax v3 way to typeset the page
    if (window.MathJax && window.MathJax.typeset) {
        window.MathJax.typeset();
    }
    // Fallback for MathJax v2
    else if (window.MathJax && window.MathJax.Hub) {
        window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
};