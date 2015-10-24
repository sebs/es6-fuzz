// http://www.zacwitte.com/javascript-sigmoid-function
export class Sigmoid {
  constructor(treshold=0, slope=1) {
    this.t = -treshold;
    this.s = slope;
  }
  fuzzify(x) {
    return 1.0 / (1.0 + Math.exp((-x-this.t)/this.s));
  }
}
