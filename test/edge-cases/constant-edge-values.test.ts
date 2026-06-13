'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import { Constant } from '../../lib/curve/constant';

describe('Constant edge values', function() {
  describe('valid constant values (0..1)', function() {
    it('should return 0 for constant value 0', function() {
      assert.equal(new Constant(0).fuzzify(), 0);
    });

    it('should return 0.5 for constant value 0.5', function() {
      assert.equal(new Constant(0.5).fuzzify(), 0.5);
    });

    it('should return 1 for constant value 1', function() {
      assert.equal(new Constant(1).fuzzify(), 1);
    });
  });

  describe('out-of-range constant values are rejected', function() {
    it('should throw for constant value -1', function() {
      assert.throws(() => new Constant(-1), /Constant value must be between 0 and 1/);
    });

    it('should throw for constant value 2', function() {
      assert.throws(() => new Constant(2), /Constant value must be between 0 and 1/);
    });

    it('should throw for constant value -0.5', function() {
      assert.throws(() => new Constant(-0.5), /Constant value must be between 0 and 1/);
    });

    it('should throw for constant value 1.5', function() {
      assert.throws(() => new Constant(1.5), /Constant value must be between 0 and 1/);
    });
  });

  describe('ignoring x parameter in fuzzify', function() {
    const constant = new Constant(0.7);
    
    it('should return constant value for x=0', function() {
      assert.equal(constant.fuzzify(0), 0.7);
    });
    
    it('should return constant value for x=100', function() {
      assert.equal(constant.fuzzify(100), 0.7);
    });
    
    it('should return constant value for x=-100', function() {
      assert.equal(constant.fuzzify(-100), 0.7);
    });
    
    it('should return constant value for x=Infinity', function() {
      assert.equal(constant.fuzzify(Infinity), 0.7);
    });
  });
});