'use strict';
/**
 * Class representing a Sigmoid.
 * @example
 * // long slope
 * sigmoid = new Sigmoid(0, 100000);
 * sigmoid2.fuzzify(10);
 */
class Sigmoid {
  /**
   * Create a Sigmoid Function.
   * @param {number} treshhold
   * @param {number} slope
   */
  constructor(treshold=0, slope=1) {
    this.t = -treshold;
    this.s = slope;
  }
  /**
   * Fuzzify
   * @param {number} - Point on X axis
   * @return {number} fuzzy output 0..1
   */
  fuzzify(x) {
    return 1.0 / (1.0 + Math.exp((-x-this.t)/this.s));
  }
}
module.exports = Sigmoid;
