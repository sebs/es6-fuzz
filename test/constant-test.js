const { describe, it } = require('node:test');
const Constant= require('../lib/curve/constant');
const assert = require('assert');

describe('Constant', function() {
  it('is a function', function() {
    assert.equal(typeof Constant, 'function');
  });
  it('can create a new instance', function() {
    var shape = new Constant(1);
    var res = shape.fuzzify(5);
    assert.equal(res, 1);
  });
});
