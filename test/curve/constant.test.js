const { describe, it } = require('node:test');
const Constant= require('../../lib/curve/constant');
const assert = require('assert');

describe('Constant', function() {
  it('is a function', function() {
    assert.equal(typeof Constant, 'function');
  });
  it('same value at 5 and 100', function() {
    var shape = new Constant(1);
    var resFive = shape.fuzzify(5);
    var resHundret = shape.fuzzify(100);
    assert.equal(resFive, resHundret);
  });
});
