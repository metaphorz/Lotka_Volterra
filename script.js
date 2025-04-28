// Highlight the code and add line numbers
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
    
    // Initialize line numbers for blocks with line-numbers class
    document.querySelectorAll('pre.line-numbers').forEach((block) => {
        // Process after a small delay to ensure highlight.js has run
        setTimeout(() => {
            // Get the code element
            const codeElement = block.querySelector('code');
            if (!codeElement) return;
            
            // Get the raw content
            const rawContent = codeElement.textContent;
            
            // Split into lines, keeping empty lines
            const lines = rawContent.split('\n');
            const linesCount = lines.length;
            
            // Get or create line numbers container
            let lineNumbersContainer = block.querySelector('.line-numbers-rows');
            if (!lineNumbersContainer) {
                lineNumbersContainer = document.createElement('span');
                lineNumbersContainer.className = 'line-numbers-rows';
                block.appendChild(lineNumbersContainer);
            }
            
            // Clear and rebuild line numbers
            lineNumbersContainer.innerHTML = '';
            for (let i = 0; i < linesCount; i++) {
                const span = document.createElement('span');
                span.setAttribute('data-line', (i + 1).toString());
                lineNumbersContainer.appendChild(span);
            }
            
            // Create a wrapper for each line for better alignment
            const processedLines = [];
            lines.forEach((line, index) => {
                // Create a span for this line
                processedLines.push(`<span class="line" data-line-number="${index + 1}">${line}</span>`);
            });
            
            // Replace the content while preserving highlighting
            const currentHtml = codeElement.innerHTML;
            const newHtml = processedLines.join('\n');
            
            // Only update if needed to prevent flickering
            if (currentHtml !== newHtml) {
                // Store the current scroll position
                const scrollTop = block.scrollTop;
                
                // Apply the updated content
                codeElement.innerHTML = newHtml;
                
                // Restore scroll position
                block.scrollTop = scrollTop;
                
                // Re-apply highlighting
                hljs.highlightBlock(codeElement);
            }
            
            // Make the line numbers clickable and interactive
            document.querySelectorAll('.line-numbers-rows span').forEach((lineNumberSpan) => {
                lineNumberSpan.style.cursor = 'pointer';
                
                // Add click behavior
                lineNumberSpan.addEventListener('click', function() {
                    const lineNumber = this.getAttribute('data-line');
                    
                    // Highlight the line number
                    document.querySelectorAll('.line-numbers-rows span').forEach(span => {
                        span.classList.remove('active-line');
                    });
                    this.classList.add('active-line');
                    
                    // Highlight the corresponding code line
                    const codeLines = codeElement.querySelectorAll('.line');
                    codeLines.forEach(line => {
                        line.classList.remove('highlighted-line');
                        if (line.getAttribute('data-line-number') === lineNumber) {
                            line.classList.add('highlighted-line');
                        }
                    });
                });
            });
        }, 50); // Small delay to ensure highlighting is complete
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
    // Position regular term tooltips
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
    
    // Position equation term tooltips
    const equationTerms = document.querySelectorAll('.equation-term');
    equationTerms.forEach(term => {
        term.addEventListener('mouseenter', function(e) {
            const tooltip = this.querySelector('.term-meaning');
            if (!tooltip) return;
            
            // Get position of term
            const rect = this.getBoundingClientRect();
            
            // Calculate best position for tooltip
            const tooltipWidth = 500; // Same as in CSS
            const windowWidth = window.innerWidth;
            
            // Position below the term with slight offset
            let top = rect.bottom + 15;
            let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
            
            // Adjust horizontal position if too close to edge
            if (left < 10) left = 10;
            if (left + tooltipWidth > windowWidth - 10) 
                left = windowWidth - tooltipWidth - 10;
            
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
    
    // Add click handlers for line numbers
    document.querySelectorAll('.line-numbers-rows span').forEach((lineNumberSpan) => {
        // Make line numbers clickable
        lineNumberSpan.style.cursor = 'pointer';
        lineNumberSpan.addEventListener('click', function() {
            // Get the line number
            const lineNumber = this.getAttribute('data-line') || this.textContent;
            
            // Highlight the line
            const allLines = document.querySelectorAll('.line-numbers-rows span');
            allLines.forEach(span => span.classList.remove('active-line'));
            this.classList.add('active-line');
            
            // Could add more actions here, like copying line reference to clipboard
            console.log(`Line ${lineNumber} clicked`);
        });
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