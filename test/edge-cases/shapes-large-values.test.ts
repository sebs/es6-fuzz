'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import { Triangle } from '../../lib/curve/triangle';
import { Trapezoid } from '../../lib/curve/trapezoid';
import { Grade } from '../../lib/curve/grade';
import { ReverseGrade } from '../../lib/curve/reverse-grade';
import { Sigmoid } from '../../lib/curve/sigmoid';

describe('Shapes with very large x values', function() {
  describe('Infinity handling', function() {
    const triangle = new Triangle(0, 10, 20);
    const trapezoid = new Trapezoid(0, 10, 20, 30);
    const grade = new Grade(0, 10);
    const reverseGrade = new ReverseGrade(0, 10);
    const sigmoid = new Sigmoid(10, 1);
    
    it('should return 0 for triangle with positive Infinity', function() {
      assert.equal(triangle.fuzzify(Infinity), 0);
    });
    
    it('should return 0 for triangle with negative Infinity', function() {
      assert.equal(triangle.fuzzify(-Infinity), 0);
    });
    
    it('should return 0 for trapezoid with positive Infinity', function() {
      assert.equal(trapezoid.fuzzify(Infinity), 0);
    });
    
    it('should return 0 for trapezoid with negative Infinity', function() {
      assert.equal(trapezoid.fuzzify(-Infinity), 0);
    });
    
    it('should return 1 for grade with positive Infinity', function() {
      assert.equal(grade.fuzzify(Infinity), 1);
    });
    
    it('should return 0 for grade with negative Infinity', function() {
      assert.equal(grade.fuzzify(-Infinity), 0);
    });
    
    it('should return 0 for reverseGrade with positive Infinity', function() {
      assert.equal(reverseGrade.fuzzify(Infinity), 0);
    });
    
    it('should return 1 for reverseGrade with negative Infinity', function() {
      assert.equal(reverseGrade.fuzzify(-Infinity), 1);
    });
    
    it('should return 1 for sigmoid with positive Infinity', function() {
      assert.equal(sigmoid.fuzzify(Infinity), 1);
    });
    
    it('should return 0 for sigmoid with negative Infinity', function() {
      assert.equal(sigmoid.fuzzify(-Infinity), 0);
    });
  });

  describe('very large numbers', function() {
    const triangle = new Triangle(0, 1e10, 2e10);
    
    it('should return 0 for value at x0', function() {
      assert.equal(triangle.fuzzify(0), 0);
    });
    
    it('should return 1 for value at x1', function() {
      assert.equal(triangle.fuzzify(1e10), 1);
    });
    
    it('should return 0 for value at x2', function() {
      assert.equal(triangle.fuzzify(2e10), 0);
    });
    
    it('should return 0.5 for value at midpoint', function() {
      assert.equal(triangle.fuzzify(1.5e10), 0.5);
    });
  });
});