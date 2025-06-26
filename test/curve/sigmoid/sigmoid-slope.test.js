'use strict';
const { describe, it } = require('node:test');
const Sigmoid = require('../../../lib/curve/sigmoid');
const assert = require('assert');

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