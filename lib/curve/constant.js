'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constant = void 0;
/** Class representing a Constant. */
class Constant {
    cValue;
    /**
     * Create a Constant Value.
     * @param {number} constantValue - The membership value, must be within 0..1.
     * @example
     * new Constant(0.5)
     */
    constructor(constantValue) {
        if (!(constantValue >= 0 && constantValue <= 1)) {
            throw Error('Constant value must be between 0 and 1 but is ' + constantValue);
        }
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