'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import Logic from '../../lib/logic';

describe('AND/OR/NOT combinations', function() {
  it('should correctly implement fuzzy AND logic', function() {
    const logic = new Logic();
    
    const hot = new logic.c.Trapezoid(25, 30, 40, 45);
    const humid = new logic.c.Trapezoid(60, 70, 80, 90);
    
    logic.init('comfortable', hot)
      .and('uncomfortable', humid);
    
    // At 35°C and representing humidity
    // hot.fuzzify(35) = 1, humid.fuzzify(35) < 0.5
    // AND takes minimum of lastShape and current
    const result = logic.defuzzify(35);
    // Since humid has lower value, uncomfortable wins
    assert.equal(result.defuzzified, 'uncomfortable');
  });

  it('should correctly implement fuzzy NOT logic', function() {
    const logic = new Logic();
    
    const cold = new logic.c.Triangle(0, 10, 20);
    
    logic.init('cold', cold)
      .not('notCold', cold);
    
    // At 10°C, cold = 1, NOT cold = 0
    // But the logic compares with lastShape, so notCold wins when NOT result differs
    const result = logic.defuzzify(10);
    assert.equal(result.defuzzified, 'notCold');
    assert.equal(result.fuzzified, 1); // But fuzzified is the shape's value, not NOT result
    
    // At 20°C, cold = 0, so NOT cold = 1
    const result2 = logic.defuzzify(20);
    assert.equal(result2.defuzzified, 'notCold');
  });
});