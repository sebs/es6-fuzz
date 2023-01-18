'use strict';
const Trapezoid = require('../lib/curve/trapezoid');
const assert = require('assert');

describe('Trapezoid', function() {
  it('is a function', function() {
    assert.equal(typeof Trapezoid, 'function');
  });
  it('can create a new instance', function() {
    var trapez = new Trapezoid(0, 10, 20);
    assert.equal(trapez.x0, 0);
    assert.equal(trapez.x1, 10);
    assert.equal(trapez.x2, 20);
  });
  it('fuzzify', function() {
    var trapez = new Trapezoid(20, 30, 90);
    var res = trapez.fuzzify(25);
    assert.equal(res, 0.5);
  });
  it('avoid NaN if going over max', function() {
    var trapez = new Trapezoid(20, 30, 90, 100);
    var res = trapez.fuzzify(99);
    assert.equal(res, 0.09999999999999964);
  });

  it('edge case triangle', function() {
    var trapez = new Trapezoid(0, 0, 1.5, 2.5);
    var res = trapez.fuzzify(0);
    assert.equal(res, 0);
  });

  it('edge case triangle right bounds', function() {
    var trapez = new Trapezoid(0, 0, 1.5, 2.5);
    var res = trapez.fuzzify(2.5);
    assert.equal(res, 0);
  });
  
  it('edge case triangle right top', function() {
    var trapez = new Trapezoid(0, 0, 1.5, 2.5);
    var res = trapez.fuzzify(1.5);
    assert.equal(res, 1);
  });
  

  describe('bounds', ()=>{
    it('trapezoid left bounds 0', function() {
      var trapez = new Trapezoid(20, 30, 90, 100);
      var res = trapez.fuzzify(20);
      assert.equal(res, 0);
    });
  
    it('trapezoid right bounds 0', function() {
      var trapez = new Trapezoid(20, 30, 90, 100);
      var res = trapez.fuzzify(100);
      assert.equal(res, 0);
    });
    
    it('trapezoid left top = 1', function() {
      var trapez = new Trapezoid(20, 30, 90, 100);
      var res = trapez.fuzzify(30);
      assert.equal(res, 1);
    });
    
    it('trapezoid right top = 1', function() {
      var trapez = new Trapezoid(20, 30, 90, 100);
      var res = trapez.fuzzify(90);
      assert.equal(res, 1);
    });
  });
});