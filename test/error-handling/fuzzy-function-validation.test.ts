'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import FuzzyFunction from '../../lib/curve/fuzzy-function';

describe('FuzzyFunction validation', function() {
  describe('invalid callback types', function() {
    it('should throw TypeError when callback is string', function() {
      assert.throws(() => {
        const func = new FuzzyFunction('not a function');
        func.fuzzify(5);
      }, TypeError);
    });

    it('should throw TypeError when callback is null', function() {
      assert.throws(() => {
        const func = new FuzzyFunction(null);
        func.fuzzify(5);
      }, TypeError);
    });

    it('should throw TypeError when callback is undefined', function() {
      assert.throws(() => {
        const func = new FuzzyFunction(undefined);
        func.fuzzify(5);
      }, TypeError);
    });
  });

  describe('callback returns non-number types', function() {
    it('should throw error when callback returns string', function() {
      const func = new FuzzyFunction(() => 'string');
      assert.throws(() => func.fuzzify(5), /fuzzified result must be smaller than 1/);
    });
    
    it('should return null when callback returns null', function() {
      const func = new FuzzyFunction(() => null);
      assert.equal(func.fuzzify(5), null);
    });
    
    it('should throw error when callback returns undefined', function() {
      const func = new FuzzyFunction(() => undefined);
      assert.throws(() => func.fuzzify(5), /fuzzified result must be smaller than 1/);
    });
  });

  describe('callback with conditional returns', function() {
    const func = new FuzzyFunction(x => {
      if (x < 0) return -1; // Invalid
      if (x > 1) return 2; // Invalid
      return x; // Valid for [0,1]
    });
    
    it('should return valid value for input 0.5', function() {
      assert.equal(func.fuzzify(0.5), 0.5);
    });
    
    it('should throw error for negative input', function() {
      assert.throws(() => func.fuzzify(-1), /fuzzified result must be smaller than 1/);
    });
    
    it('should throw error for input greater than 1', function() {
      assert.throws(() => func.fuzzify(2), /fuzzified result must be smaller than 1/);
    });
  });
});