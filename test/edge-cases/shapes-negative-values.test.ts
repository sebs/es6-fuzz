'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import Triangle from '../../lib/curve/triangle';
import Trapezoid from '../../lib/curve/trapezoid';

describe('Shapes with negative x values', function() {
  describe('triangle with negative x values', function() {
    const triangle = new Triangle(-10, -5, 0);
    
    it('should return 0 for value far before x0', function() {
      assert.equal(triangle.fuzzify(-15), 0);
    });
    
    it('should return 0 for value at x0', function() {
      assert.equal(triangle.fuzzify(-10), 0);
    });
    
    it('should return 0.5 for value at midpoint of left slope', function() {
      assert.equal(triangle.fuzzify(-7.5), 0.5);
    });
    
    it('should return 1 for value at x1', function() {
      assert.equal(triangle.fuzzify(-5), 1);
    });
    
    it('should return 0.5 for value at midpoint of right slope', function() {
      assert.equal(triangle.fuzzify(-2.5), 0.5);
    });
    
    it('should return 0 for value at x2', function() {
      assert.equal(triangle.fuzzify(0), 0);
    });
    
    it('should return 0 for value after x2', function() {
      assert.equal(triangle.fuzzify(5), 0);
    });
  });

  describe('trapezoid with negative x values', function() {
    const trapezoid = new Trapezoid(-20, -15, -5, 0);
    
    it('should return 0 for value before x0', function() {
      assert.equal(trapezoid.fuzzify(-25), 0);
    });
    
    it('should return 0 for value at x0', function() {
      assert.equal(trapezoid.fuzzify(-20), 0);
    });
    
    it('should return 0.5 for value at midpoint of left slope', function() {
      assert.equal(trapezoid.fuzzify(-17.5), 0.5);
    });
    
    it('should return 1 for value at x1', function() {
      assert.equal(trapezoid.fuzzify(-15), 1);
    });
    
    it('should return 1 for value in middle plateau', function() {
      assert.equal(trapezoid.fuzzify(-10), 1);
    });
    
    it('should return 1 for value at x2', function() {
      assert.equal(trapezoid.fuzzify(-5), 1);
    });
    
    it('should return 0.5 for value at midpoint of right slope', function() {
      assert.equal(trapezoid.fuzzify(-2.5), 0.5);
    });
    
    it('should return 0 for value at x3', function() {
      assert.equal(trapezoid.fuzzify(0), 0);
    });
  });
});