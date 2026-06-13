import { Shape } from './shape';
/**
 * Class representing a ReverseGrade.
 * @example
 * new ReverseGrade(0, 10)
 */
export declare class ReverseGrade extends Shape {
    /**
     * Create a ReverseGrade.
     * @param {number} x0 - end of the full-membership plateau (membership 1)
     * @param {number} x1 - end of the falling edge (membership 0)
     */
    constructor(x0: number, x1: number);
    /**
     * Fuzzify
     * @param {number} val - Point on X axis
     * @return {number} fuzzy output 0..1
     */
    fuzzify(val: number): number;
}
//# sourceMappingURL=reverse-grade.d.ts.map