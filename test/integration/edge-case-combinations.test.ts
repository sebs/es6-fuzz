'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import Logic from '../../lib/logic';

describe('Edge case combinations', function() {
  it('should handle overlapping shapes', function() {
    const logic = new Logic();
    
    // Two overlapping triangles
    const shapeA = new logic.c.Triangle(0, 10, 20);
    const shapeB = new logic.c.Triangle(10, 20, 30);
    
    logic.init('shapeA', shapeA)
      .or('shapeB', shapeB);
    
    // At overlap point (x=15), both have value 0.5
    const result = logic.defuzzify(15);
    // OR takes maximum, both are 0.5, so first wins
    assert.equal(result.defuzzified, 'shapeA');
    assert.equal(result.fuzzified, 0.5);
  });

  it('should handle disjoint shapes', function() {
    const logic = new Logic();
    
    // Two non-overlapping triangles
    const shapeA = new logic.c.Triangle(0, 5, 10);
    const shapeB = new logic.c.Triangle(20, 25, 30);
    
    logic.init('shapeA', shapeA)
      .or('shapeB', shapeB);
    
    // In the gap (x=15), both return 0
    const result = logic.defuzzify(15);
    assert.equal(result.fuzzified, 0);
    assert.equal(result.defuzzified, 'shapeA'); // First shape wins when all are 0
  });

  it('should handle shapes meeting at boundaries', function() {
    const logic = new Logic();
    
    // Two shapes that meet exactly at x=10
    const shape1 = new logic.c.Grade(0, 10);
    const shape2 = new logic.c.ReverseGrade(10, 20);
    
    logic.init('rising', shape1)
      .or('falling', shape2);
    
    // At boundary (x=10), grade=1, reverseGrade=1
    const result = logic.defuzzify(10);
    assert.equal(result.fuzzified, 1);
    assert.equal(result.defuzzified, 'rising'); // First wins on tie
  });
});