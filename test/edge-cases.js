'use strict';
const { describe, it } = require('node:test');
const assert = require('assert');
const Triangle = require('../lib/curve/triangle');
const Trapezoid = require('../lib/curve/trapezoid');
const Grade = require('../lib/curve/grade');
const ReverseGrade = require('../lib/curve/reverse-grade');
const Sigmoid = require('../lib/curve/sigmoid');
const Constant = require('../lib/curve/constant');
const FuzzyFunction = require('../lib/curve/fuzzy-function');

describe('Edge Cases', function() {
  describe('Triangle degenerate cases', function() {
    it('should handle triangle with all points equal (x0=x1=x2)', function() {
      const triangle = new Triangle(5, 5, 5);
      assert.equal(triangle.fuzzify(4.9), 0);
      assert.equal(triangle.fuzzify(5), 1);
      assert.equal(triangle.fuzzify(5.1), 0);
    });

    it('should handle triangle with x0=x1 (right angle left)', function() {
      const triangle = new Triangle(5, 5, 10);
      assert.equal(triangle.fuzzify(4.9), 0);
      assert.equal(triangle.fuzzify(5), 1);
      assert.equal(triangle.fuzzify(7.5), 0.5);
      assert.equal(triangle.fuzzify(10), 0);
    });

    it('should handle triangle with x1=x2 (right angle right)', function() {
      const triangle = new Triangle(0, 5, 5);
      assert.equal(triangle.fuzzify(0), 0);
      assert.equal(triangle.fuzzify(2.5), 0.5);
      assert.equal(triangle.fuzzify(5), 1);
      assert.equal(triangle.fuzzify(5.1), 0);
    });
  });

  describe('Trapezoid special cases', function() {
    it('should handle square trapezoid (x1=x2)', function() {
      const trapezoid = new Trapezoid(0, 5, 5, 10);
      assert.equal(trapezoid.fuzzify(-1), 0);
      assert.equal(trapezoid.fuzzify(0), 0);
      assert.equal(trapezoid.fuzzify(2.5), 0.5);
      assert.equal(trapezoid.fuzzify(5), 1);
      assert.equal(trapezoid.fuzzify(7.5), 0.5);
      assert.equal(trapezoid.fuzzify(10), 0);
      assert.equal(trapezoid.fuzzify(11), 0);
    });

    it('should handle degenerate trapezoid (x0=x1 and x2=x3)', function() {
      const trapezoid = new Trapezoid(5, 5, 10, 10);
      assert.equal(trapezoid.fuzzify(4.9), 0);
      assert.equal(trapezoid.fuzzify(5), 1);
      assert.equal(trapezoid.fuzzify(7.5), 1);
      assert.equal(trapezoid.fuzzify(10), 1);
      assert.equal(trapezoid.fuzzify(10.1), 0);
    });

    it('should handle very narrow trapezoid (x1 and x2 very close)', function() {
      const trapezoid = new Trapezoid(0, 4.999, 5.001, 10);
      assert.equal(trapezoid.fuzzify(5), 1);
      assert(Math.abs(trapezoid.fuzzify(4.999) - 1) < 0.01);
      assert(Math.abs(trapezoid.fuzzify(5.001) - 1) < 0.01);
    });

    it('should handle all points equal (degenerate to point)', function() {
      const trapezoid = new Trapezoid(5, 5, 5, 5);
      assert.equal(trapezoid.fuzzify(4.9), 0);
      assert.equal(trapezoid.fuzzify(5), 1);
      assert.equal(trapezoid.fuzzify(5.1), 0);
    });
  });

  describe('Grade edge cases', function() {
    it('should handle vertical grade (x0=x1)', function() {
      const grade = new Grade(5, 5);
      assert.equal(grade.fuzzify(4.9), 0);
      assert.equal(grade.fuzzify(5), 1);
      assert.equal(grade.fuzzify(5.1), 1);
      assert.equal(grade.fuzzify(100), 1);
    });

    it('should handle very steep grade', function() {
      const grade = new Grade(5, 5.0001);
      assert.equal(grade.fuzzify(4.9), 0);
      assert(grade.fuzzify(5.00005) > 0.4);
      assert.equal(grade.fuzzify(5.1), 1);
    });
  });

  describe('ReverseGrade edge cases', function() {
    it('should handle vertical reverse grade (x0=x1)', function() {
      const reverseGrade = new ReverseGrade(5, 5);
      assert.equal(reverseGrade.fuzzify(4.9), 1);
      assert.equal(reverseGrade.fuzzify(5), 1);
      assert.equal(reverseGrade.fuzzify(5.1), 0);
      assert.equal(reverseGrade.fuzzify(100), 0);
    });

    it('should handle very steep reverse grade', function() {
      const reverseGrade = new ReverseGrade(5, 5.0001);
      assert.equal(reverseGrade.fuzzify(4.9), 1);
      assert(reverseGrade.fuzzify(5.00005) < 0.6);
      assert.equal(reverseGrade.fuzzify(5.1), 0);
    });
  });

  describe('Sigmoid edge cases', function() {
    it('should handle zero slope (becomes step function)', function() {
      const sigmoid = new Sigmoid(5, 0);
      // With zero slope, sigmoid becomes a step function
      assert.equal(sigmoid.fuzzify(4.9), 0);
      assert.equal(sigmoid.fuzzify(5), 0.5);
      assert.equal(sigmoid.fuzzify(5.1), 1);
    });

    it('should handle very small slope (near step function)', function() {
      const sigmoid = new Sigmoid(5, 0.0001);
      assert(sigmoid.fuzzify(4.99) < 0.01);
      assert(sigmoid.fuzzify(5) === 0.5);
      assert(sigmoid.fuzzify(5.01) > 0.99);
    });

    it('should handle very large slope (near constant 0.5)', function() {
      const sigmoid = new Sigmoid(5, 10000);
      assert(Math.abs(sigmoid.fuzzify(0) - 0.5) < 0.1);
      assert(sigmoid.fuzzify(5) === 0.5);
      assert(Math.abs(sigmoid.fuzzify(10) - 0.5) < 0.1);
    });

    it('should handle negative slope', function() {
      const sigmoid = new Sigmoid(5, -1);
      // Negative slope reverses the sigmoid
      assert(sigmoid.fuzzify(3) > 0.5);
      assert(sigmoid.fuzzify(5) === 0.5);
      assert(sigmoid.fuzzify(7) < 0.5);
    });
  });

  describe('Shapes with negative x values', function() {
    it('should handle triangle with negative x values', function() {
      const triangle = new Triangle(-10, -5, 0);
      assert.equal(triangle.fuzzify(-15), 0);
      assert.equal(triangle.fuzzify(-10), 0);
      assert.equal(triangle.fuzzify(-7.5), 0.5);
      assert.equal(triangle.fuzzify(-5), 1);
      assert.equal(triangle.fuzzify(-2.5), 0.5);
      assert.equal(triangle.fuzzify(0), 0);
      assert.equal(triangle.fuzzify(5), 0);
    });

    it('should handle trapezoid with negative x values', function() {
      const trapezoid = new Trapezoid(-20, -15, -5, 0);
      assert.equal(trapezoid.fuzzify(-25), 0);
      assert.equal(trapezoid.fuzzify(-20), 0);
      assert.equal(trapezoid.fuzzify(-17.5), 0.5);
      assert.equal(trapezoid.fuzzify(-15), 1);
      assert.equal(trapezoid.fuzzify(-10), 1);
      assert.equal(trapezoid.fuzzify(-5), 1);
      assert.equal(trapezoid.fuzzify(-2.5), 0.5);
      assert.equal(trapezoid.fuzzify(0), 0);
    });
  });

  describe('Shapes with very large x values', function() {
    it('should handle Infinity gracefully', function() {
      const triangle = new Triangle(0, 10, 20);
      const trapezoid = new Trapezoid(0, 10, 20, 30);
      const grade = new Grade(0, 10);
      const reverseGrade = new ReverseGrade(0, 10);
      const sigmoid = new Sigmoid(10, 1);

      assert.equal(triangle.fuzzify(Infinity), 0);
      assert.equal(triangle.fuzzify(-Infinity), 0);
      assert.equal(trapezoid.fuzzify(Infinity), 0);
      assert.equal(trapezoid.fuzzify(-Infinity), 0);
      assert.equal(grade.fuzzify(Infinity), 1);
      assert.equal(grade.fuzzify(-Infinity), 0);
      assert.equal(reverseGrade.fuzzify(Infinity), 0);
      assert.equal(reverseGrade.fuzzify(-Infinity), 1);
      assert.equal(sigmoid.fuzzify(Infinity), 1);
      assert.equal(sigmoid.fuzzify(-Infinity), 0);
    });

    it('should handle very large numbers', function() {
      const triangle = new Triangle(0, 1e10, 2e10);
      assert.equal(triangle.fuzzify(0), 0);
      assert.equal(triangle.fuzzify(1e10), 1);
      assert.equal(triangle.fuzzify(2e10), 0);
      assert.equal(triangle.fuzzify(1.5e10), 0.5);
    });
  });

  describe('Constant edge values', function() {
    it('should handle all possible constant values', function() {
      assert.equal(new Constant(0).fuzzify(), 0);
      assert.equal(new Constant(0.5).fuzzify(), 0.5);
      assert.equal(new Constant(1).fuzzify(), 1);
      assert.equal(new Constant(-1).fuzzify(), -1);
      assert.equal(new Constant(2).fuzzify(), 2);
      assert.equal(new Constant(-0.5).fuzzify(), -0.5);
      assert.equal(new Constant(1.5).fuzzify(), 1.5);
    });

    it('should ignore x parameter in fuzzify', function() {
      const constant = new Constant(0.7);
      assert.equal(constant.fuzzify(0), 0.7);
      assert.equal(constant.fuzzify(100), 0.7);
      assert.equal(constant.fuzzify(-100), 0.7);
      assert.equal(constant.fuzzify(Infinity), 0.7);
    });
  });

  describe('FuzzyFunction edge cases', function() {
    it('should throw error for functions returning values outside [0,1]', function() {
      const func1 = new FuzzyFunction(x => x * 2); // Returns > 1 for x > 0.5
      assert.equal(func1.fuzzify(0.3), 0.6);
      assert.equal(func1.fuzzify(0.5), 1); // Exactly 1 is valid
      assert.throws(() => func1.fuzzify(0.7), /fuzzified result must be smaller than 1/);
      
      const func2 = new FuzzyFunction(x => x - 1); // Returns < 0 for x < 1
      assert.throws(() => func2.fuzzify(0.5), /fuzzified result must be smaller than 1/);
      assert.equal(func2.fuzzify(1), 0); // Exactly 0 is valid
      assert.throws(() => func2.fuzzify(0.8), /fuzzified result must be smaller than 1/);
    });

    it('should handle complex mathematical functions', function() {
      const sinFunc = new FuzzyFunction(x => (Math.sin(x) + 1) / 2);
      assert(sinFunc.fuzzify(0) === 0.5);
      assert(sinFunc.fuzzify(Math.PI / 2) === 1);
      assert(sinFunc.fuzzify(3 * Math.PI / 2) === 0);
    });

    it('should handle functions that throw errors', function() {
      const errorFunc = new FuzzyFunction(x => {
        if (x < 0) throw new Error('Negative input');
        return x;
      });
      
      assert.equal(errorFunc.fuzzify(0.5), 0.5);
      assert.throws(() => errorFunc.fuzzify(-1), /Negative input/);
    });
  });
});