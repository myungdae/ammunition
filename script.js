// Event Chart - 24 Hour Trend
function initEventChart() {
    const canvas = document.getElementById('eventChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    // Data points for 24 hours
    const hours = 24;
    const dataPoints = [];
    
    // Generate sample data with some peaks
    const peakHours = [2, 8, 15, 20];
    for (let i = 0; i < hours; i++) {
        let value = Math.random() * 0.5;
        if (peakHours.includes(i)) {
            value = Math.random() * 2 + 1.5;
        }
        dataPoints.push({
            x: (width / (hours - 1)) * i,
            y: value
        });
    }
    
    // Find max value for scaling
    const maxValue = Math.max(...dataPoints.map(p => p.y));
    const scaleY = (height - 60) / maxValue;
    
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid lines
        ctx.strokeStyle = '#2d3142';
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= 3; i++) {
            const y = (height - 40) / 3 * i + 20;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
            
            // Grid labels
            ctx.fillStyle = '#6e7191';
            ctx.font = '11px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText((3 - i).toString(), 5, y - 5);
        }
        
        // Draw area fill
        const gradient = ctx.createLinearGradient(0, 0, 0, height - 40);
        gradient.addColorStop(0, 'rgba(74, 158, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(74, 158, 255, 0)');
        
        ctx.beginPath();
        ctx.moveTo(0, height - 40);
        
        dataPoints.forEach(point => {
            const y = height - 40 - (point.y * scaleY);
            ctx.lineTo(point.x, y);
        });
        
        ctx.lineTo(width, height - 40);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw line
        ctx.beginPath();
        dataPoints.forEach((point, i) => {
            const y = height - 40 - (point.y * scaleY);
            if (i === 0) {
                ctx.moveTo(point.x, y);
            } else {
                ctx.lineTo(point.x, y);
            }
        });
        ctx.strokeStyle = '#4A9EFF';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw data points
        dataPoints.forEach((point, i) => {
            const y = height - 40 - (point.y * scaleY);
            
            // Highlight peak points
            if (point.y > 1) {
                ctx.beginPath();
                ctx.arc(point.x, y, 6, 0, Math.PI * 2);
                ctx.fillStyle = '#4A9EFF';
                ctx.fill();
                ctx.strokeStyle = '#1a1d29';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Add value label on peaks
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 11px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(point.y.toFixed(1), point.x, y - 12);
            } else {
                ctx.beginPath();
                ctx.arc(point.x, y, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#4A9EFF';
                ctx.fill();
            }
        });
        
        // Draw time labels
        ctx.fillStyle = '#6e7191';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        
        for (let i = 0; i < hours; i += 3) {
            const x = (width / (hours - 1)) * i;
            const time = `${i.toString().padStart(2, '0')}:00`;
            ctx.fillText(time, x, height - 10);
        }
    }
    
    draw();
}

// Update stats with animation
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initEventChart();
    
    // Animate stat values on load
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const value = parseInt(stat.textContent);
        stat.textContent = '0';
        setTimeout(() => {
            animateValue(stat, 0, value, 1000);
        }, 300);
    });
    
    // Animate progress bars
    setTimeout(() => {
        const progressFills = document.querySelectorAll('.progress-fill');
        progressFills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 50);
        });
    }, 600);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initEventChart();
        }, 250);
    });
    
    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Simulate real-time updates
    setInterval(() => {
        const badges = document.querySelectorAll('.notification-badge');
        badges.forEach(badge => {
            const current = parseInt(badge.textContent);
            if (Math.random() > 0.7) {
                badge.textContent = current + 1;
                badge.style.animation = 'none';
                setTimeout(() => {
                    badge.style.animation = 'pulse 0.5s ease';
                }, 10);
            }
        });
    }, 10000);
});

// Add pulse animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
`;
document.head.appendChild(style);
