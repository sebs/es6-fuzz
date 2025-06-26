'use strict';
const { describe, it } = require('node:test');
const assert = require('assert');
const ReverseGrade = require('../../lib/curve/reverse-grade');

describe('ReverseGrade edge cases', function() {
  describe('vertical reverse grade (x0=x1)', function() {
    const reverseGrade = new ReverseGrade(5, 5);
    
    it('should return 1 for value before x0', function() {
      assert.equal(reverseGrade.fuzzify(4.9), 1);
    });
    
    it('should return 1 for value at x0=x1', function() {
      assert.equal(reverseGrade.fuzzify(5), 1);
    });
    
    it('should return 0 for value after x1', function() {
      assert.equal(reverseGrade.fuzzify(5.1), 0);
    });
    
    it('should return 0 for very large value', function() {
      assert.equal(reverseGrade.fuzzify(100), 0);
    });
  });

  describe('very steep reverse grade', function() {
    const reverseGrade = new ReverseGrade(5, 5.0001);
    
    it('should return 1 for value before x0', function() {
      assert.equal(reverseGrade.fuzzify(4.9), 1);
    });
    
    it('should return less than 0.6 for value at midpoint', function() {
      assert(reverseGrade.fuzzify(5.00005) < 0.6);
    });
    
    it('should return 0 for value well after x1', function() {
      assert.equal(reverseGrade.fuzzify(5.1), 0);
    });
  });
});