'use strict';
const { describe, it } = require('node:test');
const assert = require('assert');
const Trapezoid = require('../../lib/curve/trapezoid');

describe('Trapezoid special cases', function() {
  describe('square trapezoid (x1=x2)', function() {
    const trapezoid = new Trapezoid(0, 5, 5, 10);
    
    it('should return 0 for value before x0', function() {
      assert.equal(trapezoid.fuzzify(-1), 0);
    });
    
    it('should return 0 for value at x0', function() {
      assert.equal(trapezoid.fuzzify(0), 0);
    });
    
    it('should return 0.5 for value at midpoint of left slope', function() {
      assert.equal(trapezoid.fuzzify(2.5), 0.5);
    });
    
    it('should return 1 for value at x1=x2', function() {
      assert.equal(trapezoid.fuzzify(5), 1);
    });
    
    it('should return 0.5 for value at midpoint of right slope', function() {
      assert.equal(trapezoid.fuzzify(7.5), 0.5);
    });
    
    it('should return 0 for value at x3', function() {
      assert.equal(trapezoid.fuzzify(10), 0);
    });
    
    it('should return 0 for value after x3', function() {
      assert.equal(trapezoid.fuzzify(11), 0);
    });
  });

  describe('degenerate trapezoid (x0=x1 and x2=x3)', function() {
    const trapezoid = new Trapezoid(5, 5, 10, 10);
    
    it('should return 0 for value before x0', function() {
      assert.equal(trapezoid.fuzzify(4.9), 0);
    });
    
    it('should return 1 for value at x0=x1', function() {
      assert.equal(trapezoid.fuzzify(5), 1);
    });
    
    it('should return 1 for value in middle', function() {
      assert.equal(trapezoid.fuzzify(7.5), 1);
    });
    
    it('should return 1 for value at x2=x3', function() {
      assert.equal(trapezoid.fuzzify(10), 1);
    });
    
    it('should return 0 for value after x3', function() {
      assert.equal(trapezoid.fuzzify(10.1), 0);
    });
  });

  describe('very narrow trapezoid (x1 and x2 very close)', function() {
    const trapezoid = new Trapezoid(0, 4.999, 5.001, 10);
    
    it('should return 1 for value at center', function() {
      assert.equal(trapezoid.fuzzify(5), 1);
    });
    
    it('should return approximately 1 for value at x1', function() {
      assert(Math.abs(trapezoid.fuzzify(4.999) - 1) < 0.01);
    });
    
    it('should return approximately 1 for value at x2', function() {
      assert(Math.abs(trapezoid.fuzzify(5.001) - 1) < 0.01);
    });
  });

  describe('all points equal (degenerate to point)', function() {
    const trapezoid = new Trapezoid(5, 5, 5, 5);
    
    it('should return 0 for value before the point', function() {
      assert.equal(trapezoid.fuzzify(4.9), 0);
    });
    
    it('should return 1 for value at the point', function() {
      assert.equal(trapezoid.fuzzify(5), 1);
    });
    
    it('should return 0 for value after the point', function() {
      assert.equal(trapezoid.fuzzify(5.1), 0);
    });
  });
});