import { Shape } from './shape';

export class Trapezoid extends Shape {
  fuzzify(val) {
    let result = 0;
    const x = val;

    if (x <= this.x0) {
      result = 0;
    } else if (x >= this.x3) {
      result = 0;
    } else if ((x >= this.x1) && (x <= this.x2)) {
      result = 1;
    } else if ((x > this.x0) && (x < this.x1)) {
      result = (x / (this.x1 - this.x0)) - (this.x0 / (this.x1 - this.x0));
    } else {
      result = (-x / (this.x3 - this.x2)) + (this.x3 / (this.x3 - this.x2));
    }
    return result;
  }
}
