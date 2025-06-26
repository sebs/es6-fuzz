'use strict';
/** Class representing a Constant. */
class Constant {
  private readonly cValue: number;

  /**
   * Create a Constant Value.
   * @param {number} constantValue - The value.
   * @example
   * new Constant(10)
   */
  constructor(constantValue: number) {
    this.cValue = constantValue;
  }
  /**
   * Fuzzify
   * @return {number} constant output
   */
  fuzzify(): number {
    return this.cValue;
  }
}
export = Constant;