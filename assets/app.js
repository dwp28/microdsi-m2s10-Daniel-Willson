/**
 * MicroDSI (M2-S10) - Application Logic
 * Premium Version
 */

// --- DATA STRUCTURES ---

const TRACKS = {
    ITSM: { id: 'ITSM', name: 'Gestión IT (ITSM)', icon: '💻', color: '#10b981' },
    HR: { id: 'HR', name: 'Recursos Humanos (HR)', icon: '👥', color: '#8b5cf6' },
    PROCUREMENT: { id: 'PROCUREMENT', name: 'Compras (Procurement)', icon: '🛒', color: '#3b82f6' }
};

const LESSONS = [
    {
        id: 1,
        track: 'ITSM',
        title: 'Gestión de Incidentes vs Problemas',
        description: 'Aprende a diferenciar la resolución rápida de la búsqueda de la causa raíz en ITIL 4.',
        tag: 'Fundamentos',
        readTime: '5 min'
    },
    {
        id: 2,
        track: 'ITSM',
        title: 'Autoservicio y Service Desk',
        description: 'Cómo implementar un portal de usuario que reduzca la carga del Nivel 1 en un 30%.',
        tag: 'Estrategia',
        readTime: '7 min'
    },
    {
        id: 3,
        track: 'HR',
        title: 'Onboarding Digital',
        description: 'Optimización del proceso de alta de empleados usando flujos automatizados.',
        tag: 'Experiencia',
        readTime: '6 min'
    },
    {
        id: 4,
        track: 'HR',
        title: 'Gestión del Talento y Upskilling',
        description: 'Identificación de brechas de habilidades y planes de desarrollo personalizados.',
        tag: 'Retención',
        readTime: '8 min'
    },
    {
        id: 5,
        track: 'PROCUREMENT',
        title: 'Ciclo Procure-to-Pay',
        description: 'Desde la solicitud de compra hasta el pago final: visibilidad y control total.',
        tag: 'Eficiencia',
        readTime: '10 min'
    },
    {
        id: 6,
        track: 'PROCUREMENT',
        title: 'Evaluación de Proveedores',
        description: 'Criterios de scoring para seleccionar partners estratégicos basados en riesgo y calidad.',
        tag: 'Riesgo',
        readTime: '5 min'
    }
];

const PISTA_STEPS = {
    ITSM: [
        { title: 'Definición del Servicio', content: 'Identifica el servicio crítico para el negocio (Ej: Acceso a ERP).' },
        { title: 'Mapeo de Actores', content: 'Define quiénes son los usuarios finales y los técnicos responsables.' },
        { title: 'SLA Inicial', content: 'Establece tiempos de respuesta y resolución realistas.' },
        { title: 'Canales de Entrada', content: 'Define por dónde llegarán los tickets (Correo, Portal, Chat).' }
    ],
    HR: [
        { title: 'Requerimiento de Posición', content: 'Define el perfil y las competencias necesarias para el puesto.' },
        { title: 'Criba Curricular', content: 'Implementa filtros automáticos para descartar candidatos no aptos.' },
        { title: 'Entrevistas Técnicas', content: 'Diseña la evaluación práctica para validar conocimientos.' },
        { title: 'Oferta y Contratación', content: 'Genera el contrato y el paquete de bienvenida automáticamente.' }
    ],
    PROCUREMENT: [
        { title: 'Requisición de Compra', content: 'Captura el requerimiento detallado del área solicitante.' },
        { title: 'Licitación (RFP)', content: 'Solicita presupuestos a al menos 3 proveedores homologados.' },
        { title: 'Orden de Compra', content: 'Genera el documento legal con precios y fechas pactadas.' },
        { title: 'Recepción y Factura', content: 'Verifica la mercancía y concilia con la factura del proveedor.' }
    ]
};

// --- STATE MANAGEMENT ---

