/** Class representing a Constant. */
declare class Constant {
    private readonly cValue;
    /**
     * Create a Constant Value.
     * @param {number} constantValue - The value.
     * @example
     * new Constant(10)
     */
    constructor(constantValue: number);
    /**
     * Fuzzify
     * @return {number} constant output
     */
    fuzzify(): number;
}
export = Constant;
//# sourceMappingURL=constant.d.ts.map