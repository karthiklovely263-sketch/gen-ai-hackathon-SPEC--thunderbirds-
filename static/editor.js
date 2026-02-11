/**
 * Professional Sign Board Designer - Canvas-Based Editor
 * Renders production-ready commercial signboard designs
 */

// ============================================
// Global State
// ============================================

let currentDesign = null;
let canvas = null;
let ctx = null;
let selectedTemplate = 'bold_street';

// ============================================
// DOM Elements
// ============================================

const shopNameInput = document.getElementById('shopName');
const businessTypeSelect = document.getElementById('businessType');
const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');
const downloadBtn = document.getElementById('downloadBtn');
const templatesList = document.getElementById('templatesList');
const toastNotification = document.getElementById('toastNotification');
const saveDesignBtn = document.getElementById('saveDesignBtn');

// Color controls
const mainTextColorInput = document.getElementById('mainTextColor');
const mainTextColorValue = document.getElementById('mainTextColorValue');
const taglineColorInput = document.getElementById('taglineColor');
const taglineColorValue = document.getElementById('taglineColorValue');
const accentColorInput = document.getElementById('accentColor');
const accentColorValue = document.getElementById('accentColorValue');
const bgColor1Input = document.getElementById('bgColor1');
const bgColor1Value = document.getElementById('bgColor1Value');
const bgColor2Input = document.getElementById('bgColor2');
const bgColor2Value = document.getElementById('bgColor2Value');
const mainFontSizeInput = document.getElementById('mainFontSize');
const mainFontSizeValue = document.getElementById('mainFontSizeValue');

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize Canvas
        canvas = document.getElementById('signboardCanvas');
        ctx = canvas.getContext('2d');

        // Load data
        await loadTemplates();
        await loadBusinessTypes();
        setupEventListeners();

        showToast('✓ Welcome to SignBoard Pro - Create Professional Designs', 'success');
    } catch (error) {
        console.error('Initialization error:', error);
        showToast('Error initializing application', 'error');
    }
});

// ============================================
// API Calls
// ============================================

async function loadTemplates() {
    try {
        const response = await fetch('/api/templates');
        const data = await response.json();

        if (data.status === 'success') {
            renderTemplates(data.templates);
        }
    } catch (error) {
        console.error('Error loading templates:', error);
    }
}

async function loadBusinessTypes() {
    try {
        const response = await fetch('/api/business-types');
        const data = await response.json();

        if (data.status === 'success') {
            populateBusinessTypes(data.types);
        }
    } catch (error) {
        console.error('Error loading business types:', error);
    }
}

async function generateDesign(shopName, businessType, templateId) {
    try {
        const response = await fetch('/api/generate-design', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                shop_name: shopName,
                business_type: businessType,
                template_id: templateId
            })
        });

        const data = await response.json();

        if (data.status === 'success') {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error generating design:', error);
        throw error;
    }
}

// ============================================
// Render Functions
// ============================================

function renderTemplates(templates) {
    templatesList.innerHTML = '';

    Object.entries(templates).forEach(([key, template]) => {
        const templateCard = document.createElement('div');
        templateCard.className = 'template-card';
        if (key === 'bold_street') templateCard.classList.add('active');
        templateCard.dataset.templateId = key;

        const emoji = key === 'bold_street' ? '🔥' : key === 'premium_glow' ? '✨' : '📐';

        templateCard.innerHTML = `
            <div class="template-preview">${emoji}</div>
            <div class="template-label">${template.name}</div>
        `;

        templateCard.addEventListener('click', () => {
            document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
            templateCard.classList.add('active');
            selectedTemplate = key;
        });

        templatesList.appendChild(templateCard);
    });
}

function populateBusinessTypes(types) {
    businessTypeSelect.innerHTML = '<option value="">Select business type</option>';

    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        businessTypeSelect.appendChild(option);
    });
}

