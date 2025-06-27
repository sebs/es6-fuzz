'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import { Triangle } from '../../lib/curve/triangle';

describe('Triangle degenerate cases', function() {
  describe('triangle with all points equal (x0=x1=x2)', function() {
    const triangle = new Triangle(5, 5, 5);
    
    it('should return 0 for value before the point', function() {
      assert.equal(triangle.fuzzify(4.9), 0);
    });
    
    it('should return 1 for value at the point', function() {
      assert.equal(triangle.fuzzify(5), 1);
    });
    
    it('should return 0 for value after the point', function() {
      assert.equal(triangle.fuzzify(5.1), 0);
    });
  });

  describe('triangle with x0=x1 (right angle left)', function() {
    const triangle = new Triangle(5, 5, 10);
    
    it('should return 0 for value before x0', function() {
      assert.equal(triangle.fuzzify(4.9), 0);
    });
    
    it('should return 1 for value at x0=x1', function() {
      assert.equal(triangle.fuzzify(5), 1);
    });
    
    it('should return 0.5 for value at midpoint', function() {
      assert.equal(triangle.fuzzify(7.5), 0.5);
    });
    
    it('should return 0 for value at x2', function() {
      assert.equal(triangle.fuzzify(10), 0);
    });
  });

  describe('triangle with x1=x2 (right angle right)', function() {
    const triangle = new Triangle(0, 5, 5);
    
    it('should return 0 for value at x0', function() {
      assert.equal(triangle.fuzzify(0), 0);
    });
    
    it('should return 0.5 for value at midpoint', function() {
      assert.equal(triangle.fuzzify(2.5), 0.5);
    });
    
    it('should return 1 for value at x1=x2', function() {
      assert.equal(triangle.fuzzify(5), 1);
    });
    
    it('should return 0 for value after x2', function() {
      assert.equal(triangle.fuzzify(5.1), 0);
    });
  });
});