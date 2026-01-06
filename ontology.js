// Ontology data structure from ammunition.ttl
const ontologyData = {
    nodes: [
        // Core Entities
        { id: 'Depot', label: 'Depot', type: 'core', description: '탄약 저장소/보관소', color: '#4A9EFF' },
        { id: 'GeoLocation', label: 'GeoLocation', type: 'core', description: '지리적 위치', color: '#4A9EFF' },
        { id: 'AmmoType', label: 'AmmoType', type: 'core', description: '탄약 유형 (5.56mm, 7.62mm 등)', color: '#4A9EFF' },
        { id: 'InventoryLine', label: 'InventoryLine', type: 'core', description: '재고 라인 (저장소 × 탄약유형)', color: '#4A9EFF' },
        { id: 'AmmunitionBatch', label: 'AmmunitionBatch', type: 'core', description: '탄약 배치/로트', color: '#4A9EFF' },
        { id: 'ForceBranch', label: 'ForceBranch', type: 'core', description: '군 부대 (육/해/공/해병/합동)', color: '#4A9EFF' },
        { id: 'Unit', label: 'Unit', type: 'core', description: '소비/요청 부대', color: '#4A9EFF' },
        { id: 'Manufacturer', label: 'Manufacturer', type: 'core', description: '제조업체/공급업체', color: '#4A9EFF' },
        
        // Events
        { id: 'ConsumptionEvent', label: 'ConsumptionEvent', type: 'event', description: '소비 이벤트', color: '#00C9DB' },
        { id: 'ProcurementOrder', label: 'ProcurementOrder', type: 'event', description: '조달 주문', color: '#00C9DB' },
        { id: 'Delivery', label: 'Delivery', type: 'event', description: '배송/접수 이벤트', color: '#00C9DB' },
        { id: 'IssueRequest', label: 'IssueRequest', type: 'event', description: '출고 요청', color: '#00C9DB' },
        { id: 'IssueEvent', label: 'IssueEvent', type: 'event', description: '출고 실행', color: '#00C9DB' },
        { id: 'TransferEvent', label: 'TransferEvent', type: 'event', description: '이동 이벤트', color: '#00C9DB' },
        { id: 'InspectionEvent', label: 'InspectionEvent', type: 'event', description: '검사/검수 이벤트', color: '#00C9DB' },
        
        // Policies & Rules
        { id: 'DemandProfile', label: 'DemandProfile', type: 'policy', description: '수요 프로파일', color: '#28C76F' },
        { id: 'ProductCatalog', label: 'ProductCatalog', type: 'policy', description: '제품 카탈로그', color: '#28C76F' },
        { id: 'ThresholdPolicy', label: 'ThresholdPolicy', type: 'policy', description: '임계값 정책', color: '#28C76F' },
        
        // Signals & Alerts
        { id: 'OperationalSignal', label: 'OperationalSignal', type: 'signal', description: '운영 시그널', color: '#FF9F43' },
        { id: 'InventoryAnomaly', label: 'InventoryAnomaly', type: 'signal', description: '재고 이상', color: '#FF9F43' },
        { id: 'FacilityRiskSignal', label: 'FacilityRiskSignal', type: 'signal', description: '시설 위험 시그널', color: '#FF9F43' },
        { id: 'SupplyDelaySignal', label: 'SupplyDelaySignal', type: 'signal', description: '공급 지연 시그널', color: '#FF9F43' },
        { id: 'Alert', label: 'Alert', type: 'signal', description: '경고/알림', color: '#FF9F43' },
        
        // Audit & Evidence
        { id: 'AuditRecord', label: 'AuditRecord', type: 'audit', description: '감사 기록', color: '#EA5455' },
        { id: 'EvidencePack', label: 'EvidencePack', type: 'audit', description: '증거 패키지', color: '#EA5455' }
    ],
    
    edges: [
        // Depot relationships
        { source: 'Depot', target: 'GeoLocation', label: 'hasLocation', type: 'location' },
        { source: 'Depot', target: 'InventoryLine', label: 'hasInventoryLine', type: 'inventory' },
        { source: 'Depot', target: 'AmmunitionBatch', label: 'storesBatch', type: 'storage' },
        
        // InventoryLine relationships
        { source: 'InventoryLine', target: 'AmmoType', label: 'forAmmoType', type: 'classification' },
        { source: 'InventoryLine', target: 'AmmunitionBatch', label: 'tracksBatch', type: 'tracking' },
        { source: 'InventoryLine', target: 'ThresholdPolicy', label: 'hasThresholdPolicy', type: 'policy' },
        
        // AmmunitionBatch relationships
        { source: 'AmmunitionBatch', target: 'AmmoType', label: 'batchOfType', type: 'classification' },
        { source: 'AmmunitionBatch', target: 'Manufacturer', label: 'producedBy', type: 'production' },
        
        // Unit & Demand relationships
        { source: 'Unit', target: 'ForceBranch', label: 'belongsTo', type: 'organization' },
        { source: 'Unit', target: 'DemandProfile', label: 'hasDemandProfile', type: 'planning' },
        { source: 'DemandProfile', target: 'AmmoType', label: 'forAmmoType', type: 'planning' },
        
        // Event relationships
        { source: 'ConsumptionEvent', target: 'Unit', label: 'consumedBy', type: 'event' },
        { source: 'ConsumptionEvent', target: 'AmmoType', label: 'consumesType', type: 'event' },
        { source: 'ProcurementOrder', target: 'Manufacturer', label: 'orderedFrom', type: 'event' },
        { source: 'ProcurementOrder', target: 'AmmoType', label: 'ordersType', type: 'event' },
        { source: 'Delivery', target: 'ProcurementOrder', label: 'fulfills', type: 'event' },
        { source: 'Delivery', target: 'Depot', label: 'deliversTo', type: 'event' },
        { source: 'IssueRequest', target: 'Unit', label: 'requestedBy', type: 'event' },
        { source: 'IssueRequest', target: 'AmmoType', label: 'requestsType', type: 'event' },
        { source: 'IssueEvent', target: 'IssueRequest', label: 'fulfills', type: 'event' },
        { source: 'IssueEvent', target: 'Depot', label: 'issuedFrom', type: 'event' },
        { source: 'TransferEvent', target: 'Depot', label: 'transfersBetween', type: 'event' },
        { source: 'InspectionEvent', target: 'Depot', label: 'inspects', type: 'event' },
        
        // Manufacturer relationships
        { source: 'Manufacturer', target: 'ProductCatalog', label: 'offers', type: 'catalog' },
        { source: 'ProductCatalog', target: 'AmmoType', label: 'catalogsType', type: 'catalog' },
        
        // Signal relationships
        { source: 'InventoryAnomaly', target: 'OperationalSignal', label: 'isA', type: 'inheritance' },
        { source: 'FacilityRiskSignal', target: 'OperationalSignal', label: 'isA', type: 'inheritance' },
        { source: 'SupplyDelaySignal', target: 'OperationalSignal', label: 'isA', type: 'inheritance' },
        { source: 'Alert', target: 'OperationalSignal', label: 'generatedFrom', type: 'signal' },
        { source: 'InventoryAnomaly', target: 'InventoryLine', label: 'detectedIn', type: 'signal' },
        { source: 'FacilityRiskSignal', target: 'Depot', label: 'affectsDepot', type: 'signal' },
        
        // Audit relationships
        { source: 'AuditRecord', target: 'IssueEvent', label: 'records', type: 'audit' },
        { source: 'AuditRecord', target: 'TransferEvent', label: 'records', type: 'audit' },
        { source: 'EvidencePack', target: 'OperationalSignal', label: 'contains', type: 'audit' }
    ]
};

