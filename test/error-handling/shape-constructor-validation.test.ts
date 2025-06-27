'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import { Triangle } from '../../lib/curve/triangle';
import { Trapezoid } from '../../lib/curve/trapezoid';
import { Grade } from '../../lib/curve/grade';
import { Sigmoid } from '../../lib/curve/sigmoid';

describe('Shape constructor validation', function() {
  describe('NaN parameters', function() {
    it('should return number when Triangle has NaN in x0', function() {
      const triangle = new Triangle(NaN, 5, 10);
      const result = triangle.fuzzify(5);
      assert(typeof result === 'number');
    });
    
    it('should return number when Trapezoid has NaN in x1', function() {
      const trapezoid = new Trapezoid(0, NaN, 10, 15);
      const result = trapezoid.fuzzify(5);
      assert(typeof result === 'number');
    });
    
    it('should return number when Grade has NaN in x0', function() {
      const grade = new Grade(NaN, 10);
      const result = grade.fuzzify(5);
      assert(typeof result === 'number');
    });
  });

  describe('Infinity parameters', function() {
    describe('Triangle with Infinity in x2', function() {
      const triangle = new Triangle(0, 10, Infinity);
      
      it('should return 0 for value at x0', function() {
        assert.equal(triangle.fuzzify(0), 0);
      });
      
      it('should return 1 for value at x1', function() {
        assert.equal(triangle.fuzzify(10), 1);
      });
      
      it('should return NaN for value beyond x1', function() {
        assert(isNaN(triangle.fuzzify(20)));
      });
    });
    
    describe('Grade with Infinity in x1', function() {
      const grade = new Grade(0, Infinity);
      
      it('should return 0 for value at x0', function() {
        assert.equal(grade.fuzzify(0), 0);
      });
      
      it('should return 0 for large finite value', function() {
        assert.equal(grade.fuzzify(1000), 0);
      });
      
      it('should return 1 for Infinity value', function() {
        assert.equal(grade.fuzzify(Infinity), 1);
      });
    });
  });

  describe('undefined parameters with defaults', function() {
    it('should use default parameters for Sigmoid', function() {
      const sigmoid = new Sigmoid();
      assert.equal(sigmoid.fuzzify(0), 0.5);
    });
  });
});