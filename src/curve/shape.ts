'use strict';
/** Base class representing a Shape. */
export abstract class Shape {
  readonly x0!: number;
  readonly x1!: number;
  readonly x2!: number;
  readonly x3!: number;

  /**
   * Create a Shape.
   * @param {number} x0 - x0
   * @param {number} x1 - x1
   * @param {number} x2 - x2
   * @param {number} x3 - x3
   */
  constructor(x0: number, x1: number, x2: number, x3: number) {
    Object.defineProperty(this, 'x0', {
      value: x0,
      writable: false
    });
    Object.defineProperty(this, 'x1', {
      value: x1,
      writable: false
    });
    Object.defineProperty(this, 'x2', {
      value: x2,
      writable: false
    });
    Object.defineProperty(this, 'x3', {
      value: x3,
      writable: false
    });
  }

  /**
   * Fuzzify
   * @param {number} val - Point on X axis
   * @return {number} fuzzy output 0..1
   */
  abstract fuzzify(val: number): number;
}

