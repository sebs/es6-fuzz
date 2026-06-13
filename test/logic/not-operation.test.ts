'use strict';
import { describe, it  } from 'node:test';
import { Logic } from '../../lib/logic';
import { Triangle } from '../../lib/curve/triangle';
import assert from 'assert';

describe('Not!', () => {
  it('selects the negated output when the base shape has low membership', function() {
    const rageRange = new Triangle(0, 20, 40);
    const logic = new Logic();
    const res = logic
      .init('rage', rageRange)
      .not('norage', rageRange)
      .defuzzify(0); // rage = 0 here, so NOT rage = 1
    assert.equal(res.toString(), 'norage');
    assert.equal(res.fuzzified, 1);
  });

  it('selects the base output when its membership is high', function() {
    const rageRange = new Triangle(0, 20, 40);
    const logic = new Logic();
    const res = logic
      .init('rage', rageRange)
      .not('norage', rageRange)
      .defuzzify(20); // rage = 1, so NOT rage = 0
    assert.equal(res.toString(), 'rage');
  });
});
