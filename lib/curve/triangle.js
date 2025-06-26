'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const shape_1 = __importDefault(require("./shape"));
/**
 * Class representing a Triangle.
 * @example
 * new Triangle(0, 10, 20)
 */
class Triangle extends shape_1.default {
    /**
     * Fuzzify
     * @param {number} x - Point on X axis
     * @return {number} fuzzy output 0..1
     */
    fuzzify(x) {
        let result = 0;
        // Special case: all points equal (spike at single point)
        if (this.x0 === this.x1 && this.x1 === this.x2) {
            return x === this.x0 ? 1 : 0;
        }
        // Special case: x0 = x1 (vertical left edge)
        if (this.x0 === this.x1) {
            if (x < this.x0)
                return 0;
            if (x === this.x0)
                return 1;
            if (x >= this.x2)
                return 0;
            if (x < this.x2) {
                return (this.x2 - x) / (this.x2 - this.x1);
            }
        }
        // Special case: x1 = x2 (vertical right edge)
        if (this.x1 === this.x2) {
            if (x <= this.x0)
                return 0;
            if (x > this.x0 && x < this.x1) {
                return (x - this.x0) / (this.x1 - this.x0);
            }
            if (x === this.x1)
                return 1;
            if (x > this.x1)
                return 0;
        }
        // Normal triangle
        if (x <= this.x0) {
            result = 0;
        }
        else if (x >= this.x2) {
            result = 0;
        }
        else if ((x > this.x0) && (x <= this.x1)) {
            result = (x - this.x0) / (this.x1 - this.x0);
        }
        else if ((x > this.x1) && (x < this.x2)) {
            result = (this.x2 - x) / (this.x2 - this.x1);
        }
        return result;
    }
}
module.exports = Triangle;
//# sourceMappingURL=triangle.js.map