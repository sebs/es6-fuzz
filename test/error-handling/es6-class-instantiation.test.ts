'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import Logic from '../../lib/logic';
import Triangle from '../../lib/curve/triangle';
import Trapezoid from '../../lib/curve/trapezoid';
import Grade from '../../lib/curve/grade';
import ReverseGrade from '../../lib/curve/reverse-grade';
import Sigmoid from '../../lib/curve/sigmoid';
import Constant from '../../lib/curve/constant';
import FuzzyFunction from '../../lib/curve/fuzzy-function';
import Shape from '../../lib/curve/shape';

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