function drawSignboard(design) {
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const elements = design.elements;

    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    // Draw background
    if (elements.background) {
        drawBackground(elements.background);
    }

    // Draw border
    if (elements.border && elements.border.enabled) {
        drawBorder(elements.border);
    }

    // Draw decorative lines
    if (elements.decorLine1) {
        drawLine(elements.decorLine1);
    }
    if (elements.decorLine2) {
        drawLine(elements.decorLine2);
    }

    // Draw icon
    if (elements.icon) {
        drawIcon(elements.icon);
    }

    // Draw main title
    if (elements.shopName) {
        drawText(elements.shopName);
    }

    // Draw tagline
    if (elements.tagline) {
        drawText(elements.tagline);
    }

    // Draw business type
    if (elements.businessType) {
        drawText(elements.businessType);
    }
}

function drawBackground(bgConfig) {
    const width = canvas.width;
    const height = canvas.height;

    const gradient = ctx.createLinearGradient(0, 0, width * Math.cos(bgConfig.angle * Math.PI / 180), height * Math.sin(bgConfig.angle * Math.PI / 180));
    gradient.addColorStop(0, bgConfig.color1);
    gradient.addColorStop(1, bgConfig.color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add subtle pattern if needed
    if (bgConfig.pattern === 'diagonal_stripes') {
        addDiagonalPattern();
    }
}

function addDiagonalPattern() {
    const width = canvas.width;
    const height = canvas.height;
    const spacing = 20;

    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;

    for (let i = -height; i < width; i += spacing) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + height, height);
        ctx.stroke();
    }
}

function drawBorder(borderConfig) {
    const width = canvas.width;
    const height = canvas.height;
    const margin = borderConfig.width;

    ctx.strokeStyle = borderConfig.color;
    ctx.lineWidth = borderConfig.width;

    ctx.strokeRect(margin / 2, margin / 2, width - margin, height - margin);
}

function drawLine(lineConfig) {
    ctx.strokeStyle = lineConfig.color;
    ctx.lineWidth = lineConfig.width;
    ctx.beginPath();
    ctx.moveTo(lineConfig.x1, lineConfig.y1);
    ctx.lineTo(lineConfig.x2, lineConfig.y2);
    ctx.stroke();
}

