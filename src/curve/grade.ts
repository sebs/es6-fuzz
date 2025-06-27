'use strict';
import { Shape } from './shape';
/**
 * Class representing a Grade.
 * @example
 * new Grade(0, 10)
 */
export class Grade extends Shape {
  /**
   * Fuzzify
   * @param {number} val - Point on X axis
   * @return {number} fuzzy output 0..1
   */
  fuzzify(val: number): number {
    let result = 0;
    const x = val;
    
    // Handle case where x0 = x1 (vertical grade/step function)
    if (this.x1 === this.x0) {
      if (x < this.x0) return 0;
      return 1; // x >= x0
    }
    
    if (x <= this.x0) {
      result = 0;
    } else if (x >= this.x1) {
      result = 1;
    } else {
      result = (x / (this.x1 - this.x0)) - (this.x0 / (this.x1 - this.x0));
    }
    return result;
  }
}
