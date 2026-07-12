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
  constructor(x0: number, x1: number, x2: number, x3?: number) {
    // 3-argument form: collapse the right foot onto the plateau end (x3 = x2),
    // the same way Triangle/Grade fill their trailing coordinates. This keeps the
    // `readonly x3: number` contract honest (x3 is always a concrete number) so
    // the falling edge can never divide by `undefined` and return NaN.
    const x3r = x3 === undefined ? x2 : x3;
    super(x0, x1, x2, x3r);
    // Coordinates must be finite: a non-finite bound (e.g. x3=Infinity) makes the
    // adjacent edge compute Inf/Inf = NaN for finite inputs, violating the
    // documented 0..1 contract (see findings.md F1).
    if (
      !Number.isFinite(x0) ||
      !Number.isFinite(x1) ||
      !Number.isFinite(x2) ||
      !Number.isFinite(x3r)
    ) {
      throw Error(
        'Trapezoid requires finite coordinates but got x0=' +
          x0 + ', x1=' + x1 + ', x2=' + x2 + ', x3=' + x3r
      );
    }
    // Reject out-of-order params. In particular an inverted plateau (x1 > x2)
    // makes the plateau branch unsatisfiable, so the curve never reaches
    // membership 1 and develops a discontinuity.
    if (!(x0 <= x1 && x1 <= x2 && x2 <= x3r)) {
      throw Error(
        'Trapezoid requires x0 <= x1 <= x2 <= x3 but got x0=' +
          x0 + ', x1=' + x1 + ', x2=' + x2 + ', x3=' + x3r
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