function drawIcon(iconConfig) {
    ctx.font = `${iconConfig.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = iconConfig.color;
    ctx.fillText(iconConfig.text, iconConfig.x, iconConfig.y);
}

function drawText(textConfig) {
    const maxWidth = textConfig.maxWidth;
    let fontSize = textConfig.fontSize;

    // Set font
    ctx.font = `${textConfig.fontWeight || '700'} ${fontSize}px ${textConfig.fontFamily}`;
    ctx.textAlign = textConfig.align;
    ctx.textBaseline = 'middle';

    // Apply text shadow if enabled
    if (textConfig.textShadow) {
        ctx.shadowColor = textConfig.shadowColor;
        ctx.shadowBlur = textConfig.shadowBlur;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    ctx.fillStyle = textConfig.color;

    // Split text into multiple lines if needed
    const words = textConfig.text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
        const testLine = currentLine ? currentLine + ' ' + word : word;
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    });

    if (currentLine) {
        lines.push(currentLine);
    }

    // Draw lines with adjusted spacing
    const lineHeight = fontSize * 1.2;
    const totalHeight = (lines.length - 1) * lineHeight;
    const startY = textConfig.y - (totalHeight / 2);

    lines.forEach((line, index) => {
        ctx.fillText(line, textConfig.x, startY + (index * lineHeight));
    });

    // Clear shadow
    ctx.shadowColor = 'transparent';
}

// ============================================
// Event Handlers
// ============================================

function setupEventListeners() {
    // Generate Design
    generateBtn.addEventListener('click', async () => {
        const shopName = shopNameInput.value.trim();
        const businessType = businessTypeSelect.value;

        if (!shopName) {
            showToast('❌ Please enter a shop name', 'error');
            shopNameInput.focus();
            return;
        }

        if (!businessType) {
            showToast('❌ Please select a business type', 'error');
            businessTypeSelect.focus();
            return;
        }

        generateBtn.disabled = true;
        generateBtn.textContent = '⏳ Generating...';

        try {
            const design = await generateDesign(shopName, businessType, selectedTemplate);
            currentDesign = design;

            // Update color controls with design colors
            mainTextColorInput.value = rgbToHex(design.colors.text);
            mainTextColorValue.textContent = design.colors.text;
            taglineColorInput.value = rgbToHex(design.colors.secondary);
            taglineColorValue.textContent = design.colors.secondary;
            accentColorInput.value = rgbToHex(design.colors.accent);
            accentColorValue.textContent = design.colors.accent;
            bgColor1Input.value = rgbToHex(design.colors.primary);
            bgColor1Value.textContent = design.colors.primary;
            bgColor2Input.value = rgbToHex(design.colors.dark);
            bgColor2Value.textContent = design.colors.dark;
            mainFontSizeInput.value = design.elements.shopName.fontSize;
            mainFontSizeValue.textContent = design.elements.shopName.fontSize;

            // Enable controls
            enableControls();

            // Draw the design
            drawSignboard(design);

            showToast('✓ Professional design generated!', 'success');
        } catch (error) {
            showToast('❌ Failed to generate design', 'error');
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = '🚀 Generate Design';
        }
    });

    // Reset Design
    resetBtn.addEventListener('click', () => {
        if (confirm('Reset the design? This cannot be undone.')) {
            currentDesign = null;
            shopNameInput.value = '';
            businessTypeSelect.value = '';
            clearCanvas();
            disableControls();
            showToast('Design reset', 'success');
        }
    });

    // Download Design
    downloadBtn.addEventListener('click', downloadDesign);
    saveDesignBtn.addEventListener('click', saveDesign);

    // Color controls
    mainTextColorInput.addEventListener('input', (e) => {
        mainTextColorValue.textContent = e.target.value;
        if (currentDesign) {
            currentDesign.colors.text = e.target.value;
            currentDesign.elements.shopName.color = e.target.value;
            drawSignboard(currentDesign);
        }
    });

    taglineColorInput.addEventListener('input', (e) => {
        taglineColorValue.textContent = e.target.value;
        if (currentDesign) {
            currentDesign.colors.secondary = e.target.value;
            currentDesign.elements.tagline.color = e.target.value;
            drawSignboard(currentDesign);
        }
    });

    accentColorInput.addEventListener('input', (e) => {
        accentColorValue.textContent = e.target.value;
        if (currentDesign) {
            currentDesign.colors.accent = e.target.value;
            currentDesign.elements.icon.color = e.target.value;
            currentDesign.elements.businessType.color = e.target.value;
            currentDesign.elements.decorLine1.color = e.target.value;
            drawSignboard(currentDesign);
        }
    });

    bgColor1Input.addEventListener('input', (e) => {
        bgColor1Value.textContent = e.target.value;
        if (currentDesign) {
            currentDesign.colors.primary = e.target.value;
            currentDesign.elements.background.color1 = e.target.value;
            drawSignboard(currentDesign);
        }
    });

    bgColor2Input.addEventListener('input', (e) => {
        bgColor2Value.textContent = e.target.value;
        if (currentDesign) {
            currentDesign.colors.dark = e.target.value;
            currentDesign.elements.background.color2 = e.target.value;
            drawSignboard(currentDesign);
        }
    });

    mainFontSizeInput.addEventListener('input', (e) => {
        const size = parseInt(e.target.value);
        mainFontSizeValue.textContent = size;
        if (currentDesign) {
            currentDesign.elements.shopName.fontSize = size;
            drawSignboard(currentDesign);
        }
    });
}

// ============================================
// Export & Download
// ============================================

async function downloadDesign() {
    if (!currentDesign) {
        showToast('❌ Please generate a design first', 'error');
        return;
    }

    downloadBtn.disabled = true;
    downloadBtn.textContent = '⏳ Exporting...';

    try {
        // Create a temporary canvas with 2x scale for better quality
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = canvas.width * 2;
        exportCanvas.height = canvas.height * 2;
        const exportCtx = exportCanvas.getContext('2d');

        // Scale up
        exportCtx.scale(2, 2);

        // Temporarily swap context
        const tempCtx = ctx;
        ctx = exportCtx;

        // Draw on export canvas
        drawSignboard(currentDesign);

        // Restore original context
        ctx = tempCtx;

        // Download
        exportCanvas.toBlob((blob) => {
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = `${currentDesign.shop_name.replace(/\s+/g, '_')}_signboard_${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            showToast('✓ Design exported as PNG!', 'success');
        }, 'image/png');

    } catch (error) {
        console.error('Error exporting design:', error);
        showToast('❌ Error exporting design', 'error');
    } finally {
        downloadBtn.disabled = false;
        downloadBtn.textContent = '⬇ Export PNG';
    }
}

