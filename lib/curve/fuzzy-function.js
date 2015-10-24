/**
 * @class
 */
export class FuzzyFunction  {
  constructor(cb) {
    this.cb = cb;
  }
  fuzzify(val) {
    var res = this.cb(val);
    if (res >= 0 && res <= 1) {
      return res;
    }
    throw Error('fuzzified result must be smaller than 1 but greater than 0 but is' + res);
  }
}
