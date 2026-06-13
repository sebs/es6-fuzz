'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import { Logic } from '../../lib/logic';

describe('AND/OR/NOT combinations', function() {
  it('should correctly implement fuzzy AND logic', function() {
    const logic = new Logic();

    // Two overlapping conditions so the conjunction (min) is meaningful
    const comfortable = new logic.c.Triangle(0, 10, 20);   // at 12 -> 0.8
    const muggy = new logic.c.Triangle(10, 20, 30);        // at 12 -> 0.2

    logic.init('comfortable', comfortable)
      .and('muggy', muggy);

    const result = logic.defuzzify(12);

    // comfortable membership = 0.8, muggy = min(0.8, 0.2) = 0.2
    // The output with the highest membership wins; AND no longer blindly
    // relabels the result to the second operand.
    assert.equal(result.defuzzified, 'comfortable');
    assert.equal(result.fuzzified, 0.8);

    // The AND rule's own membership reflects the conjunction (min), not the
    // raw shape value.
    assert.equal(result.rules[1].fuzzy, 0.2);
  });

  it('should correctly implement fuzzy NOT logic', function() {
    const logic = new Logic();

    const cold = new logic.c.Triangle(0, 10, 20);

    logic.init('cold', cold)
      .not('notCold', cold);

    // At 10°C cold is fully member (1), so NOT cold is 0 -> cold wins
    const result = logic.defuzzify(10);
    assert.equal(result.defuzzified, 'cold');
    assert.equal(result.fuzzified, 1);
    assert.equal(result.rules[1].fuzzy, 0); // NOT membership is 1 - cold

    // At 20°C cold is 0, so NOT cold is 1 -> notCold wins with strength 1
    const result2 = logic.defuzzify(20);
    assert.equal(result2.defuzzified, 'notCold');
    assert.equal(result2.fuzzified, 1);
  });
});