async function saveDesign() {
    if (!currentDesign) {
        showToast('❌ Please generate a design first', 'error');
        return;
    }

    try {
        const response = await fetch('/api/save-design', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ design: currentDesign })
        });

        const data = await response.json();

        if (data.status === 'success') {
            showToast('✓ Design saved successfully!', 'success');
        }
    } catch (error) {
        console.error('Error saving design:', error);
        showToast('❌ Error saving design', 'error');
    }
}

// ============================================
// Control State Management
// ============================================

function enableControls() {
    mainTextColorInput.disabled = false;
    taglineColorInput.disabled = false;
    accentColorInput.disabled = false;
    bgColor1Input.disabled = false;
    bgColor2Input.disabled = false;
    mainFontSizeInput.disabled = false;
}

function disableControls() {
    mainTextColorInput.disabled = true;
    taglineColorInput.disabled = true;
    accentColorInput.disabled = true;
    bgColor1Input.disabled = true;
    bgColor2Input.disabled = true;
    mainFontSizeInput.disabled = true;
}

function clearCanvas() {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#CCCCCC';
    ctx.textAlign = 'center';
    ctx.font = '24px Poppins';
    ctx.fillText('Canvas Ready - Generate a Design', canvas.width / 2, canvas.height / 2);
}

// ============================================
// Utilities
// ============================================

function rgbToHex(color) {
    if (!color) return '#000000';
    if (color.startsWith('#')) return color;

    const result = color.match(/\d+/g);
    if (!result || result.length < 3) return '#000000';

    const r = parseInt(result[0]);
    const g = parseInt(result[1]);
    const b = parseInt(result[2]);

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function showToast(message, type = 'info') {
    toastNotification.textContent = message;
    toastNotification.className = `toast-notification ${type} show`;

    setTimeout(() => {
        toastNotification.classList.remove('show');
    }, 3500);
}

console.log('✓ SignBoard Pro - Canvas-Based Editor Loaded');


// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadTemplates();
        await loadBusinessTypes();
        setupEventListeners();
        showToast('Welcome to SignBoard Studio! Create your design.', 'success');
    } catch (error) {
        console.error('Initialization error:', error);
        showToast('Error initializing application', 'error');
    }
});


// ============================================
// API Calls
// ============================================

async function loadTemplates() {
    try {
        const response = await fetch('/api/templates');
        const data = await response.json();

        if (data.status === 'success') {
            renderTemplates(data.templates);
        }
    } catch (error) {
        console.error('Error loading templates:', error);
        showToast('Error loading templates', 'error');
    }
}

async function loadBusinessTypes() {
    try {
        const response = await fetch('/api/business-types');
        const data = await response.json();

        if (data.status === 'success') {
            populateBusinessTypes(data.types);
        }
    } catch (error) {
        console.error('Error loading business types:', error);
        showToast('Error loading business types', 'error');
    }
}

async function generateDesign(shopName, businessType, templateId) {
    try {
        const response = await fetch('/api/generate-design', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                shop_name: shopName,
                business_type: businessType,
                template_id: templateId
            })
        });

        const data = await response.json();

        if (data.status === 'success') {
            return data.design;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error generating design:', error);
        showToast('Error generating design', 'error');
        throw error;
    }
}

async function saveDesign(design) {
    try {
        const response = await fetch('/api/save-design', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ design })
        });

        const data = await response.json();

        if (data.status === 'success') {
            console.log('Design saved:', data);
            return data;
        }
    } catch (error) {
        console.error('Error saving design:', error);
    }
}


// ============================================
// Render Functions
// ============================================

