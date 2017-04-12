'use strict';
/** Class representing a Sigmoid. */
export class Sigmoid {
  /**
   * Create a Sigmoid Function.
   * @param {number} treshhold
   * @param {number} slope
   */
  constructor(treshold=0, slope=1) {
    this.t = -treshold;
    this.s = slope;
  }
  /**
   * Fuzzify
   * @param {number} - x
   */
  fuzzify(x) {
    return 1.0 / (1.0 + Math.exp((-x-this.t)/this.s));
  }
}
