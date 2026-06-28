'use strict';
import { Fuzzifier } from './fuzzifier';
/**
 * Class representing a Sigmoid.
 * @example
 * // long slope
 * sigmoid = new Sigmoid(0, 100000);
 * sigmoid2.fuzzify(10);
 */
export class Sigmoid implements Fuzzifier {
  private readonly center: number;
  private readonly slope: number;

  /**
   * Create a Sigmoid Function.
   * @param {number} center - The center point of the sigmoid curve (where it outputs 0.5).
   *   Must be finite.
   * @param {number} slope - Width of the transition: it appears in the denominator
   *   as 1 / (1 + exp(-(x - center) / slope)), so a smaller magnitude means a steeper
   *   transition and a larger magnitude a gentler one. A **negative** slope inverts the
   *   curve into a decreasing S (high membership below the center, low above). A slope of
   *   `0` degenerates to an increasing step at the center (0.5 exactly at the center).
   *   Must be finite; non-finite center/slope throw.
   */
  constructor(center: number = 0, slope: number = 1) {
    // Validate up front (like Constant/FuzzyFunction): a non-finite center or
    // slope makes fuzzify return NaN, breaking the documented 0..1 contract and
    // making defuzzify report no winner ('none') for an otherwise valid rule.
    if (!Number.isFinite(center)) {
      throw Error('Sigmoid center must be a finite number but is ' + center);
    }
    if (!Number.isFinite(slope)) {
      throw Error('Sigmoid slope must be a finite number but is ' + slope);
    }
    this.center = center;
    this.slope = slope;
  }
  /**
   * Fuzzify
   * @param {number} x - Point on X axis
   * @return {number} fuzzy output 0..1
   */
  fuzzify(x: number): number {
    // NaN has no meaningful membership; treat it as 0 instead of returning NaN.
    if (Number.isNaN(x)) return 0;
    if (this.slope === 0) {
      // When slope is 0, sigmoid becomes a step function
      if (x < this.center) return 0;
      if (x > this.center) return 1;
      return 0.5; // At center point
    }
    return 1.0 / (1.0 + Math.exp(-(x - this.center) / this.slope));
  }
}