function renderTemplates(templates) {
    templatesList.innerHTML = '';

    Object.entries(templates).forEach(([key, template]) => {
        const templateCard = document.createElement('div');
        templateCard.className = 'template-card';
        if (key === 'modern') templateCard.classList.add('active');
        templateCard.dataset.templateId = key;

        templateCard.innerHTML = `
            <div class="template-preview">
                ${key === 'modern' ? '✨' : key === 'elegant' ? '👑' : '🔥'}
            </div>
            <div class="template-label">${template.name}</div>
        `;

        templateCard.addEventListener('click', () => selectTemplate(key));
        templatesList.appendChild(templateCard);
    });
}

function populateBusinessTypes(types) {
    businessTypeSelect.innerHTML = '<option value="">Select a business type</option>';

    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        businessTypeSelect.appendChild(option);
    });
}

function renderDesign(design) {
    currentDesign = design;

    // Clear canvas
    designCanvas.innerHTML = '';
    designCanvas.style.backgroundColor = design.background_color;
    designCanvas.dataset.background = design.background_color;

    // Update color inputs
    updateColorInputs(design);

    // Render elements
    if (design.elements && Array.isArray(design.elements)) {
        design.elements.forEach(element => {
            if (element.type === 'text') {
                createCanvasTextElement(element);
            }
        });
    }

    // Enable editing controls
    enableEditingControls();
}

function createCanvasTextElement(elementData) {
    const element = document.createElement('div');
    element.className = 'canvas-element';
    element.dataset.elementId = elementData.id;
    element.style.left = elementData.x + '%';
    element.style.top = elementData.y + '%';
    element.style.width = elementData.width + 'px';
    element.style.height = elementData.height + 'px';

    const textElement = document.createElement('div');
    textElement.className = 'canvas-text';
    textElement.contentEditable = elementData.draggable;
    textElement.textContent = elementData.content;
    textElement.style.fontSize = elementData.font_size + 'px';
    textElement.style.fontFamily = elementData.font_family + ', sans-serif';
    textElement.style.color = elementData.color;
    textElement.style.textAlign = elementData.text_align;
    textElement.style.fontWeight = '600';

    element.appendChild(textElement);

    // Add drag and edit functionality
    if (elementData.draggable) {
        element.addEventListener('mousedown', startDragging);
    }

    element.addEventListener('click', (e) => {
        e.stopPropagation();
        selectElement(element, elementData);
    });

    textElement.addEventListener('input', (e) => {
        if (selectedElement) {
            const index = currentDesign.elements.findIndex(el => el.id === selectedElement.dataset.elementId);
            if (index !== -1) {
                currentDesign.elements[index].content = e.target.textContent;
            }
        }
    });

    textElement.addEventListener('blur', (e) => {
        e.target.contentEditable = 'false';
        element.style.border = 'none';
        setTimeout(() => {
            e.target.contentEditable = 'true';
        }, 100);
    });

    designCanvas.appendChild(element);
}

function updateColorInputs(design) {
    backgroundColorInput.value = rgbToHex(design.background_color);
    backgroundColorValue.textContent = design.background_color;

    accentColorInput.value = rgbToHex(design.text_color === '#ffffff' ? design.accent_color : design.text_color);
    accentColorValue.textContent = design.accent_color;

    textColorInput.value = rgbToHex(design.text_color);
    textColorValue.textContent = design.text_color;

    fontFamilySelect.value = design.font_family;
    fontSizeInput.value = design.font_size;
    fontSizeValue.textContent = design.font_size;
}


// ============================================
// Event Handlers
// ============================================

