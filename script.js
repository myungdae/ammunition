// Activity Chart
function initActivityChart() {
    const canvas = document.getElementById('activityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    // Generate data points
    const dataPoints = 50;
    const data = [];
    for (let i = 0; i < dataPoints; i++) {
        data.push({
            x: (width / dataPoints) * i,
            y: height - (Math.random() * 0.6 + 0.2) * height
        });
    }
    
    // Animation
    let animationFrame = 0;
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Grid lines
        ctx.strokeStyle = '#2a3346';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 5; i++) {
            const y = (height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Draw gradient area
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(0, 255, 136, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
        
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        data.forEach((point, i) => {
            const offsetY = Math.sin(animationFrame * 0.02 + i * 0.1) * 10;
            ctx.lineTo(point.x, point.y + offsetY);
        });
        
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(0, data[0].y);
        
        data.forEach((point, i) => {
            const offsetY = Math.sin(animationFrame * 0.02 + i * 0.1) * 10;
            ctx.lineTo(point.x, point.y + offsetY);
        });
        
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw data points
        data.forEach((point, i) => {
            const offsetY = Math.sin(animationFrame * 0.02 + i * 0.1) * 10;
            ctx.beginPath();
            ctx.arc(point.x, point.y + offsetY, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#00ff88';
            ctx.fill();
        });
        
        animationFrame++;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Network Graph
function initNetworkGraph() {
    const canvas = document.getElementById('networkGraph');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    // Create nodes
    const nodes = [
        { x: width * 0.5, y: height * 0.3, radius: 20, color: '#00ff88', label: 'Core' },
        { x: width * 0.25, y: height * 0.6, radius: 15, color: '#0088ff', label: 'A1' },
        { x: width * 0.5, y: height * 0.7, radius: 15, color: '#0088ff', label: 'A2' },
        { x: width * 0.75, y: height * 0.6, radius: 15, color: '#0088ff', label: 'A3' },
        { x: width * 0.15, y: height * 0.85, radius: 12, color: '#9aa0a6', label: 'N1' },
        { x: width * 0.85, y: height * 0.85, radius: 12, color: '#9aa0a6', label: 'N2' }
    ];
    
    const connections = [
        [0, 1], [0, 2], [0, 3],
        [1, 4], [3, 5], [1, 2], [2, 3]
    ];
    
    let angle = 0;
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw connections
        connections.forEach(([from, to]) => {
            const nodeFrom = nodes[from];
            const nodeTo = nodes[to];
            
            const gradient = ctx.createLinearGradient(
                nodeFrom.x, nodeFrom.y,
                nodeTo.x, nodeTo.y
            );
            gradient.addColorStop(0, nodeFrom.color + '60');
            gradient.addColorStop(1, nodeTo.color + '60');
            
            ctx.beginPath();
            ctx.moveTo(nodeFrom.x, nodeFrom.y);
            ctx.lineTo(nodeTo.x, nodeTo.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Animated pulse
            const pulsePos = (Math.sin(angle + from * 0.5) + 1) / 2;
            const pulseX = nodeFrom.x + (nodeTo.x - nodeFrom.x) * pulsePos;
            const pulseY = nodeFrom.y + (nodeTo.y - nodeFrom.y) * pulsePos;
            
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#00ff88';
            ctx.fill();
        });
        
        // Draw nodes
        nodes.forEach((node, i) => {
            // Outer glow
            const glowRadius = node.radius + Math.sin(angle + i * 0.5) * 3 + 5;
            const gradient = ctx.createRadialGradient(
                node.x, node.y, node.radius,
                node.x, node.y, glowRadius
            );
            gradient.addColorStop(0, node.color + '40');
            gradient.addColorStop(1, node.color + '00');
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Node circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#121827';
            ctx.fill();
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Label
            ctx.fillStyle = '#e8eaed';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.label, node.x, node.y);
        });
        
        angle += 0.02;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Real-time updates simulation
function simulateRealTimeUpdates() {
    const operations = [
        { agent: 'Data Analyzer', operation: 'Pattern Recognition', duration: '2.3s', output: '847 patterns' },
        { agent: 'ML Predictor', operation: 'Model Training', duration: '45.2s', output: '95.3% accuracy' },
        { agent: 'Pattern Finder', operation: 'Anomaly Detection', duration: '12.8s', output: 'In progress...' },
        { agent: 'Report Gen', operation: 'Report Generation', duration: '8.1s', output: '12 reports' },
        { agent: 'Data Analyzer', operation: 'Data Ingestion', duration: '5.1s', output: '1.2GB processed' }
    ];
    
    const feedMessages = [
        { type: 'info', message: 'Agent deployed successfully' },
        { type: 'success', message: 'Analysis completed: 847 patterns found' },
        { type: 'warning', message: 'High memory usage detected' },
        { type: 'info', message: 'Data ingestion started' },
        { type: 'success', message: 'Model training completed' },
        { type: 'info', message: 'New task queued' }
    ];
    
    // Update stats periodically
    setInterval(() => {
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            const currentValue = parseFloat(stat.textContent);
            if (!isNaN(currentValue)) {
                const change = (Math.random() - 0.5) * 50;
                const newValue = Math.max(0, currentValue + change);
                stat.childNodes[0].textContent = Math.round(newValue).toLocaleString();
            }
        });
    }, 5000);
    
    // Add new feed item periodically
    setInterval(() => {
        const feedList = document.querySelector('.feed-list');
        if (!feedList) return;
        
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const randomMsg = feedMessages[Math.floor(Math.random() * feedMessages.length)];
        
        const feedItem = document.createElement('div');
        feedItem.className = 'feed-item';
        feedItem.style.animation = 'fadeIn 0.5s ease';
        feedItem.innerHTML = `
            <div class="feed-time">${time}</div>
            <div class="feed-content">
                <span class="feed-type ${randomMsg.type}">${randomMsg.type.toUpperCase()}</span>
                ${randomMsg.message}
            </div>
        `;
        
        feedList.insertBefore(feedItem, feedList.firstChild);
        
        // Keep only last 10 items
        while (feedList.children.length > 10) {
            feedList.removeChild(feedList.lastChild);
        }
    }, 8000);
}

// Update time display
function updateTime() {
    const timeDisplay = document.querySelector('.user-info span');
    if (timeDisplay && timeDisplay.textContent === 'System Active') {
        setInterval(() => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('ko-KR', { hour12: false });
            // Keep the status indicator functionality
        }, 1000);
    }
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('.data-table tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? '' : 'none';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initActivityChart();
    initNetworkGraph();
    simulateRealTimeUpdates();
    updateTime();
    initSearch();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initActivityChart();
            initNetworkGraph();
        }, 250);
    });
});
