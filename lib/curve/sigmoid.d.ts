import { Fuzzifier } from './fuzzifier';
/**
 * Class representing a Sigmoid.
 * @example
 * // long slope
 * sigmoid = new Sigmoid(0, 100000);
 * sigmoid2.fuzzify(10);
 */
export declare class Sigmoid implements Fuzzifier {
    private readonly center;
    private readonly slope;
    /**
     * Create a Sigmoid Function.
     * @param {number} center - The center point of the sigmoid curve (where it outputs 0.5)
     * @param {number} slope - Width of the transition: it appears in the denominator
     *   as 1 / (1 + exp(-(x - center) / slope)), so a smaller slope means a steeper
     *   transition and a larger slope a gentler one.
     */
    constructor(center?: number, slope?: number);
    /**
     * Fuzzify
     * @param {number} x - Point on X axis
     * @return {number} fuzzy output 0..1
     */
    fuzzify(x: number): number;
}
//# sourceMappingURL=sigmoid.d.ts.map