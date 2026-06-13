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
    let result = 0;
    const x = val;

    if (x <= this.x0) {
      result = 1;
    } else if (x >= this.x1) {
      result = 0;
    } else {
      // Handle case where x0 = x1 (vertical reverse grade)
      if (this.x1 === this.x0) {
        result = 0;
      } else {
        result = -x / (this.x1 - this.x0) + this.x1 / (this.x1 - this.x0);
      }
    }
    return result;
  }
}
