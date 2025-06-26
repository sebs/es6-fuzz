'use strict';
const { describe, it } = require('node:test');
const assert = require('assert');
const FuzzyFunction = require('../../lib/curve/fuzzy-function');

describe('FuzzyFunction edge cases', function() {
  describe('functions returning values outside [0,1]', function() {
    describe('function returning > 1 for x > 0.5', function() {
      const func1 = new FuzzyFunction(x => x * 2);
      
      it('should return valid value for x=0.3', function() {
        assert.equal(func1.fuzzify(0.3), 0.6);
      });
      
      it('should return exactly 1 for x=0.5', function() {
        assert.equal(func1.fuzzify(0.5), 1);
      });
      
      it('should throw error for x=0.7', function() {
        assert.throws(() => func1.fuzzify(0.7), /fuzzified result must be smaller than 1/);
      });
    });
    
    describe('function returning < 0 for x < 1', function() {
      const func2 = new FuzzyFunction(x => x - 1);
      
      it('should throw error for x=0.5', function() {
        assert.throws(() => func2.fuzzify(0.5), /fuzzified result must be smaller than 1/);
      });
      
      it('should return exactly 0 for x=1', function() {
        assert.equal(func2.fuzzify(1), 0);
      });
      
      it('should throw error for x=0.8', function() {
        assert.throws(() => func2.fuzzify(0.8), /fuzzified result must be smaller than 1/);
      });
    });
  });

  describe('complex mathematical functions', function() {
    const sinFunc = new FuzzyFunction(x => (Math.sin(x) + 1) / 2);
    
    it('should return 0.5 for x=0', function() {
      assert(sinFunc.fuzzify(0) === 0.5);
    });
    
    it('should return 1 for x=PI/2', function() {
      assert(sinFunc.fuzzify(Math.PI / 2) === 1);
    });
    
    it('should return 0 for x=3*PI/2', function() {
      assert(sinFunc.fuzzify(3 * Math.PI / 2) === 0);
    });
  });

  describe('functions that throw errors', function() {
    const errorFunc = new FuzzyFunction(x => {
      if (x < 0) throw new Error('Negative input');
      return x;
    });
    
    it('should return valid value for x=0.5', function() {
      assert.equal(errorFunc.fuzzify(0.5), 0.5);
    });
    
    it('should throw error for negative input', function() {
      assert.throws(() => errorFunc.fuzzify(-1), /Negative input/);
    });
  });
});