class OntologyGraph {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.edges = [];
        this.selectedNode = null;
        this.hoveredNode = null;
        this.isDragging = false;
        this.dragNode = null;
        this.offset = { x: 0, y: 0 };
        this.scale = 1;
        this.pan = { x: 0, y: 0 };
        
        this.setupCanvas();
        this.setupEventListeners();
        this.loadData();
        this.animate();
    }
    
    setupCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.width = rect.width;
        this.height = rect.height;
    }
    
    loadData() {
        // Initialize nodes with physics properties
        this.nodes = ontologyData.nodes.map(node => ({
            ...node,
            x: Math.random() * (this.width - 200) + 100,
            y: Math.random() * (this.height - 200) + 100,
            vx: 0,
            vy: 0,
            radius: 25
        }));
        
        this.edges = ontologyData.edges;
        
        // Update statistics
        this.updateStatistics();
    }
    
    updateStatistics() {
        document.getElementById('totalNodes').textContent = this.nodes.length;
        document.getElementById('totalEdges').textContent = this.edges.length;
        document.getElementById('coreEntities').textContent = 
            this.nodes.filter(n => n.type === 'core').length;
        document.getElementById('eventTypes').textContent = 
            this.nodes.filter(n => n.type === 'event').length;
    }
    
    setupEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.onMouseUp());
        this.canvas.addEventListener('wheel', (e) => this.onWheel(e));
        this.canvas.addEventListener('click', (e) => this.onClick(e));
        
        document.getElementById('resetZoom').addEventListener('click', () => this.resetView());
        document.getElementById('closeDetails').addEventListener('click', () => this.closeDetails());
        
        window.addEventListener('resize', () => {
            this.setupCanvas();
        });
    }
    
    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left - this.pan.x) / this.scale,
            y: (e.clientY - rect.top - this.pan.y) / this.scale
        };
    }
    
    onMouseDown(e) {
        const pos = this.getMousePos(e);
        const node = this.getNodeAt(pos.x, pos.y);
        
        if (node) {
            this.isDragging = true;
            this.dragNode = node;
            this.offset = {
                x: pos.x - node.x,
                y: pos.y - node.y
            };
        }
    }
    
    onMouseMove(e) {
        const pos = this.getMousePos(e);
        
        if (this.isDragging && this.dragNode) {
            this.dragNode.x = pos.x - this.offset.x;
            this.dragNode.y = pos.y - this.offset.y;
        } else {
            this.hoveredNode = this.getNodeAt(pos.x, pos.y);
        }
    }
    
    onMouseUp() {
        this.isDragging = false;
        this.dragNode = null;
    }
    
    onWheel(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        this.scale *= delta;
        this.scale = Math.max(0.5, Math.min(3, this.scale));
    }
    
    onClick(e) {
        const pos = this.getMousePos(e);
        const node = this.getNodeAt(pos.x, pos.y);
        
        if (node) {
            this.selectedNode = node;
            this.showNodeDetails(node);
        }
    }
    
    getNodeAt(x, y) {
        return this.nodes.find(node => {
            const dx = x - node.x;
            const dy = y - node.y;
            return Math.sqrt(dx * dx + dy * dy) < node.radius;
        });
    }
    
    showNodeDetails(node) {
        const detailsContent = document.getElementById('detailsContent');
        const connectedEdges = this.edges.filter(e => 
            e.source === node.id || e.target === node.id
        );
        
        const incomingEdges = connectedEdges.filter(e => e.target === node.id);
        const outgoingEdges = connectedEdges.filter(e => e.source === node.id);
        
        detailsContent.innerHTML = `
            <div class="detail-section">
                <div class="detail-title">노드 이름</div>
                <div class="detail-value" style="font-size: 1.125rem; font-weight: 600; color: ${node.color};">
                    ${node.label}
                </div>
            </div>
            
            <div class="detail-section">
                <div class="detail-title">타입</div>
                <div class="detail-value">${node.type}</div>
            </div>
            
            <div class="detail-section">
                <div class="detail-title">설명</div>
                <div class="detail-value">${node.description}</div>
            </div>
            
            <div class="detail-section">
                <div class="detail-title">연결된 관계 (${connectedEdges.length})</div>
                <div class="property-list">
                    ${outgoingEdges.length > 0 ? `
                        <div class="detail-value" style="margin-bottom: 0.5rem; font-weight: 600;">
                            Outgoing (${outgoingEdges.length}):
                        </div>
                        ${outgoingEdges.map(e => `
                            <span class="relationship-badge">${e.label} → ${e.target}</span>
                        `).join('')}
                    ` : ''}
                    
                    ${incomingEdges.length > 0 ? `
                        <div class="detail-value" style="margin-top: 1rem; margin-bottom: 0.5rem; font-weight: 600;">
                            Incoming (${incomingEdges.length}):
                        </div>
                        ${incomingEdges.map(e => `
                            <span class="relationship-badge">${e.source} → ${e.label}</span>
                        `).join('')}
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    closeDetails() {
        const detailsContent = document.getElementById('detailsContent');
        detailsContent.innerHTML = '<p class="empty-state">노드를 클릭하여 상세 정보를 확인하세요</p>';
        this.selectedNode = null;
    }
    
    resetView() {
        this.scale = 1;
        this.pan = { x: 0, y: 0 };
    }
    
    applyForces() {
        // Simple force-directed layout
        const k = 0.01; // Spring constant
        const repulsion = 5000;
        
        // Apply repulsion between all nodes
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const node1 = this.nodes[i];
                const node2 = this.nodes[j];
                
                const dx = node2.x - node1.x;
                const dy = node2.y - node1.y;
                const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                
                const force = repulsion / (distance * distance);
                const fx = (dx / distance) * force;
                const fy = (dy / distance) * force;
                
                node1.vx -= fx;
                node1.vy -= fy;
                node2.vx += fx;
                node2.vy += fy;
            }
        }
        
        // Apply attraction along edges
        this.edges.forEach(edge => {
            const source = this.nodes.find(n => n.id === edge.source);
            const target = this.nodes.find(n => n.id === edge.target);
            
            if (source && target) {
                const dx = target.x - source.x;
                const dy = target.y - source.y;
                const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                
                const force = k * (distance - 150);
                const fx = (dx / distance) * force;
                const fy = (dy / distance) * force;
                
                source.vx += fx;
                source.vy += fy;
                target.vx -= fx;
                target.vy -= fy;
            }
        });
        
        // Update positions with damping
        this.nodes.forEach(node => {
            if (node !== this.dragNode) {
                node.x += node.vx;
                node.y += node.vy;
                node.vx *= 0.8;
                node.vy *= 0.8;
                
                // Keep nodes within bounds
                node.x = Math.max(50, Math.min(this.width - 50, node.x));
                node.y = Math.max(50, Math.min(this.height - 50, node.y));
            }
        });
    }
    
    draw() {
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.ctx.translate(this.pan.x, this.pan.y);
        this.ctx.scale(this.scale, this.scale);
        
        // Draw edges
        this.edges.forEach(edge => {
            const source = this.nodes.find(n => n.id === edge.source);
            const target = this.nodes.find(n => n.id === edge.target);
            
            if (source && target) {
                this.ctx.beginPath();
                this.ctx.moveTo(source.x, source.y);
                this.ctx.lineTo(target.x, target.y);
                this.ctx.strokeStyle = 'rgba(160, 163, 189, 0.2)';
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
                
                // Draw arrow
                const angle = Math.atan2(target.y - source.y, target.x - source.x);
                const arrowSize = 8;
                const arrowX = target.x - Math.cos(angle) * target.radius;
                const arrowY = target.y - Math.sin(angle) * target.radius;
                
                this.ctx.beginPath();
                this.ctx.moveTo(arrowX, arrowY);
                this.ctx.lineTo(
                    arrowX - arrowSize * Math.cos(angle - Math.PI / 6),
                    arrowY - arrowSize * Math.sin(angle - Math.PI / 6)
                );
                this.ctx.lineTo(
                    arrowX - arrowSize * Math.cos(angle + Math.PI / 6),
                    arrowY - arrowSize * Math.sin(angle + Math.PI / 6)
                );
                this.ctx.closePath();
                this.ctx.fillStyle = 'rgba(160, 163, 189, 0.3)';
                this.ctx.fill();
            }
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            const isSelected = node === this.selectedNode;
            const isHovered = node === this.hoveredNode;
            
            // Outer ring for selected/hovered
            if (isSelected || isHovered) {
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, node.radius + 5, 0, Math.PI * 2);
                this.ctx.strokeStyle = node.color;
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }
            
            // Node circle
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = node.color;
            this.ctx.fill();
            
            // Node label
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 11px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            const words = node.label.split(/(?=[A-Z])/);
            words.forEach((word, i) => {
                this.ctx.fillText(word, node.x, node.y + (i - (words.length - 1) / 2) * 12);
            });
        });
        
        this.ctx.restore();
    }
    
    animate() {
        this.applyForces();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize ontology graph when page loads
document.addEventListener('DOMContentLoaded', () => {
    const graph = new OntologyGraph('ontologyGraph');
});
