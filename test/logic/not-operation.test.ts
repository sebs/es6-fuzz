'use strict';
import { describe, it  } from 'node:test';
import Logic from '../../lib/logic';
import Triangle from '../../lib/curve/triangle';
import assert from 'assert';

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