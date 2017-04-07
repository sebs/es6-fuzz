'use strict';
/** Class representing a Constant. */
export class Constant {
  /**
   * Create a Constant Value.
   * @param {number} constantValue - The value.
   */
  constructor(constantValue) {
    this.cValue = constantValue;
  }
  /**
   * Fuzzify
   * For a constant, this is the fuzzify(x) = x
   */
  fuzzify() {
    return this.cValue;
  }
}
