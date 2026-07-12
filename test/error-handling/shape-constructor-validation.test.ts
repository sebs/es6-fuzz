'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import { Triangle } from '../../lib/curve/triangle';
import { Trapezoid } from '../../lib/curve/trapezoid';
import { Grade } from '../../lib/curve/grade';
import { ReverseGrade } from '../../lib/curve/reverse-grade';
import { Sigmoid } from '../../lib/curve/sigmoid';

describe('Shape constructor validation', function() {
  describe('NaN parameters are rejected', function() {
    it('should throw when Triangle has NaN in x0', function() {
      assert.throws(() => new Triangle(NaN, 5, 10), /Triangle requires finite coordinates/);
    });

    it('should throw when Trapezoid has NaN in x1', function() {
      assert.throws(() => new Trapezoid(0, NaN, 10, 15), /Trapezoid requires finite coordinates/);
    });

    it('should throw when Grade has NaN in x0', function() {
      assert.throws(() => new Grade(NaN, 10), /Grade requires finite coordinates/);
    });
  });

  describe('Infinity parameters are rejected', function() {
    it('should throw when Triangle has Infinity in x2', function() {
      assert.throws(() => new Triangle(0, 10, Infinity), /Triangle requires finite coordinates/);
    });

    it('should throw when Grade has Infinity in x1', function() {
      assert.throws(() => new Grade(0, Infinity), /Grade requires finite coordinates/);
    });

    it('should throw when ReverseGrade has -Infinity in x0', function() {
      assert.throws(() => new ReverseGrade(-Infinity, 10), /ReverseGrade requires finite coordinates/);
    });

    it('should throw when Trapezoid has Infinity in x3', function() {
      assert.throws(() => new Trapezoid(0, 10, 20, Infinity), /Trapezoid requires finite coordinates/);
    });
  });

  describe('undefined parameters with defaults', function() {
    it('should use default parameters for Sigmoid', function() {
      const sigmoid = new Sigmoid();
      assert.equal(sigmoid.fuzzify(0), 0.5);
    });
  });
});