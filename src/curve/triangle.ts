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
   * @param {number} x - Point on X axis
   * @return {number} fuzzy output 0..1
   */
  fuzzify(x: number): number {
    let result = 0;
    
    // Special case: all points equal (spike at single point)
    if (this.x0 === this.x1 && this.x1 === this.x2) {
      return x === this.x0 ? 1 : 0;
    }
    
    // Special case: x0 = x1 (vertical left edge)
    if (this.x0 === this.x1) {
      if (x < this.x0) return 0;
      if (x === this.x0) return 1;
      if (x >= this.x2) return 0;
      if (x < this.x2) {
        return (this.x2 - x) / (this.x2 - this.x1);
      }
    }
    
    // Special case: x1 = x2 (vertical right edge)
    if (this.x1 === this.x2) {
      if (x <= this.x0) return 0;
      if (x > this.x0 && x < this.x1) {
        return (x - this.x0) / (this.x1 - this.x0);
      }
      if (x === this.x1) return 1;
      if (x > this.x1) return 0;
    }
    
    // Normal triangle
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
