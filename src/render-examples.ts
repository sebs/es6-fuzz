#!/usr/bin/env node
'use strict';
import { Logic } from './logic';
import { SVGRenderer } from './svg-renderer';
import * as fs from 'fs';
import * as path from 'path';

// Ensure output directory exists
const outDir = './examples';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Rendering fuzzy logic curve examples to ./examples directory...\n');

// Initialize logic system
const logic = new Logic();

// Define example curves with descriptive names
const examples = [
  {
    name: 'grade-cold',
    shape: new logic.c.Grade(10, 25, 25, 25),
    description: 'Grade: Cold temperature (increases from 10°C to 25°C)',
  },
  {
    name: 'reverse-grade-hot',
    shape: new logic.c.ReverseGrade(25, 40, 40, 40),
    description: 'ReverseGrade: Hot temperature (decreases from 25°C to 40°C)',
  },
  {
    name: 'triangle-comfortable',
    shape: new logic.c.Triangle(18, 23, 23, 28),
    description: 'Triangle: Comfortable temperature (peak at 23°C)',
  },
  {
    name: 'trapezoid-optimal',
    shape: new logic.c.Trapezoid(20, 22, 26, 28),
    description: 'Trapezoid: Optimal temperature range (22°C to 26°C)',
  },
  {
    name: 'sigmoid-transition',
    shape: new logic.c.Sigmoid(25, 2),
    description: 'Sigmoid: Smooth transition (centered at 25, slope 2)',
  },
  {
    name: 'sigmoid-steep',
    shape: new logic.c.Sigmoid(30, 0.5),
    description: 'Sigmoid: Steep transition (centered at 30, slope 0.5)',
  },
  {
    name: 'constant-medium',
    shape: new logic.c.Constant(0.5),
    description: 'Constant: Fixed membership value (0.5)',
  },
  {
    name: 'function-sine-wave',
    shape: new logic.c.FuzzyFunction((x: number) => {
      return Math.sin((x * Math.PI) / 25) * 0.4 + 0.5;
    }),
    description: 'FuzzyFunction: Sine wave pattern',
  },
  {
    name: 'function-gaussian',
    shape: new logic.c.FuzzyFunction((x: number) => {
      const mean = 25;
      const stdDev = 5;
      return Math.exp(-Math.pow(x - mean, 2) / (2 * stdDev * stdDev));
    }),
    description: 'FuzzyFunction: Gaussian distribution (mean=25, σ=5)',
  },
];

// Create renderer with nice defaults
const renderer = new SVGRenderer({
  width: 600,
  height: 400,
  xMin: 0,
  xMax: 50,
  yMin: 0,
  yMax: 1,
  padding: 50,
  gridLines: true,
  showLabels: true,
  backgroundColor: '#ffffff',
  gridColor: '#e5e7eb',
  axisColor: '#374151',
  labelColor: '#374151',
  strokeWidth: 3,
  strokeColor: '#2563eb',
  fillOpacity: 0.15,
});