function setupEventListeners() {
    // Template selection
    document.addEventListener('click', (e) => {
        if (e.target.closest('.template-card')) {
            const templateId = e.target.closest('.template-card').dataset.templateId;
            selectTemplate(templateId);
        }
    });

    // Generate design
    generateBtn.addEventListener('click', async () => {
        const shopName = shopNameInput.value.trim();
        const businessType = businessTypeSelect.value;

        if (!shopName) {
            showToast('Please enter a shop name', 'error');
            shopNameInput.focus();
            return;
        }

        if (!businessType) {
            showToast('Please select a business type', 'error');
            businessTypeSelect.focus();
            return;
        }

        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';

        try {
            const selectedTemplate = document.querySelector('.template-card.active').dataset.templateId;
            const design = await generateDesign(shopName, businessType, selectedTemplate);
            renderDesign(design);
            showToast('Design generated successfully!', 'success');
        } catch (error) {
            showToast('Failed to generate design', 'error');
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate Design';
        }
    });

    // Reset design
    resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset the design?')) {
            designCanvas.innerHTML = '<div class="canvas-placeholder"><p class="placeholder-text">👈 Fill in your shop details on the left and click "Generate Design"</p></div>';
            currentDesign = null;
            selectedElement = null;
            disableEditingControls();
            showToast('Design reset', 'success');
        }
    });

    // Download design
    downloadBtn.addEventListener('click', downloadDesign);

    // Color pickers
    backgroundColorInput.addEventListener('change', (e) => {
        const color = e.target.value;
        backgroundColorValue.textContent = color;
        designCanvas.style.backgroundColor = color;
        if (currentDesign) {
            currentDesign.background_color = color;
        }
    });

    accentColorInput.addEventListener('change', (e) => {
        const color = e.target.value;
        accentColorValue.textContent = color;
        if (currentDesign && selectedElement) {
            const textElement = selectedElement.querySelector('.canvas-text');
            if (textElement) {
                textElement.style.color = color;
                const index = currentDesign.elements.findIndex(el => el.id === selectedElement.dataset.elementId);
                if (index !== -1) {
                    currentDesign.elements[index].color = color;
                }
            }
        }
    });

    textColorInput.addEventListener('change', (e) => {
        const color = e.target.value;
        textColorValue.textContent = color;
        if (currentDesign && selectedElement) {
            const textElement = selectedElement.querySelector('.canvas-text');
            if (textElement) {
                textElement.style.color = color;
                const index = currentDesign.elements.findIndex(el => el.id === selectedElement.dataset.elementId);
                if (index !== -1) {
                    currentDesign.elements[index].color = color;
                }
            }
        }
    });

    // Font family
    fontFamilySelect.addEventListener('change', (e) => {
        if (currentDesign && selectedElement) {
            const textElement = selectedElement.querySelector('.canvas-text');
            if (textElement) {
                textElement.style.fontFamily = e.target.value + ', sans-serif';
                const index = currentDesign.elements.findIndex(el => el.id === selectedElement.dataset.elementId);
                if (index !== -1) {
                    currentDesign.elements[index].font_family = e.target.value;
                }
            }
        }
    });

    // Font size
    fontSizeInput.addEventListener('input', (e) => {
        const size = parseInt(e.target.value);
        fontSizeValue.textContent = size;

        if (currentDesign && selectedElement) {
            const textElement = selectedElement.querySelector('.canvas-text');
            if (textElement) {
                textElement.style.fontSize = size + 'px';
                const index = currentDesign.elements.findIndex(el => el.id === selectedElement.dataset.elementId);
                if (index !== -1) {
                    currentDesign.elements[index].font_size = size;
                }
            }
        }
    });

    // Canvas click to deselect
    designCanvas.addEventListener('click', (e) => {
        if (e.target === designCanvas) {
            deselectElement();
        }
    });
}

