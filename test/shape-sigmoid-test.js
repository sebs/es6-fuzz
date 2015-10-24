import { Sigmoid } from '../lib/curve/sigmoid';
import assert from 'assert';

describe('Sigmoid', function() {
  it('is a function', function() {
    assert.equal(typeof Sigmoid, 'function');
  });
  it('can create a new instance', function() {
    var sigmoid = new Sigmoid();
    var res = sigmoid.fuzzify(5);
    assert.equal(res, 0.9933071490757153);
  });

  it('0', function() {
    var sigmoid = new Sigmoid();
    var res = sigmoid.fuzzify(0);
    assert.equal(res, 0.5);
  });

  it('uses treshold', function() {
    var sigmoid = new Sigmoid(1);
    var res = sigmoid.fuzzify(1);
    assert.equal(res, 0.5);
  });

  describe('slope', function() {
    it('slope makes actually a difference', function() {
      const fvalue = 10;
      var sigmoid = new Sigmoid(0, 10);
      var resSmall = sigmoid.fuzzify(fvalue);
      var sigmoid2 = new Sigmoid(0, 100000);
      var resBig = sigmoid2.fuzzify(fvalue);
      assert.notEqual(resSmall, resBig);
    });
  });
});
