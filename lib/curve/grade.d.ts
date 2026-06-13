import { Shape } from './shape';
/**
 * Class representing a Grade.
 * @example
 * new Grade(0, 10)
 */
export declare class Grade extends Shape {
    /**
     * Create a Grade.
     * @param {number} x0 - start of the rising edge (membership 0)
     * @param {number} x1 - end of the rising edge (membership 1)
     */
    constructor(x0: number, x1: number);
    /**
     * Fuzzify
     * @param {number} val - Point on X axis
     * @return {number} fuzzy output 0..1
     */
    fuzzify(val: number): number;
}
//# sourceMappingURL=grade.d.ts.map