'use strict';
const { describe, it } = require('node:test');
const assert = require('assert');
const Constant = require('../../lib/curve/constant');

describe('Constant edge values', function() {
  describe('all possible constant values', function() {
    it('should return 0 for constant value 0', function() {
      assert.equal(new Constant(0).fuzzify(), 0);
    });
    
    it('should return 0.5 for constant value 0.5', function() {
      assert.equal(new Constant(0.5).fuzzify(), 0.5);
    });
    
    it('should return 1 for constant value 1', function() {
      assert.equal(new Constant(1).fuzzify(), 1);
    });
    
    it('should return -1 for constant value -1', function() {
      assert.equal(new Constant(-1).fuzzify(), -1);
    });
    
    it('should return 2 for constant value 2', function() {
      assert.equal(new Constant(2).fuzzify(), 2);
    });
    
    it('should return -0.5 for constant value -0.5', function() {
      assert.equal(new Constant(-0.5).fuzzify(), -0.5);
    });
    
    it('should return 1.5 for constant value 1.5', function() {
      assert.equal(new Constant(1.5).fuzzify(), 1.5);
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