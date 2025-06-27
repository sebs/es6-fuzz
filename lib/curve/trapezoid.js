'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trapezoid = void 0;
const shape_1 = require("./shape");
/**
 * Class representing a Trapezoid.
 * @example
 * new Trapezoid(0, 10, 15, 20)
 */
class Trapezoid extends shape_1.Shape {
    /**
     * Fuzzify
     * @param {number} val - Point on X axis
     * @return {number} fuzzy output 0..1
     */
    fuzzify(val) {
        let result = 0;
        const x = val;
        // Special case: all points equal (spike at single point)
        if (this.x0 === this.x1 && this.x1 === this.x2 && this.x2 === this.x3) {
            return x === this.x0 ? 1 : 0;
        }
        // Special case: x0=x1 and x2=x3 (rectangle)
        if (this.x0 === this.x1 && this.x2 === this.x3) {
            if (x < this.x0)
                return 0;
            if (x >= this.x0 && x <= this.x2)
                return 1;
            if (x > this.x2)
                return 0;
            return 0;
        }
        if (x <= this.x0) {
            result = 0;
        }
        else if (x >= this.x3) {
            result = 0;
        }
        else if ((x >= this.x1) && (x <= this.x2)) {
            result = 1;
        }
        else if ((x > this.x0) && (x < this.x1)) {
            // Handle case where x0 = x1 (vertical left edge)
            if (this.x1 === this.x0) {
                result = 1;
            }
            else {
                result = (x / (this.x1 - this.x0)) - (this.x0 / (this.x1 - this.x0));
            }
        }
        else {
            // Handle case where x2 = x3 (vertical right edge)
            if (this.x3 === this.x2) {
                result = 1;
            }
            else {
                result = (-x / (this.x3 - this.x2)) + (this.x3 / (this.x3 - this.x2));
            }
        }
        return result;
    }
}
exports.Trapezoid = Trapezoid;
//# sourceMappingURL=trapezoid.js.map