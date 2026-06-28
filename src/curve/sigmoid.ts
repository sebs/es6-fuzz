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
   * @param {number} center - The center point of the sigmoid curve (where it outputs 0.5)
   * @param {number} slope - Width of the transition: it appears in the denominator
   *   as 1 / (1 + exp(-(x - center) / slope)), so a smaller slope means a steeper
   *   transition and a larger slope a gentler one.
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
