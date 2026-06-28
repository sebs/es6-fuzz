'use strict';
import { Fuzzifier } from './fuzzifier';
/** Base class representing a Shape. */
export abstract class Shape implements Fuzzifier {
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
    // Define the coordinates as truly immutable: not writable AND not
    // configurable, so they can't be reassigned, deleted or redefined. With
    // useDefineForClassFields the field declarations above otherwise leave them
    // configurable:true, letting `delete shape.x0` or a redefine defeat the
    // read-only intent. They stay enumerable so they remain visible as the
    // documented public properties (e.g. in JSON.stringify).
    const coords: Array<[string, number]> = [
      ['x0', x0],
      ['x1', x1],
      ['x2', x2],
      ['x3', x3],
    ];
    for (const [name, value] of coords) {
      Object.defineProperty(this, name, {
        value,
        writable: false,
        enumerable: true,
        configurable: false,
      });
    }
  }

  /**
   * Fuzzify
   * @param {number} val - Point on X axis
   * @return {number} fuzzy output 0..1
   */
  abstract fuzzify(val: number): number;
}
