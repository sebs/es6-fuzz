'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReverseGrade = void 0;
const shape_1 = require("./shape");
/**
 * Class representing a ReverseGrade.
 * @example
 * new ReverseGrade(0, 10)
 */
class ReverseGrade extends shape_1.Shape {
    /**
     * Create a ReverseGrade.
     * @param {number} x0 - end of the full-membership plateau (membership 1)
     * @param {number} x1 - end of the falling edge (membership 0)
     */
    constructor(x0, x1) {
        super(x0, x1, x1, x1);
    }
    /**
     * Fuzzify
     * @param {number} val - Point on X axis
     * @return {number} fuzzy output 0..1
     */
    fuzzify(val) {
        let result = 0;
        const x = val;
        if (x <= this.x0) {
            result = 1;
        }
        else if (x >= this.x1) {
            result = 0;
        }
        else {
            // Handle case where x0 = x1 (vertical reverse grade)
            if (this.x1 === this.x0) {
                result = 0;
            }
            else {
                result = -x / (this.x1 - this.x0) + this.x1 / (this.x1 - this.x0);
            }
        }
        return result;
    }
}
exports.ReverseGrade = ReverseGrade;
//# sourceMappingURL=reverse-grade.js.map