'use strict';
import { Shape } from './shape';
/**
 * Class representing a Trapezoid.
 * @example
 * new Trapezoid(0, 10, 15, 20)
 */
export class Trapezoid extends Shape {
  /**
   * Fuzzify
   * @param {number} - Point on X axis
   * @return {number} fuzzy output 0..1
   */
  fuzzify(val) {
    let result = 0;
    const x = val;

    if (x <= this.x0) {
      result = 0;
    } else if (x >= this.x3) {
      result = 0;
    } else if ((x >= this.x1) && (x <= this.x2)) {
      result = 1;
    } else if ((x > this.x0) && (x < this.x1)) {
      result = (x / (this.x1 - this.x0)) - (this.x0 / (this.x1 - this.x0));
    } else {
      result = (-x / (this.x3 - this.x2)) + (this.x3 / (this.x3 - this.x2));
    }
    return result;
  }
}
