/** Base class representing a Shape. */
export declare abstract class Shape {
    readonly x0: number;
    readonly x1: number;
    readonly x2: number;
    readonly x3: number;
    /**
     * Create a Shape.
     * @param {number} x0 - x0
     * @param {number} x1 - x1
     * @param {number} x2 - x2
     * @param {number} x3 - x3
     */
    constructor(x0: number, x1: number, x2: number, x3: number);
    /**
     * Fuzzify
     * @param {number} val - Point on X axis
     * @return {number} fuzzy output 0..1
     */
    abstract fuzzify(val: number): number;
}
//# sourceMappingURL=shape.d.ts.map