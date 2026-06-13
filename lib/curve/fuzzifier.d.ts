/**
 * Common interface implemented by every fuzzifier.
 *
 * Anything that maps a crisp input value to a membership degree can be used
 * with {@link Logic}. This includes the geometric {@link Shape} curves as well
 * as {@link Constant}, {@link Sigmoid} and {@link FuzzyFunction}, none of which
 * are point-based shapes.
 */
export interface Fuzzifier {
    /**
     * Fuzzify
     * @param {number} val - Point on X axis
     * @return {number} fuzzy output 0..1
     */
    fuzzify(val: number): number;
}
//# sourceMappingURL=fuzzifier.d.ts.map