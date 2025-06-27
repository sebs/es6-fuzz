'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SVGRenderer = void 0;
const grade_1 = require("./curve/grade");
const reverse_grade_1 = require("./curve/reverse-grade");
const triangle_1 = require("./curve/triangle");
const trapezoid_1 = require("./curve/trapezoid");
const constant_1 = require("./curve/constant");
const fuzzy_function_1 = require("./curve/fuzzy-function");
const sigmoid_1 = require("./curve/sigmoid");
class SVGRenderer {
    options;
    defaultOptions = {
        width: 500,
        height: 300,
        padding: 40,
        xMin: 0,
        xMax: 100,
        yMin: 0,
        yMax: 1,
        gridLines: true,
        strokeWidth: 2,
        strokeColor: '#2563eb',
        fillOpacity: 0.1,
        backgroundColor: '#ffffff',
        gridColor: '#e5e5e5',
        axisColor: '#525252',
        labelColor: '#525252',
        fontSize: 12,
        showLabels: true,
        showLegend: false,
        legendPosition: 'top-right',
        legendPadding: 10,
        legendBackgroundColor: '#ffffff',
        legendBorderColor: '#e5e5e5',
        legendTextColor: '#525252'
    };
    constructor(options = {}) {
        this.options = options;
        this.options = { ...this.defaultOptions, ...options };
    }
    scaleX(x) {
        const { xMin, xMax, width, padding } = this.options;
        return padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    }
    scaleY(y) {
        const { yMin, yMax, height, padding } = this.options;
        return height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);
    }
    generatePath(points) {
        if (points.length === 0)
            return '';
        let path = `M ${this.scaleX(points[0][0])} ${this.scaleY(points[0][1])}`;
        for (let i = 1; i < points.length; i++) {
            path += ` L ${this.scaleX(points[i][0])} ${this.scaleY(points[i][1])}`;
        }
        return path;
    }
    renderGrid() {
        const { xMin, xMax, yMin, yMax, width, height, padding, gridColor, axisColor, labelColor, fontSize, showLabels } = this.options;
        let svg = '';
        // Grid lines
        const xStep = (xMax - xMin) / 10;
        const yStep = (yMax - yMin) / 5;
        // Vertical grid lines
        for (let x = xMin; x <= xMax; x += xStep) {
            const xPos = this.scaleX(x);
            svg += `<line x1="${xPos}" y1="${padding}" x2="${xPos}" y2="${height - padding}" stroke="${gridColor}" stroke-width="1" />`;
        }
        // Horizontal grid lines
        for (let y = yMin; y <= yMax; y += yStep) {
            const yPos = this.scaleY(y);
            svg += `<line x1="${padding}" y1="${yPos}" x2="${width - padding}" y2="${yPos}" stroke="${gridColor}" stroke-width="1" />`;
        }
        // Axes
        svg += `<line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="${axisColor}" stroke-width="2" />`;
        svg += `<line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="${axisColor}" stroke-width="2" />`;
        // Labels
        if (showLabels) {
            // X-axis labels
            for (let x = xMin; x <= xMax; x += xStep * 2) {
                const xPos = this.scaleX(x);
                svg += `<text x="${xPos}" y="${height - padding + 20}" text-anchor="middle" font-size="${fontSize}" fill="${labelColor}">${x}</text>`;
            }
            // Y-axis labels
            for (let y = yMin; y <= yMax; y += yStep) {
                const yPos = this.scaleY(y);
                svg += `<text x="${padding - 10}" y="${yPos + 4}" text-anchor="end" font-size="${fontSize}" fill="${labelColor}">${y.toFixed(1)}</text>`;
            }
        }
        return svg;
    }
    renderLegend(items) {
        const { width, height, padding, legendPosition, legendPadding, legendBackgroundColor, legendBorderColor, legendTextColor, fontSize } = this.options;
        if (items.length === 0)
            return '';
        // Calculate legend dimensions
        const lineHeight = fontSize + 6;
        const legendItemHeight = lineHeight;
        const legendHeight = legendPadding * 2 + items.length * legendItemHeight;
        const maxLabelLength = Math.max(...items.map(item => item.label.length));
        const legendWidth = legendPadding * 2 + 20 + maxLabelLength * fontSize * 0.6; // 20 for color box + gap
        // Calculate legend position
        let legendX;
        let legendY;
        switch (legendPosition) {
            case 'top-left':
                legendX = padding + 10;
                legendY = padding + 10;
                break;
            case 'top-right':
                legendX = width - padding - legendWidth - 10;
                legendY = padding + 10;
                break;
            case 'bottom-left':
                legendX = padding + 10;
                legendY = height - padding - legendHeight - 10;
                break;
            case 'bottom-right':
                legendX = width - padding - legendWidth - 10;
                legendY = height - padding - legendHeight - 10;
                break;
        }
        let svg = '';
        // Legend background
        svg += `<rect x="${legendX}" y="${legendY}" width="${legendWidth}" height="${legendHeight}" fill="${legendBackgroundColor}" stroke="${legendBorderColor}" stroke-width="1" rx="4" />`;
        // Legend items
        items.forEach((item, index) => {
            const itemY = legendY + legendPadding + index * legendItemHeight;
            // Color box
            svg += `<rect x="${legendX + legendPadding}" y="${itemY}" width="${fontSize}" height="${fontSize}" fill="${item.color}" />`;
            // Label
            svg += `<text x="${legendX + legendPadding + fontSize + 5}" y="${itemY + fontSize - 2}" font-size="${fontSize}" fill="${legendTextColor}">${item.label}</text>`;
        });
        return svg;
    }
    getShapePoints(shape) {
        const { xMin, xMax } = this.options;
        const points = [];
        if (shape instanceof grade_1.Grade || shape instanceof reverse_grade_1.ReverseGrade) {
            // For Grade and ReverseGrade, we need key points and some intermediate points
            const x0 = shape.x0;
            const x1 = shape.x1;
            points.push([Math.max(xMin, x0 - (x1 - x0) * 0.2), shape.fuzzify(Math.max(xMin, x0 - (x1 - x0) * 0.2))]);
            points.push([x0, shape.fuzzify(x0)]);
            if (x0 !== x1) {
                points.push([(x0 + x1) / 2, shape.fuzzify((x0 + x1) / 2)]);
            }
            points.push([x1, shape.fuzzify(x1)]);
            points.push([Math.min(xMax, x1 + (x1 - x0) * 0.2), shape.fuzzify(Math.min(xMax, x1 + (x1 - x0) * 0.2))]);
        }
        else if (shape instanceof triangle_1.Triangle) {
            const x0 = shape.x0;
            const x1 = shape.x1;
            const x2 = shape.x2;
            points.push([Math.max(xMin, x0 - (x2 - x0) * 0.1), 0]);
            points.push([x0, 0]);
            if (x0 !== x1) {
                points.push([(x0 + x1) / 2, shape.fuzzify((x0 + x1) / 2)]);
            }
            points.push([x1, 1]);
            if (x1 !== x2) {
                points.push([(x1 + x2) / 2, shape.fuzzify((x1 + x2) / 2)]);
            }
            points.push([x2, 0]);
            points.push([Math.min(xMax, x2 + (x2 - x0) * 0.1), 0]);
        }
        else if (shape instanceof trapezoid_1.Trapezoid) {
            const x0 = shape.x0;
            const x1 = shape.x1;
            const x2 = shape.x2;
            const x3 = shape.x3;
            points.push([Math.max(xMin, x0 - (x3 - x0) * 0.1), 0]);
            points.push([x0, 0]);
            if (x0 !== x1) {
                points.push([(x0 + x1) / 2, shape.fuzzify((x0 + x1) / 2)]);
            }
            points.push([x1, 1]);
            points.push([x2, 1]);
            if (x2 !== x3) {
                points.push([(x2 + x3) / 2, shape.fuzzify((x2 + x3) / 2)]);
            }
            points.push([x3, 0]);
            points.push([Math.min(xMax, x3 + (x3 - x0) * 0.1), 0]);
        }
        else if (shape instanceof sigmoid_1.Sigmoid) {
            // Sample sigmoid at many points for smooth curve
            const numSamples = 50;
            const step = (xMax - xMin) / numSamples;
            for (let x = xMin; x <= xMax; x += step) {
                points.push([x, shape.fuzzify(x)]);
            }
        }
        else if (shape instanceof constant_1.Constant) {
            // Constant is a horizontal line
            const y = shape.fuzzify();
            points.push([xMin, y]);
            points.push([xMax, y]);
        }
        else if (shape instanceof fuzzy_function_1.FuzzyFunction) {
            // Sample function at many points
            const numSamples = 50;
            const step = (xMax - xMin) / numSamples;
            for (let x = xMin; x <= xMax; x += step) {
                try {
                    points.push([x, shape.fuzzify(x)]);
                }
                catch (e) {
                    // Skip invalid points
                }
            }
        }
        return points;
    }
    render(shape) {
        const { width, height, backgroundColor, strokeColor, strokeWidth, fillOpacity, gridLines } = this.options;
        let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
        svg += `<rect width="${width}" height="${height}" fill="${backgroundColor}" />`;
        if (gridLines) {
            svg += this.renderGrid();
        }
        const points = this.getShapePoints(shape);
        const path = this.generatePath(points);
        // Add fill area
        if (fillOpacity > 0 && points.length > 0) {
            const fillPath = path + ` L ${this.scaleX(points[points.length - 1][0])} ${this.scaleY(0)} L ${this.scaleX(points[0][0])} ${this.scaleY(0)} Z`;
            svg += `<path d="${fillPath}" fill="${strokeColor}" fill-opacity="${fillOpacity}" />`;
        }
        // Add stroke
        svg += `<path d="${path}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
        svg += '</svg>';
        return svg;
    }
    renderMultiple(shapes) {
        const { width, height, backgroundColor, gridLines, showLegend } = this.options;
        let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
        svg += `<rect width="${width}" height="${height}" fill="${backgroundColor}" />`;
        if (gridLines) {
            svg += this.renderGrid();
        }
        const legendItems = [];
        shapes.forEach(({ shape, options = {}, label }) => {
            const strokeColor = options.strokeColor || this.options.strokeColor;
            const fillOpacity = options.fillOpacity !== undefined ? options.fillOpacity : this.options.fillOpacity;
            const strokeWidth = options.strokeWidth || this.options.strokeWidth;
            // Collect legend items if label is provided
            if (label && showLegend) {
                legendItems.push({ label, color: strokeColor });
            }
            const points = this.getShapePoints(shape);
            const path = this.generatePath(points);
            // Add fill area
            if (fillOpacity > 0 && points.length > 0) {
                const fillPath = path + ` L ${this.scaleX(points[points.length - 1][0])} ${this.scaleY(0)} L ${this.scaleX(points[0][0])} ${this.scaleY(0)} Z`;
                svg += `<path d="${fillPath}" fill="${strokeColor}" fill-opacity="${fillOpacity}" />`;
            }
            // Add stroke
            svg += `<path d="${path}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`;
        });
        // Add legend if enabled
        if (showLegend && legendItems.length > 0) {
            svg += this.renderLegend(legendItems);
        }
        svg += '</svg>';
        return svg;
    }
}
exports.SVGRenderer = SVGRenderer;
//# sourceMappingURL=svg-renderer.js.map