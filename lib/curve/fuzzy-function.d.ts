import { Fuzzifier } from './fuzzifier';
/** Class representing a FuzzyFunction. */
export declare class FuzzyFunction implements Fuzzifier {
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
//# sourceMappingURL=fuzzy-function.d.ts.map