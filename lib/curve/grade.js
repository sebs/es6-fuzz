import { Shape } from './shape';
/** @module Curve */

/** @class */
export class Grade extends Shape {
  fuzzify(val) {
    'use strict';
    var result = 0;
    const x = val;
    if (x <= this.x0) {
      result = 0;
    } else if (x >= this.x1) {
      result = 1;
    } else {
      result = (x / (this.x1 - this.x0)) - (this.x0 / (this.x1 - this.x0));
    }
    return result;
  }
}
