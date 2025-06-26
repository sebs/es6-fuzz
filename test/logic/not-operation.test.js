'use strict';
const { describe, it } = require('node:test');
const Logic = require('../../lib/logic');
const Triangle = require('../../lib/curve/triangle');
const assert = require('assert');

describe('Not!', () => {
  it('gets not', function() {
    var rageRange = new Triangle(0, 20, 40);
    var logic = new Logic();
    var res = logic
      .init('rage', rageRange)
      .not('norage', rageRange)
      .defuzzify(20);
    assert.equal(res.toString(), 'norage');
  });
});