function selectTemplate(templateId) {
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-template-id="${templateId}"]`).classList.add('active');
}

function selectElement(element, elementData) {
    deselectElement();
    selectedElement = element;
    element.classList.add('editable');
    element.style.border = '2px solid #00d4ff';

    // Update controls
    const textElement = element.querySelector('.canvas-text');
    if (textElement) {
        fontFamilySelect.value = elementData.font_family;
        fontSizeInput.value = elementData.font_size;
        fontSizeValue.textContent = elementData.font_size;
        textColorInput.value = rgbToHex(elementData.color);
        textColorValue.textContent = elementData.color;
    }

    textElement.contentEditable = 'true';
    textElement.focus();
}

function deselectElement() {
    if (selectedElement) {
        selectedElement.classList.remove('editable');
        selectedElement.style.border = 'none';
        const textElement = selectedElement.querySelector('.canvas-text');
        if (textElement) {
            textElement.contentEditable = 'false';
        }
    }
    selectedElement = null;
}

function startDragging(e) {
    if (designCanvas.classList.contains('placeholder')) {
        return;
    }

    const element = e.currentTarget;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    elementStartX = parseFloat(element.style.left);
    elementStartY = parseFloat(element.style.top);

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    selectElement(element, currentDesign.elements.find(el => el.id === element.dataset.elementId));
}

function drag(e) {
    if (!isDragging || !selectedElement) return;

    const deltaX = (e.clientX - dragStartX) / designCanvas.offsetWidth * 100;
    const deltaY = (e.clientY - dragStartY) / designCanvas.offsetHeight * 100;

    selectedElement.style.left = Math.max(0, Math.min(100 - 20, elementStartX + deltaX)) + '%';
    selectedElement.style.top = Math.max(0, Math.min(100 - 20, elementStartY + deltaY)) + '%';
}

function stopDragging() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDragging);

    // Save updated position
    if (selectedElement && currentDesign) {
        const index = currentDesign.elements.findIndex(el => el.id === selectedElement.dataset.elementId);
        if (index !== -1) {
            currentDesign.elements[index].x = parseFloat(selectedElement.style.left);
            currentDesign.elements[index].y = parseFloat(selectedElement.style.top);
        }
    }
}


// ============================================
// Export & Download
// ============================================

async function downloadDesign() {
    if (!currentDesign) {
        showToast('Please generate a design first', 'error');
        return;
    }

    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Exporting...';

    try {
        // Use html2canvas to capture the canvas
        const canvas = await html2canvas(designCanvas, {
            allowTaint: true,
            useCORS: true,
            scale: 2,
            backgroundColor: currentDesign.background_color
        });

        // Convert to image and download
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${currentDesign.shop_name.replace(/\s+/g, '_')}_signboard_${new Date().getTime()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('Design exported successfully!', 'success');

        // Save design to backend
        await saveDesign(currentDesign);

    } catch (error) {
        console.error('Error exporting design:', error);
        showToast('Error exporting design. Please try again.', 'error');
    } finally {
        downloadBtn.disabled = false;
        downloadBtn.textContent = '⬇ Download PNG';
    }
}


// ============================================
// Control State Management
// ============================================

function enableEditingControls() {
    fontFamilySelect.disabled = false;
    fontSizeInput.disabled = false;
    textColorInput.disabled = false;
    backgroundColorInput.disabled = false;
    accentColorInput.disabled = false;
}

function disableEditingControls() {
    fontFamilySelect.disabled = true;
    fontSizeInput.disabled = true;
    textColorInput.disabled = true;
    backgroundColorInput.disabled = true;
    accentColorInput.disabled = true;
}


// ============================================
// Utilities
// ============================================

function rgbToHex(color) {
    if (!color) return '#000000';

    // If already hex, return it
    if (color.startsWith('#')) {
        return color.length === 7 ? color : '#000000';
    }

    // Convert rgb to hex
    const result = color.match(/\d+/g);
    if (!result || result.length < 3) return '#000000';

    const r = parseInt(result[0]);
    const g = parseInt(result[1]);
    const b = parseInt(result[2]);

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function showToast(message, type = 'info') {
    toastNotification.textContent = message;
    toastNotification.className = `toast-notification ${type} show`;

    setTimeout(() => {
        toastNotification.classList.remove('show');
    }, 3000);
}


// ============================================
// Keyboard Shortcuts
// ============================================

document.addEventListener('keydown', (e) => {
    // Delete selected element content
    if (e.key === 'Delete' && selectedElement) {
        const textElement = selectedElement.querySelector('.canvas-text');
        if (textElement && !textElement.contentEditable) {
            textElement.textContent = '';
        }
    }

    // Escape to deselect
    if (e.key === 'Escape') {
        deselectElement();
    }

    // Ctrl+S to save (prevent default and show notification)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (currentDesign) {
            saveDesign(currentDesign);
            showToast('Design saved to server', 'success');
        }
    }
});


console.log('Sign Board Designer - Application Loaded Successfully');
