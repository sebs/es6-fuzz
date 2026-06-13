import { Shape } from './shape';
/**
 * Class representing a Triangle.
 * @example
 * new Triangle(0, 10, 20)
 */
export declare class Triangle extends Shape {
    /**
     * Create a Triangle.
     * @param {number} x0 - left base point
     * @param {number} x1 - peak
     * @param {number} x2 - right base point
     */
    constructor(x0: number, x1: number, x2: number);
    /**
     * Fuzzify
     * @param {number} x - Point on X axis
     * @return {number} fuzzy output 0..1
     */
    fuzzify(x: number): number;
}
//# sourceMappingURL=triangle.d.ts.map