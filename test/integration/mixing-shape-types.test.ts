'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import Logic from '../../lib/logic';

describe('Mixing all shape types', function() {
  it('should work with all shape types in one Logic instance', function() {
    const logic = new Logic();
    
    // Use every shape type
    const triangleShape = new logic.c.Triangle(0, 5, 10);
    const trapezoidShape = new logic.c.Trapezoid(8, 12, 18, 22);
    const gradeShape = new logic.c.Grade(20, 30);
    const reverseGradeShape = new logic.c.ReverseGrade(28, 35);
    const sigmoidShape = new logic.c.Sigmoid(40, 2);
    const constantShape = new logic.c.Constant(0.5);
    const fuzzyFuncShape = new logic.c.FuzzyFunction(x => Math.sin(x/10) * 0.5 + 0.5);
    
    logic.init('triangle', triangleShape)
      .or('trapezoid', trapezoidShape)
      .or('grade', gradeShape)
      .or('reverseGrade', reverseGradeShape)
      .or('sigmoid', sigmoidShape)
      .or('constant', constantShape)
      .or('fuzzyFunc', fuzzyFuncShape);
    
    // Test different values
    let result = logic.defuzzify(5);
    assert.equal(result.defuzzified, 'triangle');
    assert.equal(result.fuzzified, 1);
    
    result = logic.defuzzify(15);
    assert.equal(result.defuzzified, 'trapezoid');
    assert.equal(result.fuzzified, 1);
    
    result = logic.defuzzify(25);
    // At 25: grade=0.5, reverseGrade starts at 28 so still 1
    assert.equal(result.defuzzified, 'reverseGrade');
    
    result = logic.defuzzify(42);
    // Sigmoid at x=42 with center=40 should be > 0.5
    assert(result.fuzzified > 0.5);
  });
});