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
        const x = val;
        // Vertical reverse grade (x0 = x1): step down, the mirror of Grade.
        // (The previous inline x0 === x1 handling sat in an unreachable branch:
        // when x0 === x1 every value is caught by x <= x0 or x >= x1 first.)
        if (this.x1 === this.x0) {
            if (x <= this.x0)
                return 1;
            return 0; // x > x0
        }
        if (x <= this.x0)
            return 1;
        if (x >= this.x1)
            return 0;
        return -x / (this.x1 - this.x0) + this.x1 / (this.x1 - this.x0);
    }
}
exports.ReverseGrade = ReverseGrade;
//# sourceMappingURL=reverse-grade.js.map