import Shape from './shape';
/**
 * Class representing a Trapezoid.
 * @example
 * new Trapezoid(0, 10, 15, 20)
 */
declare class Trapezoid extends Shape {
    /**
     * Fuzzify
     * @param {number} val - Point on X axis
     * @return {number} fuzzy output 0..1
     */
    fuzzify(val: number): number;
}
export = Trapezoid;
//# sourceMappingURL=trapezoid.d.ts.map