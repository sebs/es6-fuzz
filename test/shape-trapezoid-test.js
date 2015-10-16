import { Trapezoid } from '../lib/curve/trapezoid';
import assert from 'assert';

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
});
