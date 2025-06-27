'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import { Logic } from '../../lib/logic';

describe('Complex AND/OR/NOT chains', function() {
  it('should handle 5+ shapes in complex logic', function() {
    const logic = new Logic();
    
    // Temperature ranges
    const freezing = new logic.c.Trapezoid(-20, -10, 0, 5);
    const cold = new logic.c.Triangle(0, 10, 20);
    const comfortable = new logic.c.Trapezoid(15, 20, 25, 30);
    const warm = new logic.c.Triangle(25, 30, 35);
    const hot = new logic.c.Trapezoid(30, 35, 45, 50);
    
    // Complex logic: comfortable OR (cold AND NOT freezing) OR (warm AND NOT hot)
    logic.init('freezing', freezing)
      .or('cold', cold)
      .or('comfortable', comfortable)
      .or('warm', warm)
      .or('hot', hot);
    
    // Test various temperatures
    let result = logic.defuzzify(-15);
    assert.equal(result.defuzzified, 'freezing');
    
    result = logic.defuzzify(10);
    assert.equal(result.defuzzified, 'cold');
    
    result = logic.defuzzify(22.5);
    assert.equal(result.defuzzified, 'comfortable');
    
    result = logic.defuzzify(32.5);
    assert.equal(result.defuzzified, 'warm');
    
    result = logic.defuzzify(40);
    assert.equal(result.defuzzified, 'hot');
  });

  it('should handle nested logic operations', function() {
    const logic = new Logic();
    
    // Speed ranges
    const slow = new logic.c.ReverseGrade(0, 30);
    const moderate = new logic.c.Trapezoid(20, 30, 50, 60);
    const fast = new logic.c.Grade(50, 80);
    
    // Distance ranges
    const near = new logic.c.ReverseGrade(0, 100);
    const medium = new logic.c.Trapezoid(50, 100, 200, 250);
    const far = new logic.c.Grade(200, 300);
    
    // Initialize with speed
    logic.init('slow', slow)
      .or('moderate', moderate)
      .or('fast', fast);
    
    // Test speed logic
    let speedResult = logic.defuzzify(25);
    // At 25: slow=0.1667, moderate=0.75, fast=0
    assert.equal(speedResult.defuzzified, 'moderate');
    
    speedResult = logic.defuzzify(40);
    assert.equal(speedResult.defuzzified, 'moderate');
    
    speedResult = logic.defuzzify(70);
    assert.equal(speedResult.defuzzified, 'fast');
    
    // Create separate distance logic
    const distanceLogic = new Logic();
    distanceLogic.init('near', near)
      .or('medium', medium)
      .or('far', far);
    
    let distResult = distanceLogic.defuzzify(50);
    assert.equal(distResult.defuzzified, 'near');
    
    distResult = distanceLogic.defuzzify(150);
    assert.equal(distResult.defuzzified, 'medium');
    
    distResult = distanceLogic.defuzzify(250);
    assert.equal(distResult.defuzzified, 'far');
  });
});