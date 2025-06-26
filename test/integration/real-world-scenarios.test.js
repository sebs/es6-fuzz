'use strict';
const { describe, it } = require('node:test');
const assert = require('assert');
const Logic = require('../../lib/logic');

describe('Complex real-world scenarios', function() {
  it('should model temperature and humidity comfort zones', function() {
    const logic = new Logic();
    
    // Temperature comfort zones
    const tooCold = new logic.c.ReverseGrade(10, 18);
    const comfortable = new logic.c.Trapezoid(16, 20, 24, 28);
    const tooHot = new logic.c.Grade(26, 35);
    
    // Combined logic
    logic.init('tooCold', tooCold)
      .or('comfortable', comfortable)
      .or('tooHot', tooHot);
    
    // Test various temperatures
    assert.equal(logic.defuzzify(5).defuzzified, 'tooCold');
    assert.equal(logic.defuzzify(22).defuzzified, 'comfortable');
    assert.equal(logic.defuzzify(30).defuzzified, 'tooHot');
    
    // Test boundary conditions
    const boundary1 = logic.defuzzify(18);
    assert(boundary1.fuzzified <= 0.5); // Transitioning from cold
    
    const boundary2 = logic.defuzzify(26);
    assert(boundary2.fuzzified >= 0.5); // Transitioning to hot
  });

  it('should model speed control with multiple factors', function() {
    const logic = new Logic();
    
    // Distance to obstacle
    const veryClose = new logic.c.ReverseGrade(0, 10);
    const close = new logic.c.Triangle(5, 20, 35);
    const safe = new logic.c.Grade(30, 50);
    
    logic.init('stop', veryClose)
      .or('slow', close)
      .or('normal', safe);
    
    // Test obstacle avoidance
    assert.equal(logic.defuzzify(5).defuzzified, 'stop');
    assert.equal(logic.defuzzify(20).defuzzified, 'slow');
    assert.equal(logic.defuzzify(50).defuzzified, 'normal');
  });
});