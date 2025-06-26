'use strict';
import { describe, it  } from 'node:test';
import Trapezoid from '../../../lib/curve/trapezoid';
import assert from 'assert';

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