import { Fuzzifier } from './fuzzifier';
/** Class representing a FuzzyFunction. */
export class FuzzyFunction implements Fuzzifier {
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
    throw Error('fuzzified result must be between 0 and 1 but is ' + res);
  }
}
