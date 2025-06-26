'use strict';
const { describe, it } = require('node:test');
const assert = require('assert');
const Logic = require('../../lib/logic');
const Triangle = require('../../lib/curve/triangle');
const Trapezoid = require('../../lib/curve/trapezoid');
const Grade = require('../../lib/curve/grade');
const ReverseGrade = require('../../lib/curve/reverse-grade');
const Sigmoid = require('../../lib/curve/sigmoid');
const Constant = require('../../lib/curve/constant');
const FuzzyFunction = require('../../lib/curve/fuzzy-function');
const Shape = require('../../lib/curve/shape');

describe('ES6 class instantiation', function() {
  describe('shapes without new keyword', function() {
    it('should throw error when calling Triangle without new', function() {
      assert.throws(() => Triangle(0, 5, 10), /Class constructor .* cannot be invoked without 'new'/);
    });
    
    it('should throw error when calling Trapezoid without new', function() {
      assert.throws(() => Trapezoid(0, 5, 10, 15), /Class constructor .* cannot be invoked without 'new'/);
    });
    
    it('should throw error when calling Grade without new', function() {
      assert.throws(() => Grade(0, 10), /Class constructor .* cannot be invoked without 'new'/);
    });
    
    it('should throw error when calling ReverseGrade without new', function() {
      assert.throws(() => ReverseGrade(0, 10), /Class constructor .* cannot be invoked without 'new'/);
    });
    
    it('should throw error when calling Sigmoid without new', function() {
      assert.throws(() => Sigmoid(5, 1), /Class constructor .* cannot be invoked without 'new'/);
    });
    
    it('should throw error when calling Constant without new', function() {
      assert.throws(() => Constant(0.5), /Class constructor .* cannot be invoked without 'new'/);
    });
    
    it('should throw error when calling Shape without new', function() {
      assert.throws(() => Shape(0, 5, 10, 15), /Class constructor .* cannot be invoked without 'new'/);
    });
    
    it('should throw error when calling FuzzyFunction without new', function() {
      assert.throws(() => FuzzyFunction(x => x), /Class constructor .* cannot be invoked without 'new'/);
    });
    
    it('should throw error when calling Logic without new', function() {
      assert.throws(() => Logic(), /Class constructor .* cannot be invoked without 'new'/);
    });
  });
});