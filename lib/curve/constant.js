'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constant = void 0;
/** Class representing a Constant. */
class Constant {
    cValue;
    /**
     * Create a Constant Value.
     * @param {number} constantValue - The value.
     * @example
     * new Constant(10)
     */
    constructor(constantValue) {
        this.cValue = constantValue;
    }
    /**
     * Fuzzify
     * @return {number} constant output
     */
    fuzzify() {
        return this.cValue;
    }
}
exports.Constant = Constant;
//# sourceMappingURL=constant.js.map