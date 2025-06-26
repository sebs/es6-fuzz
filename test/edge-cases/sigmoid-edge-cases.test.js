'use strict';
const { describe, it } = require('node:test');
const assert = require('assert');
const Sigmoid = require('../../lib/curve/sigmoid');

describe('Sigmoid edge cases', function() {
  describe('zero slope (becomes step function)', function() {
    const sigmoid = new Sigmoid(5, 0);
    
    it('should return 0 for value before center', function() {
      assert.equal(sigmoid.fuzzify(4.9), 0);
    });
    
    it('should return 0.5 for value at center', function() {
      assert.equal(sigmoid.fuzzify(5), 0.5);
    });
    
    it('should return 1 for value after center', function() {
      assert.equal(sigmoid.fuzzify(5.1), 1);
    });
  });

  describe('very small slope (near step function)', function() {
    const sigmoid = new Sigmoid(5, 0.0001);
    
    it('should return near 0 for value slightly before center', function() {
      assert(sigmoid.fuzzify(4.99) < 0.01);
    });
    
    it('should return 0.5 for value at center', function() {
      assert(sigmoid.fuzzify(5) === 0.5);
    });
    
    it('should return near 1 for value slightly after center', function() {
      assert(sigmoid.fuzzify(5.01) > 0.99);
    });
  });

  describe('very large slope (near constant 0.5)', function() {
    const sigmoid = new Sigmoid(5, 10000);
    
    it('should return approximately 0.5 for value far left', function() {
      assert(Math.abs(sigmoid.fuzzify(0) - 0.5) < 0.1);
    });
    
    it('should return 0.5 for value at center', function() {
      assert(sigmoid.fuzzify(5) === 0.5);
    });
    
    it('should return approximately 0.5 for value far right', function() {
      assert(Math.abs(sigmoid.fuzzify(10) - 0.5) < 0.1);
    });
  });

  describe('negative slope', function() {
    const sigmoid = new Sigmoid(5, -1);
    
    it('should return greater than 0.5 for value before center', function() {
      assert(sigmoid.fuzzify(3) > 0.5);
    });
    
    it('should return 0.5 for value at center', function() {
      assert(sigmoid.fuzzify(5) === 0.5);
    });
    
    it('should return less than 0.5 for value after center', function() {
      assert(sigmoid.fuzzify(7) < 0.5);
    });
  });
});