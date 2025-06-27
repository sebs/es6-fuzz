'use strict';
import { describe, it  } from 'node:test';
import { Sigmoid } from '../../../lib/curve/sigmoid';
import assert from 'assert';

describe('slope', function() {
  it('slope makes actually a difference', function() {
    const fvalue = 10;
    var sigmoid = new Sigmoid(0, 10);
    var resSmall = sigmoid.fuzzify(fvalue);
    var sigmoid2 = new Sigmoid(0, 100000);
    var resBig = sigmoid2.fuzzify(fvalue);
    assert.notEqual(resSmall, resBig);
  });
});