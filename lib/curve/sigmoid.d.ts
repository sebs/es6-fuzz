/**
 * Class representing a Sigmoid.
 * @example
 * // long slope
 * sigmoid = new Sigmoid(0, 100000);
 * sigmoid2.fuzzify(10);
 */
declare class Sigmoid {
    private readonly center;
    private readonly slope;
    /**
     * Create a Sigmoid Function.
     * @param {number} center - The center point of the sigmoid curve (where it outputs 0.5)
     * @param {number} slope - The slope of the sigmoid curve (higher = steeper transition)
     */
    constructor(center?: number, slope?: number);
    /**
     * Fuzzify
     * @param {number} x - Point on X axis
     * @return {number} fuzzy output 0..1
     */
    fuzzify(x: number): number;
}
export = Sigmoid;
//# sourceMappingURL=sigmoid.d.ts.map