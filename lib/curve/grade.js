'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const shape_1 = __importDefault(require("./shape"));
/**
 * Class representing a Grade.
 * @example
 * new Grade(0, 10)
 */
class Grade extends shape_1.default {
    /**
     * Fuzzify
     * @param {number} val - Point on X axis
     * @return {number} fuzzy output 0..1
     */
    fuzzify(val) {
        let result = 0;
        const x = val;
        // Handle case where x0 = x1 (vertical grade/step function)
        if (this.x1 === this.x0) {
            if (x < this.x0)
                return 0;
            return 1; // x >= x0
        }
        if (x <= this.x0) {
            result = 0;
        }
        else if (x >= this.x1) {
            result = 1;
        }
        else {
            result = (x / (this.x1 - this.x0)) - (this.x0 / (this.x1 - this.x0));
        }
        return result;
    }
}
module.exports = Grade;
//# sourceMappingURL=grade.js.map