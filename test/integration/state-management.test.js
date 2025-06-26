'use strict';
const { describe, it } = require('node:test');
const assert = require('assert');
const Logic = require('../../lib/logic');

describe('Memory and state management', function() {
  it('should handle multiple Logic instances independently', function() {
    const logic1 = new Logic();
    const logic2 = new Logic();
    
    const shape1 = new logic1.c.Triangle(0, 5, 10);
    const shape2 = new logic2.c.Triangle(10, 15, 20);
    
    logic1.init('low', shape1);
    logic2.init('high', shape2);
    
    // Each should work independently
    assert.equal(logic1.defuzzify(5).defuzzified, 'low');
    assert.equal(logic2.defuzzify(15).defuzzified, 'high');
    
    // Verify they have separate rules
    assert.equal(logic1.rules.length, 1);
    assert.equal(logic2.rules.length, 1);
    assert.notEqual(logic1.rules[0], logic2.rules[0]);
  });

  it('should allow reuse after defuzzify', function() {
    const logic = new Logic();
    const triangle = new logic.c.Triangle(0, 5, 10);
    
    logic.init('test', triangle);
    
    // Multiple defuzzify calls
    const result1 = logic.defuzzify(5);
    const result2 = logic.defuzzify(5);
    const result3 = logic.defuzzify(5);
    
    // All should give same result
    assert.equal(result1.fuzzified, 1);
    assert.equal(result2.fuzzified, 1);
    assert.equal(result3.fuzzified, 1);
    
    // Can add more rules after defuzzify
    logic.or('testB', new logic.c.Triangle(10, 15, 20));
    assert.equal(logic.rules.length, 2);
  });
});