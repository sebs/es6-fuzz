"use strict";
/** Class representing a FuzzyFunction. */
class FuzzyFunction {
    cb;
    /**
     * Create a FuzzyFunction.
     * @param {functions}  - callback.
     */
    constructor(cb) {
        this.cb = cb;
    }
    /**
     * Fuzzify
     * @param {number} - val
     */
    fuzzify(val) {
        const res = this.cb(val);
        if (res >= 0 && res <= 1) {
            return res;
        }
        throw Error('fuzzified result must be smaller than 1 but greater than 0 but is' + res);
    }
}
module.exports = FuzzyFunction;
//# sourceMappingURL=fuzzy-function.js.map