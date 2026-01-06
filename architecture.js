// Architecture Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Architecture page loaded');
    
    // Initialize layer interactions
    initializeLayerInteractions();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize comparison animations
    initializeComparisonAnimations();
});

// Layer Interactions
function initializeLayerInteractions() {
    const layers = document.querySelectorAll('.layer-card');
    
    layers.forEach(layer => {
        layer.addEventListener('click', function() {
            // Toggle active state
            layers.forEach(l => l.classList.remove('active-layer'));
            this.classList.add('active-layer');
            
            // Get layer number
            const layerNum = this.getAttribute('data-layer');
            console.log(`Layer ${layerNum} selected`);
            
            // Highlight related layers (optional enhancement)
            highlightRelatedLayers(layerNum);
        });
    });
}

// Highlight Related Layers
function highlightRelatedLayers(layerNum) {
    const layers = document.querySelectorAll('.layer-card');
    
    layers.forEach(layer => {
        const num = parseInt(layer.getAttribute('data-layer'));
        const selected = parseInt(layerNum);
        
        // Dim layers that are not adjacent
        if (Math.abs(num - selected) > 1) {
            layer.style.opacity = '0.5';
        } else {
            layer.style.opacity = '1';
        }
    });
    
    // Reset after 2 seconds
    setTimeout(() => {
        layers.forEach(layer => {
            layer.style.opacity = '1';
        });
    }, 2000);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all major sections
    const sections = document.querySelectorAll('.use-case-card, .benefit-card, .comparison-card');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Comparison Animations
function initializeComparisonAnimations() {
    const comparisonCards = document.querySelectorAll('.comparison-card');
    
    comparisonCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Interactive Layer Visualization (Canvas-based)
function initializeLayerVisualization() {
    const canvas = document.getElementById('layerCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth * 2; // Retina
    const height = canvas.height = 400 * 2;
    ctx.scale(2, 2);
    
    // Layer data
    const layers = [
        { name: 'Data Layer', y: 350, color: '#EA5455' },
        { name: 'Ontology Core', y: 290, color: '#28C76F' },
        { name: 'SWRL Reasoning', y: 230, color: '#00C9DB' },
        { name: 'SHACL Control', y: 170, color: '#FF9F43' },
        { name: 'Governance', y: 110, color: '#4A9EFF' },
        { name: 'Human Decision', y: 50, color: '#9F7AEA' }
    ];
    
    // Animation
    let animationFrame = 0;
    
    function animate() {
        ctx.clearRect(0, 0, width / 2, height / 2);
        
        // Draw layers
        layers.forEach((layer, index) => {
            const opacity = Math.sin(animationFrame * 0.02 + index * 0.5) * 0.2 + 0.8;
            
            // Layer box
            ctx.fillStyle = layer.color;
            ctx.globalAlpha = opacity * 0.2;
            ctx.fillRect(50, layer.y - 20, width / 2 - 100, 40);
            
            // Layer border
            ctx.strokeStyle = layer.color;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 2;
            ctx.strokeRect(50, layer.y - 20, width / 2 - 100, 40);
            
            // Layer text
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 1;
            ctx.font = '14px Arial';
            ctx.fillText(layer.name, 60, layer.y);
            
            // Draw arrow to next layer
            if (index < layers.length - 1) {
                drawArrow(ctx, width / 4, layer.y + 20, width / 4, layers[index + 1].y - 20, layer.color, opacity);
            }
        });
        
        animationFrame++;
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
}

// Draw Arrow Helper
function drawArrow(ctx, fromX, fromY, toX, toY, color, opacity) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.lineWidth = 2;
    
    // Line
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    
    // Arrowhead
    const headLength = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - headLength * Math.cos(angle - Math.PI / 6),
        toY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
        toX - headLength * Math.cos(angle + Math.PI / 6),
        toY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
    
    ctx.globalAlpha = 1;
}

// Add CSS for visible animation
const style = document.createElement('style');
style.textContent = `
    .use-case-card,
    .benefit-card,
    .comparison-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .use-case-card.visible,
    .benefit-card.visible,
    .comparison-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .layer-card.active-layer {
        border-color: var(--blue);
        box-shadow: 0 0 30px rgba(74, 158, 255, 0.3);
        transform: translateY(-4px);
    }
`;
document.head.appendChild(style);

// Export functions for potential external use
window.ArchitecturePage = {
    highlightLayer: function(layerNum) {
        const layer = document.querySelector(`[data-layer="${layerNum}"]`);
        if (layer) {
            layer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            layer.click();
        }
    },
    
    resetView: function() {
        const layers = document.querySelectorAll('.layer-card');
        layers.forEach(layer => {
            layer.classList.remove('active-layer');
            layer.style.opacity = '1';
        });
    }
};

console.log('Architecture Page: Ready');