// Render individual examples
examples.forEach(({ name, shape, description }) => {
  const svg = renderer.render(shape);
  const filePath = path.join(outDir, `${name}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`✓ ${description}`);
  console.log(`  → ${filePath}`);
});

// Create composite examples
console.log('\nCreating composite visualizations...');

// Temperature controller system
const tempSystem = renderer.renderMultiple([
  {
    shape: new logic.c.ReverseGrade(0, 15, 15, 15),
    options: { strokeColor: '#1e40af', fillOpacity: 0.15 },
  },
  {
    shape: new logic.c.Trapezoid(10, 15, 20, 25),
    options: { strokeColor: '#3b82f6', fillOpacity: 0.15 },
  },
  {
    shape: new logic.c.Triangle(20, 25, 25, 30),
    options: { strokeColor: '#06b6d4', fillOpacity: 0.15 },
  },
  {
    shape: new logic.c.Triangle(25, 30, 30, 35),
    options: { strokeColor: '#f59e0b', fillOpacity: 0.15 },
  },
  {
    shape: new logic.c.Trapezoid(30, 35, 40, 45),
    options: { strokeColor: '#f97316', fillOpacity: 0.15 },
  },
  {
    shape: new logic.c.Grade(40, 50, 50, 50),
    options: { strokeColor: '#dc2626', fillOpacity: 0.15 },
  },
]);
fs.writeFileSync(path.join(outDir, 'temperature-system.svg'), tempSystem);
console.log('✓ Temperature control system (6 membership functions)');
console.log(`  → ${path.join(outDir, 'temperature-system.svg')}`);

// Temperature controller system with legend
const tempRendererWithLegend = new SVGRenderer({
  ...renderer['options'],
  showLegend: true,
  legendPosition: 'top-right',
});

const tempSystemWithLegend = tempRendererWithLegend.renderMultiple([
  {
    shape: new logic.c.ReverseGrade(0, 15, 15, 15),
    options: { strokeColor: '#1e40af', fillOpacity: 0.15 },
    label: 'Freezing',
  },
  {
    shape: new logic.c.Trapezoid(10, 15, 20, 25),
    options: { strokeColor: '#3b82f6', fillOpacity: 0.15 },
    label: 'Cold',
  },
  {
    shape: new logic.c.Triangle(20, 25, 25, 30),
    options: { strokeColor: '#06b6d4', fillOpacity: 0.15 },
    label: 'Cool',
  },
  {
    shape: new logic.c.Triangle(25, 30, 30, 35),
    options: { strokeColor: '#f59e0b', fillOpacity: 0.15 },
    label: 'Warm',
  },
  {
    shape: new logic.c.Trapezoid(30, 35, 40, 45),
    options: { strokeColor: '#f97316', fillOpacity: 0.15 },
    label: 'Hot',
  },
  {
    shape: new logic.c.Grade(40, 50, 50, 50),
    options: { strokeColor: '#dc2626', fillOpacity: 0.15 },
    label: 'Scorching',
  },
]);
fs.writeFileSync(path.join(outDir, 'temperature-system-with-legend.svg'), tempSystemWithLegend);
console.log('✓ Temperature control system with legend');
console.log(`  → ${path.join(outDir, 'temperature-system-with-legend.svg')}`);

// Speed controller system
const speedRenderer = new SVGRenderer({
  ...renderer['options'],
  xMin: 0,
  xMax: 120,
  showLabels: true,
});

const speedSystem = speedRenderer.renderMultiple([
  {
    shape: new logic.c.ReverseGrade(0, 30, 30, 30),
    options: { strokeColor: '#10b981', fillOpacity: 0.15 },
  },
  {
    shape: new logic.c.Triangle(20, 40, 40, 60),
    options: { strokeColor: '#3b82f6', fillOpacity: 0.15 },
  },
  {
    shape: new logic.c.Triangle(50, 70, 70, 90),
    options: { strokeColor: '#f59e0b', fillOpacity: 0.15 },
  },
  {
    shape: new logic.c.Grade(80, 110, 110, 110),
    options: { strokeColor: '#ef4444', fillOpacity: 0.15 },
  },
]);
fs.writeFileSync(path.join(outDir, 'speed-controller.svg'), speedSystem);
console.log('✓ Speed controller (slow, medium, fast, very-fast)');
console.log(`  → ${path.join(outDir, 'speed-controller.svg')}`);

// Comparison of different sigmoid slopes
const sigmoidComparison = renderer.renderMultiple([
  { shape: new logic.c.Sigmoid(25, 0.5), options: { strokeColor: '#dc2626', strokeWidth: 2 } },
  { shape: new logic.c.Sigmoid(25, 1), options: { strokeColor: '#f97316', strokeWidth: 2 } },
  { shape: new logic.c.Sigmoid(25, 2), options: { strokeColor: '#f59e0b', strokeWidth: 2 } },
  { shape: new logic.c.Sigmoid(25, 4), options: { strokeColor: '#10b981', strokeWidth: 2 } },
  { shape: new logic.c.Sigmoid(25, 8), options: { strokeColor: '#3b82f6', strokeWidth: 2 } },
]);
fs.writeFileSync(path.join(outDir, 'sigmoid-slopes.svg'), sigmoidComparison);
console.log('✓ Sigmoid slope comparison (slopes: 0.5, 1, 2, 4, 8)');
console.log(`  → ${path.join(outDir, 'sigmoid-slopes.svg')}`);

// Create an index HTML file
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ES6-Fuzz Curve Examples</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
            line-height: 1.6;
        }
        h1 { color: #111827; margin-bottom: 30px; }
        h2 { color: #374151; margin-top: 40px; }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .card h3 {
            margin: 0 0 10px 0;
            color: #1f2937;
            font-size: 18px;
        }
        .card p {
            margin: 0 0 15px 0;
            color: #6b7280;
            font-size: 14px;
        }
        .card img {
            width: 100%;
            height: auto;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
        }
        .full-width {
            grid-column: 1 / -1;
        }
    </style>
</head>
<body>
    <h1>ES6-Fuzz SVG Curve Rendering Examples</h1>
    
    <h2>Individual Curve Types</h2>
    <div class="grid">
        ${examples
          .map(
            ({ name, description }) => `
        <div class="card">
            <h3>${description.split(':')[0]}</h3>
            <p>${description.split(':')[1]}</p>
            <img src="${name}.svg" alt="${description}">
        </div>`
          )
          .join('')}
    </div>
    
    <h2>Composite Systems</h2>
    <div class="grid">
        <div class="card full-width">
            <h3>Temperature Control System</h3>
            <p>Complete temperature classification with six overlapping membership functions: freezing, cold, cool, warm, hot, and scorching.</p>
            <img src="temperature-system.svg" alt="Temperature control system">
        </div>
        
        <div class="card full-width">
            <h3>Temperature Control System with Legend</h3>
            <p>Same temperature classification system with an integrated legend showing all membership function labels.</p>
            <img src="temperature-system-with-legend.svg" alt="Temperature control system with legend">
        </div>
        
        <div class="card full-width">
            <h3>Speed Controller</h3>
            <p>Vehicle speed classification with four membership functions: slow, medium, fast, and very fast (0-120 km/h range).</p>
            <img src="speed-controller.svg" alt="Speed controller">
        </div>
        
        <div class="card full-width">
            <h3>Sigmoid Slope Comparison</h3>
            <p>Comparison of sigmoid curves with different slope parameters (0.5, 1, 2, 4, 8), all centered at x=25. Steeper slopes create sharper transitions.</p>
            <img src="sigmoid-slopes.svg" alt="Sigmoid slope comparison">
        </div>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);
console.log('\n✓ Created index.html viewer');
console.log(`  → ${path.join(outDir, 'index.html')}`);

console.log(`\n✅ All examples rendered successfully to ${outDir}/`);
console.log('   Open examples/index.html in a browser to view all examples.');
