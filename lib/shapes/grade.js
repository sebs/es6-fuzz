import { Shape } from './shape';
/**
 * Grade Type
 * @class
 * @param x0 left/lower side
 * @param x1 right upper side
 */
export class Grade extends Shape {
  evaluate(val) {
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
