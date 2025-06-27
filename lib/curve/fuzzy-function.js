"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuzzyFunction = void 0;
/** Class representing a FuzzyFunction. */
class FuzzyFunction {
    cb;
    /**
     * Create a FuzzyFunction.
     * @param {function} cb - callback function.
     */
    constructor(cb) {
        this.cb = cb;
    }
    /**
     * Fuzzify
     * @param {number} val - value to fuzzify
     */
    fuzzify(val) {
        const res = this.cb(val);
        if (res >= 0 && res <= 1) {
            return res;
        }
        throw Error('fuzzified result must be smaller than 1 but greater than 0 but is' + res);
    }
}
exports.FuzzyFunction = FuzzyFunction;
//# sourceMappingURL=fuzzy-function.js.map