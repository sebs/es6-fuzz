export class Constant {
  constructor(constantValue) {
    this.cValue = constantValue;
  }
  fuzzify(val) {
    'use strict';
    return this.cValue;
  }
}
