'use strict';
import { Shape } from './shape';
/**
 * Class representing a Trapezoid.
 * @example
 * new Trapezoid(0, 10, 15, 20)
 */
export class Trapezoid extends Shape {
  /**
   * Create a Trapezoid.
   * @param {number} x0 - left foot (membership 0)
   * @param {number} x1 - start of the plateau (membership 1)
   * @param {number} x2 - end of the plateau (membership 1)
   * @param {number} x3 - right foot (membership 0)
   */
  constructor(x0: number, x1: number, x2: number, x3: number) {
    super(x0, x1, x2, x3);
    // Reject out-of-order finite params. In particular an inverted plateau
    // (x1 > x2) makes the plateau branch unsatisfiable, so the curve never
    // reaches membership 1 and develops a discontinuity. NaN/Infinity, and the
    // 3-argument form (x3 === undefined), are left untouched.
    if (
      Number.isFinite(x0) &&
      Number.isFinite(x1) &&
      Number.isFinite(x2) &&
      Number.isFinite(x3) &&
      !(x0 <= x1 && x1 <= x2 && x2 <= x3)
    ) {
      throw Error(
        'Trapezoid requires x0 <= x1 <= x2 <= x3 but got x0=' +
          x0 + ', x1=' + x1 + ', x2=' + x2 + ', x3=' + x3
      );
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

    // NaN has no meaningful membership; treat it as outside the support (0)
    // instead of letting it propagate through the edge arithmetic.
    if (Number.isNaN(x)) return 0;

    // Special case: all points equal (spike at single point)
    if (this.x0 === this.x1 && this.x1 === this.x2 && this.x2 === this.x3) {
      return x === this.x0 ? 1 : 0;
    }

    // Special case: x0=x1 and x2=x3 (rectangle)
    if (this.x0 === this.x1 && this.x2 === this.x3) {
      if (x < this.x0) return 0;
      if (x >= this.x0 && x <= this.x2) return 1;
      if (x > this.x2) return 0;
      return 0;
    }

    if (x >= this.x1 && x <= this.x2) {
      // Plateau, corners included. When a single edge is vertical (x0===x1 or
      // x2===x3) the corner must read 1 — consistent with the rectangle case
      // above and with Triangle. Evaluating the plateau before the x<=x0 / x>=x3
      // zero guards is what makes those corners correct instead of dropping to 0.
      result = 1;
    } else if (x <= this.x0) {
      result = 0;
    } else if (x >= this.x3) {
      result = 0;
    } else if (x > this.x0 && x < this.x1) {
      // Rising edge — only reached when x0 < x1, so the divisor is never 0.
      result = x / (this.x1 - this.x0) - this.x0 / (this.x1 - this.x0);
    } else {
      // Falling edge — only reached when x2 < x3, so the divisor is never 0.
      result = -x / (this.x3 - this.x2) + this.x3 / (this.x3 - this.x2);
    }
    return result;
  }
}
