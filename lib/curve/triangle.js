import { Shape } from './shape';
export class Triangle extends Shape {
  fuzzify(val) {
    let result = 0;
    const x = val;
    if (x <= this.x0) {
      result = 0;
    } else if (x >= this.x2) {
      result = 0;
    } else if ((x > this.x0) && (x <= this.x1)) {
      result = (x - this.x0) / (this.x1 - this.x0);
    } else if ((x > this.x1) && (x < this.x2)) {
      result = (this.x2 - x) / (this.x2 - this.x1);
    }
    return result;
  }
}
