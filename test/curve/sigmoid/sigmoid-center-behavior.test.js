'use strict';
const { describe, it } = require('node:test');
const Sigmoid = require('../../../lib/curve/sigmoid');
const assert = require('assert');

describe('center parameter behavior', function() {
  it('should return 0.5 at the center for positive center values', function() {
    var sigmoid = new Sigmoid(2, 1);
    var res = sigmoid.fuzzify(2);
    assert.equal(res, 0.5);
  });

  it('should return value greater than 0.5 for values right of positive center', function() {
    var sigmoid = new Sigmoid(2, 1);
    var rightOfCenter = sigmoid.fuzzify(4);
    assert(rightOfCenter > 0.5);
  });

  it('should return value less than 1 for values right of positive center', function() {
    var sigmoid = new Sigmoid(2, 1);
    var rightOfCenter = sigmoid.fuzzify(4);
    assert(rightOfCenter < 1);
  });

  it('should return value less than 0.5 for values left of positive center', function() {
    var sigmoid = new Sigmoid(2, 1);
    var leftOfCenter = sigmoid.fuzzify(0);
    assert(leftOfCenter < 0.5);
  });

  it('should return value greater than 0 for values left of positive center', function() {
    var sigmoid = new Sigmoid(2, 1);
    var leftOfCenter = sigmoid.fuzzify(0);
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

  it('should return 0.5 at center point for symmetry', function() {
    var sigmoid = new Sigmoid(5, 2);
    var atCenter = sigmoid.fuzzify(5);
    assert.equal(atCenter, 0.5);
  });

  it('should be symmetric around center point', function() {
    var sigmoid = new Sigmoid(5, 2);
    var rightPoint = sigmoid.fuzzify(7); // 2 units right of center
    var leftPoint = sigmoid.fuzzify(3);  // 2 units left of center
    var sum = rightPoint + leftPoint;
    assert(Math.abs(sum - 1) < 0.0000001, `Sum ${sum} should be approximately 1`);
  });
});