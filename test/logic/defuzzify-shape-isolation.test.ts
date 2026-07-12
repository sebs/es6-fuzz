'use strict';
import { describe, it } from 'node:test';
import assert from 'assert';
import { Logic } from '../../lib/logic';
import { Grade } from '../../lib/curve/grade';

// findings.md F7: defuzzify() used to hand back a live reference to the engine's
// internal shape, so mutating result.rules[i].shape changed later evaluations.
describe('defuzzify shape isolation', function () {
  it('does not return the engine-internal shape reference', function () {
    const logic = new Logic();
    const shape = new Grade(0, 10);
    logic.init('a', shape);
    const result = logic.defuzzify(5);
    assert.notEqual(result.rules[0].shape, shape);
  });

  it('returns a frozen shape whose fuzzify still works', function () {
    const logic = new Logic();
    logic.init('a', new Grade(0, 10));
    const result = logic.defuzzify(5);
    assert.equal(Object.isFrozen(result.rules[0].shape), true);
    assert.equal(result.rules[0].shape.fuzzify(5), 0.5);
  });

  it('caller cannot corrupt the engine through the returned shape', function () {
    const logic = new Logic();
    const shape = { fuzzify: () => 0.5 };
    logic.init('a', shape);
    const result = logic.defuzzify(1);
    try {
      // Illegal on the frozen copy; must not reach the engine's internal shape.
      (result.rules[0].shape as { fuzzify: (v: number) => number }).fuzzify = () => 0.99;
    } catch {
      /* frozen copy rejects the write in strict mode */
    }
    assert.equal(logic.defuzzify(1).fuzzified, 0.5);
  });
});
