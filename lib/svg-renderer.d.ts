import { Shape } from './curve/shape';
import { Constant } from './curve/constant';
import { FuzzyFunction } from './curve/fuzzy-function';
import { Sigmoid } from './curve/sigmoid';
export interface SVGOptions {
    width?: number;
    height?: number;
    padding?: number;
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
    gridLines?: boolean;
    strokeWidth?: number;
    strokeColor?: string;
    fillOpacity?: number;
    backgroundColor?: string;
    gridColor?: string;
    axisColor?: string;
    labelColor?: string;
    fontSize?: number;
    showLabels?: boolean;
    showLegend?: boolean;
    legendPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    legendPadding?: number;
    legendBackgroundColor?: string;
    legendBorderColor?: string;
    legendTextColor?: string;
}
export declare class SVGRenderer {
    private options;
    private readonly defaultOptions;
    constructor(options?: SVGOptions);
    private scaleX;
    private scaleY;
    private generatePath;
    private renderGrid;
    private renderLegend;
    private getShapePoints;
    render(shape: Shape | Constant | FuzzyFunction | Sigmoid): string;
    renderMultiple(shapes: Array<{
        shape: Shape | Constant | FuzzyFunction | Sigmoid;
        options?: Partial<{
            strokeColor: string;
            fillOpacity: number;
            strokeWidth: number;
        }>;
        label?: string;
    }>): string;
}
//# sourceMappingURL=svg-renderer.d.ts.map