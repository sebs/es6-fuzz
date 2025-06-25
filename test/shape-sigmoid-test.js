'use strict';
const { describe, it } = require('node:test');
const Sigmoid = require('../lib/curve/sigmoid');
const assert = require('assert');

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

  describe('center parameter behavior', function() {
    it('should correctly handle positive center values', function() {
      // This test verifies that the sigmoid is properly centered
      var sigmoid = new Sigmoid(2, 1);
      
      // With center=2, the sigmoid is centered at x=2
      // So sigmoid.fuzzify(2) should return 0.5
      var res = sigmoid.fuzzify(2);
      assert.equal(res, 0.5);
      
      // Values to the right of the center should approach 1
      var rightOfCenter = sigmoid.fuzzify(4);
      assert(rightOfCenter > 0.5);
      assert(rightOfCenter < 1);
      
      // Values to the left of the center should approach 0
      var leftOfCenter = sigmoid.fuzzify(0);
      assert(leftOfCenter < 0.5);
      assert(leftOfCenter > 0);
    });

    it('should correctly handle negative center values', function() {
      var sigmoid = new Sigmoid(-3, 1);
      
      // With center=-3, the sigmoid is centered at x=-3
      // So sigmoid.fuzzify(-3) should return 0.5
      var res = sigmoid.fuzzify(-3);
      assert.equal(res, 0.5);
    });

    it('sigmoid should be 0.075 at zero', function() {
      // Test that verifies the sigmoid value at x=0 when center=5
      var sigmoid = new Sigmoid(5, 2);
      var atZero = sigmoid.fuzzify(0);
      assert.equal(atZero, 0.07585818002124355);
    });

    it('verifies sigmoid symmetry', function() {
      // Test that verifies the sigmoid curve is symmetric around its center
      var sigmoid = new Sigmoid(5, 2);
      
      // Test symmetry around the center point
      var atCenter = sigmoid.fuzzify(5);
      assert.equal(atCenter, 0.5);
      
      // Test points equidistant from center
      var rightPoint = sigmoid.fuzzify(7); // 2 units right of center
      var leftPoint = sigmoid.fuzzify(3);  // 2 units left of center
      
      // Due to sigmoid symmetry: f(center+d) + f(center-d) should equal 1
      var sum = rightPoint + leftPoint;
      assert(Math.abs(sum - 1) < 0.0000001, `Sum ${sum} should be approximately 1`);
    });
  });
});
