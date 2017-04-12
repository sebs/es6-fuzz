'use strict';
import { Shape } from './shape';
/**
 * Class representing a Triangle.
 * @example
 * new Triangle(0, 10, 20)
 */
export class Triangle extends Shape {
  /**
   * Fuzzify
   * @param {number} - Point on X axis
   * @return {number} fuzzy output 0..1
   */
  fuzzify(x) {
    let result = 0;
    if (x <= this.x0) {
      result = 0;
    } else if (x >= this.x2) {
      result = 0;
    } else if ((x > this.x0) && (x <= this.x1)) {
      result = (x - this.x0) / (this.x1 - this.x0);
    } else if ((x > this.x1) && (x < this.x2)) {
      result = (this.x2 - x) / (this.x2 - this.x1);
    }
    return result;
  }
}
