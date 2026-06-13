'use strict';
import { Fuzzifier } from './fuzzifier';
/** Class representing a Constant. */
export class Constant implements Fuzzifier {
  private readonly cValue: number;

  /**
   * Create a Constant Value.
   * @param {number} constantValue - The membership value, must be within 0..1.
   * @example
   * new Constant(0.5)
   */
  constructor(constantValue: number) {
    if (!(constantValue >= 0 && constantValue <= 1)) {
      throw Error('Constant value must be between 0 and 1 but is ' + constantValue);
    }
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
