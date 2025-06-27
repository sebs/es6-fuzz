'use strict';
import { describe, it  } from 'node:test';
import { Sigmoid } from '../../../lib/curve/sigmoid';
import assert from 'assert';

describe('Sigmoid', function() {
  it('is a function', function() {
    assert.equal(typeof Sigmoid, 'function');
  });
  it('can create a new instance', function() {
    var sigmoid = new Sigmoid();
    var res = sigmoid.fuzzify(5);
    assert.equal(res, 0.9933071490757153);
  });

  it('0', function() {
    var sigmoid = new Sigmoid();
    var res = sigmoid.fuzzify(0);
    assert.equal(res, 0.5);
  });

  it('uses treshold', function() {
    var sigmoid = new Sigmoid(1);
    var res = sigmoid.fuzzify(1);
    assert.equal(res, 0.5);
  });
});