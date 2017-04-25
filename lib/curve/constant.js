'use strict';
/** Class representing a Constant. */
class Constant {
  /**
   * Create a Constant Value.
   * @param {number} constantValue - The value.
   * @example
   * new Constant(10)
   */
  constructor(constantValue) {
    this.cValue = constantValue;
  }
  /**
   * Fuzzify
   * @return {number} constant output
   */
  fuzzify() {
    return this.cValue;
  }
}
module.exports = Constant;
