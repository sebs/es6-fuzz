/** Class representing a FuzzyFunction. */
declare class FuzzyFunction {
    private readonly cb;
    /**
     * Create a FuzzyFunction.
     * @param {function} cb - callback function.
     */
    constructor(cb: (val: number) => number);
    /**
     * Fuzzify
     * @param {number} val - value to fuzzify
     */
    fuzzify(val: number): number;
}
export = FuzzyFunction;
//# sourceMappingURL=fuzzy-function.d.ts.map