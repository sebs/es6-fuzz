/** Class representing a FuzzyFunction. */
declare class FuzzyFunction {
    private readonly cb;
    /**
     * Create a FuzzyFunction.
     * @param {functions}  - callback.
     */
    constructor(cb: (val: number) => number);
    /**
     * Fuzzify
     * @param {number} - val
     */
    fuzzify(val: number): number;
}
export = FuzzyFunction;
//# sourceMappingURL=fuzzy-function.d.ts.map