let currentTrack = localStorage.getItem('microdsi_track') || 'ITSM';
let labData = JSON.parse(localStorage.getItem('microdsi_lab')) || {
    inventory: [],
    top5: [],
    sipoc: { suppliers: '', inputs: '', process: '', outputs: '', customers: '' },
    noScope: ''
};

// --- CORE FUNCTIONS ---

function setTrack(trackId) {
    currentTrack = trackId;
    localStorage.setItem('microdsi_track', trackId);
    renderAll();
    // Re-render components if they exist on current page
    updateTrackButtons();
}

function updateTrackButtons() {
    const btns = document.querySelectorAll('.track-btn');
    btns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.track === currentTrack);
    });
}

function renderAll() {
    const feedGrid = document.getElementById('feed-grid');
    if (feedGrid) renderFeed(feedGrid);

    const pistaContent = document.getElementById('pista-content');
    if (pistaContent) renderPista(pistaContent);

    const labTrackDisplay = document.getElementById('lab-current-track');
    if (labTrackDisplay) labTrackDisplay.textContent = TRACKS[currentTrack].name;
}

// --- FEED PAGE LOGIC ---

function renderFeed(container) {
    const filtered = LESSONS.filter(l => l.track === currentTrack);
    container.innerHTML = filtered.map(lesson => `
        <div class="card animate-fade">
            <span class="card-tag" style="color: ${TRACKS[lesson.track].color}">${lesson.tag}</span>
            <h3>${lesson.title}</h3>
            <p>${lesson.description}</p>
            <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.8rem; color: var(--text-muted)">⏱️ ${lesson.readTime}</span>
                <a href="#" class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Leer más</a>
            </div>
        </div>
    `).join('');
}

// --- PISTA PAGE LOGIC ---

let currentStep = 0;

function renderPista(container) {
    const steps = PISTA_STEPS[currentTrack];
    const progress = ((currentStep + 1) / steps.length) * 100;
    
    document.querySelector('.progress-bar').style.width = `${progress}%`;
    
    const step = steps[currentStep];
    container.innerHTML = `
        <div class="step-card animate-fade">
            <span style="color: var(--accent); font-weight: 800; font-size: 0.8rem; text-transform: uppercase;">Paso ${currentStep + 1} de ${steps.length}</span>
            <h2 style="margin: 1rem 0;">${step.title}</h2>
            <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2.5rem;">${step.content}</p>
            <div style="display: flex; gap: 1rem;">
                <button class="btn btn-outline" onclick="prevStep()" ${currentStep === 0 ? 'disabled' : ''}>Anterior</button>
                <button class="btn btn-primary" onclick="nextStep()">${currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}</button>
            </div>
        </div>
    `;
}

function nextStep() {
    if (currentStep < PISTA_STEPS[currentTrack].length - 1) {
        currentStep++;
        renderPista(document.getElementById('pista-content'));
    } else {
        window.location.href = 'lab.html';
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        renderPista(document.getElementById('pista-content'));
    }
}

// --- LAB PAGE LOGIC ---

function saveLab() {
    // Update SIPOC state before saving
    if (document.getElementById('sipoc-suppliers')) {
        labData.sipoc = {
            suppliers: document.getElementById('sipoc-suppliers').value,
            inputs: document.getElementById('sipoc-inputs').value,
            process: document.getElementById('sipoc-process').value,
            outputs: document.getElementById('sipoc-outputs').value,
            customers: document.getElementById('sipoc-customers').value
        };
        labData.noScope = document.getElementById('no-scope-text').value;
    }
    localStorage.setItem('microdsi_lab', JSON.stringify(labData));
}

function addProcess() {
    const name = document.getElementById('proc-name').value;
    if (!name) return;

    const proc = {
        id: Date.now(),
        name,
        impact: 1,
        effort: 1,
        risk: 1,
        score: 3
    };

    labData.inventory.push(proc);
    document.getElementById('proc-name').value = '';
    renderInventory();
    saveLab();
}

