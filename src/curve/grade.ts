'use strict';
import { Shape } from './shape';
/**
 * Class representing a Grade.
 * @example
 * new Grade(0, 10)
 */
export class Grade extends Shape {
  /**
   * Create a Grade.
   * @param {number} x0 - start of the rising edge (membership 0)
   * @param {number} x1 - end of the rising edge (membership 1)
   */
  constructor(x0: number, x1: number) {
    super(x0, x1, x1, x1);
    // Reject reversed finite params: with x0 > x1 the `x <= x0` guard swallows
    // the whole interior, so the ramp collapses into a hard step and the linear
    // branch becomes dead code. NaN/Infinity are left untouched (handled at
    // fuzzify time and relied on by callers passing open-ended bounds).
    if (Number.isFinite(x0) && Number.isFinite(x1) && x0 > x1) {
      throw Error('Grade requires x0 <= x1 but got x0=' + x0 + ', x1=' + x1);
    }
  }
  /**
   * Fuzzify
   * @param {number} val - Point on X axis
   * @return {number} fuzzy output 0..1
   */
  fuzzify(val: number): number {
    let result = 0;
    const x = val;

    // NaN has no meaningful membership; treat it as outside the ramp (0).
    if (Number.isNaN(x)) return 0;

    // Handle case where x0 = x1 (vertical grade/step function).
    // Treat it as the limit of the ramp: the foot at x0 is 0, like the normal
    // grade below, so behaviour stays continuous as x1 approaches x0.
    if (this.x1 === this.x0) {
      if (x <= this.x0) return 0;
      return 1; // x > x0
    }

    if (x <= this.x0) {
      result = 0;
    } else if (x >= this.x1) {
      result = 1;
    } else {
      // Algebraically equal to x/(x1-x0) - x0/(x1-x0) but numerically stable:
      // the split form subtracts two large nearly-equal quotients and loses
      // significance for large coordinates (see Grade large-coordinate bug).
      result = (x - this.x0) / (this.x1 - this.x0);
    }
    return result;
  }
}
