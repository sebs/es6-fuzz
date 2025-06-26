'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const shape_1 = __importDefault(require("./shape"));
/** Class representing a ReverseGrade. */
class ReverseGrade extends shape_1.default {
    /**
     * Fuzzify
     * @param {number} - Point on X axis
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
                result = (-x / (this.x1 - this.x0)) + (this.x1 / (this.x1 - this.x0));
            }
        }
        return result;
    }
}
module.exports = ReverseGrade;
//# sourceMappingURL=reverse-grade.js.map