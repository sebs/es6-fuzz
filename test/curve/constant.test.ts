import { describe, it  } from 'node:test';
import Constant from '../../lib/curve/constant';
import assert from 'assert';

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
