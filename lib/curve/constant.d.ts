import { Fuzzifier } from './fuzzifier';
/** Class representing a Constant. */
export declare class Constant implements Fuzzifier {
    private readonly cValue;
    /**
     * Create a Constant Value.
     * @param {number} constantValue - The membership value, must be within 0..1.
     * @example
     * new Constant(0.5)
     */
    constructor(constantValue: number);
    /**
     * Fuzzify
     * @return {number} constant output
     */
    fuzzify(): number;
}
//# sourceMappingURL=constant.d.ts.map