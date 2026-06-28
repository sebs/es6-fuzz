'use strict';
import { Shape } from './shape';
/**
 * Class representing a ReverseGrade.
 * @example
 * new ReverseGrade(0, 10)
 */
export class ReverseGrade extends Shape {
  /**
   * Create a ReverseGrade.
   * @param {number} x0 - end of the full-membership plateau (membership 1)
   * @param {number} x1 - end of the falling edge (membership 0)
   */
  constructor(x0: number, x1: number) {
    super(x0, x1, x1, x1);
  }
  /**
   * Fuzzify
   * @param {number} val - Point on X axis
   * @return {number} fuzzy output 0..1
   */
  fuzzify(val: number): number {
    const x = val;

    // Vertical reverse grade (x0 = x1): step down, the mirror of Grade.
    // (The previous inline x0 === x1 handling sat in an unreachable branch:
    // when x0 === x1 every value is caught by x <= x0 or x >= x1 first.)
    if (this.x1 === this.x0) {
      if (x <= this.x0) return 1;
      return 0; // x > x0
    }

    if (x <= this.x0) return 1;
    if (x >= this.x1) return 0;
    // Algebraically equal to -x/(x1-x0) + x1/(x1-x0) but numerically stable:
    // the split form adds two large nearly-equal quotients and loses
    // significance for large coordinates.
    return (this.x1 - x) / (this.x1 - this.x0);
  }
}
