'use strict';
const { describe, it } = require('node:test');
const assert = require('assert');
const Grade = require('../../lib/curve/grade');

describe('Grade edge cases', function() {
  describe('vertical grade (x0=x1)', function() {
    const grade = new Grade(5, 5);
    
    it('should return 0 for value before x0', function() {
      assert.equal(grade.fuzzify(4.9), 0);
    });
    
    it('should return 1 for value at x0=x1', function() {
      assert.equal(grade.fuzzify(5), 1);
    });
    
    it('should return 1 for value after x1', function() {
      assert.equal(grade.fuzzify(5.1), 1);
    });
    
    it('should return 1 for very large value', function() {
      assert.equal(grade.fuzzify(100), 1);
    });
  });

  describe('very steep grade', function() {
    const grade = new Grade(5, 5.0001);
    
    it('should return 0 for value before x0', function() {
      assert.equal(grade.fuzzify(4.9), 0);
    });
    
    it('should return greater than 0.4 for value at midpoint', function() {
      assert(grade.fuzzify(5.00005) > 0.4);
    });
    
    it('should return 1 for value well after x1', function() {
      assert.equal(grade.fuzzify(5.1), 1);
    });
  });
});