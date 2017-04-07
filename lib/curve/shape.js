  /** Base class representing a Shape. */
export class Shape {
  /**
   * Create a Shape.
   * @param {number}  - x0
   * @param {number}  - x1
   * @param {number}  - x2
   * @param {number}  - x3
   */
  constructor(x0, x1, x2, x3) {
      'use strict';
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
}
