'use strict';
import { describe, it  } from 'node:test';
import ReverseGrade from '../../lib/curve/reverse-grade';
import assert from 'assert';

describe('ReverseGrade', function() {
  it('is a function', function() {
    assert.equal(typeof ReverseGrade, 'function');
  });
  it('can create a new instance', function() {
    var reverseGrade = new ReverseGrade(0, 1);
    assert.ok(reverseGrade instanceof ReverseGrade);
  });
  it('sets x0 property correctly', function() {
    var reverseGrade = new ReverseGrade(0, 1);
    assert.equal(reverseGrade.x0, 0);
  });
  it('sets x1 property correctly', function() {
    var reverseGrade = new ReverseGrade(0, 1);
    assert.equal(reverseGrade.x1, 1);
  });
  it('fuzzify', function() {
    var reverseGrade = new ReverseGrade(0,10);
    var res = reverseGrade.fuzzify(5);
    assert.equal(res, 0.5);
  });
});