function updateScore(id, field, value) {
    const proc = labData.inventory.find(p => p.id === id);
    if (proc) {
        proc[field] = parseInt(value);
        proc.score = proc.impact + proc.effort + proc.risk;
        renderInventory();
        saveLab();
    }
}

function renderInventory() {
    const tbody = document.getElementById('inventory-body');
    if (!tbody) return;

    // Sort by score for Top 5
    const sorted = [...labData.inventory].sort((a, b) => b.score - a.score);
    labData.top5 = sorted.slice(0, 5);

    tbody.innerHTML = labData.inventory.map(p => `
        <tr>
            <td>${p.name}</td>
            <td><input type="number" min="1" max="5" value="${p.impact}" onchange="updateScore(${p.id}, 'impact', this.value)"></td>
            <td><input type="number" min="1" max="5" value="${p.effort}" onchange="updateScore(${p.id}, 'effort', this.value)"></td>
            <td><input type="number" min="1" max="5" value="${p.risk}" onchange="updateScore(${p.id}, 'risk', this.value)"></td>
            <td><span class="score-badge ${p.score > 10 ? 'score-high' : 'score-low'}">${p.score}</span></td>
            <td><button class="btn btn-outline" style="padding: 0.2rem 0.5rem; color: var(--danger)" onclick="removeProcess(${p.id})">×</button></td>
        </tr>
    `).join('');

    renderTop5();
}

function removeProcess(id) {
    labData.inventory = labData.inventory.filter(p => p.id !== id);
    renderInventory();
    saveLab();
}

function renderTop5() {
    const container = document.getElementById('top5-list');
    if (!container) return;
    
    container.innerHTML = labData.top5.map((p, i) => `
        <div style="background: var(--primary); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 0.5rem; border: 1px solid var(--border)">
            <strong>${i+1}. ${p.name}</strong> (Puntaje: ${p.score})
        </div>
    `).join('');
}

// --- EXPORT LOGIC ---

function exportMarkdown() {
    saveLab(); // Final save
    
    const content = `
# Entregable Final MicroDSI (M2-S10)
**Track Seleccionado:** ${TRACKS[currentTrack].name}
**Fecha:** ${new Date().toLocaleDateString()}

---

## 1. Inventario de Procesos (Nivel 1)
| Proceso | Impacto | Esfuerzo | Riesgo | Total |
|---------|---------|----------|--------|-------|
${labData.inventory.map(p => `| ${p.name} | ${p.impact} | ${p.effort} | ${p.risk} | ${p.score} |`).join('\n')}

## 2. Top 5 Procesos Priorizados
${labData.top5.map((p, i) => `${i+1}. ${p.name} - Score: ${p.score}`).join('\n')}

---

## 3. Modelo SIPOC (Seleccionado: ${labData.top5[0] ? labData.top5[0].name : 'Pendiente'})
- **Suppliers:** ${labData.sipoc.suppliers}
- **Inputs:** ${labData.sipoc.inputs}
- **Process (Pasos):** ${labData.sipoc.process}
- **Outputs:** ${labData.sipoc.outputs}
- **Customers:** ${labData.sipoc.customers}

---

## 4. Análisis de "No-Alcance" (MVP Trade-offs)
${labData.noScope || 'No definido.'}

---
*Generado por MicroDSI Tool - Diseño Premium*
    `;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MicroDSI_Entregable_${currentTrack}.md`;
    a.click();
}

// --- INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    // Background Init
    renderAll();
    
    // Page specific initializers
    if (document.getElementById('inventory-body')) {
        renderInventory();
        // Load SIPOC values
        document.getElementById('sipoc-suppliers').value = labData.sipoc.suppliers;
        document.getElementById('sipoc-inputs').value = labData.sipoc.inputs;
        document.getElementById('sipoc-process').value = labData.sipoc.process;
        document.getElementById('sipoc-outputs').value = labData.sipoc.outputs;
        document.getElementById('sipoc-customers').value = labData.sipoc.customers;
        document.getElementById('no-scope-text').value = labData.noScope;
    }
});
