/** Class representing a FuzzyFunction. */
export class FuzzyFunction {
  private readonly cb: (val: number) => number;

  /**
   * Create a FuzzyFunction.
   * @param {function} cb - callback function.
   */
  constructor(cb: (val: number) => number) {
    this.cb = cb;
  }
  /**
   * Fuzzify
   * @param {number} val - value to fuzzify
   */
  fuzzify(val: number): number {
    const res = this.cb(val);
    if (res >= 0 && res <= 1) {
      return res;
    }
    throw Error('fuzzified result must be smaller than 1 but greater than 0 but is' + res);
  }
}
