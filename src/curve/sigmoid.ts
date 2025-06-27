'use strict';
/**
 * Class representing a Sigmoid.
 * @example
 * // long slope
 * sigmoid = new Sigmoid(0, 100000);
 * sigmoid2.fuzzify(10);
 */
export class Sigmoid {
  private readonly center: number;
  private readonly slope: number;

  /**
   * Create a Sigmoid Function.
   * @param {number} center - The center point of the sigmoid curve (where it outputs 0.5)
   * @param {number} slope - The slope of the sigmoid curve (higher = steeper transition)
   */
  constructor(center: number = 0, slope: number = 1) {
    this.center = center;
    this.slope = slope;
  }
  /**
   * Fuzzify
   * @param {number} x - Point on X axis
   * @return {number} fuzzy output 0..1
   */
  fuzzify(x: number): number {
    if (this.slope === 0) {
      // When slope is 0, sigmoid becomes a step function
      if (x < this.center) return 0;
      if (x > this.center) return 1;
      return 0.5; // At center point
    }
    return 1.0 / (1.0 + Math.exp(-(x - this.center) / this.slope));
  }
}
