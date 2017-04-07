/** Class representing a FuzzyFunction. */
export class FuzzyFunction  {
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
    var res = this.cb(val);
    if (res >= 0 && res <= 1) {
      return res;
    }
    throw Error('fuzzified result must be smaller than 1 but greater than 0 but is' + res);
  }
}
