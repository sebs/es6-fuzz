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
   * @param {number} center - The center point of the sigmoid curve (where it outputs 0.5)
   * @param {number} slope - The slope of the sigmoid curve (higher = steeper transition)
   */
  constructor(center=0, slope=1) {
    this.center = center;
    this.slope = slope;
  }
  /**
   * Fuzzify
   * @param {number} x - Point on X axis
   * @return {number} fuzzy output 0..1
   */
  fuzzify(x) {
    return 1.0 / (1.0 + Math.exp(-(x - this.center) / this.slope));
  }
}
module.exports = Sigmoid;
