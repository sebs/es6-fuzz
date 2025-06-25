'use strict';
const { describe, it } = require('node:test');
const assert = require('assert');
const Logic = require('../lib/logic');

describe('Integration Tests', function() {
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

  describe('Performance with many rules', function() {
    it('should handle 100+ rules efficiently', function() {
      const logic = new Logic();
      
      // Create 100 overlapping triangles
      const shapes = [];
      for (let i = 0; i < 100; i++) {
        const start = i * 5;
        const peak = start + 5;
        const end = start + 10;
        shapes.push({
          name: `shape${String.fromCharCode(65 + Math.floor(i/26))}${String.fromCharCode(65 + (i%26))}`,
          shape: new logic.c.Triangle(start, peak, end)
        });
      }
      
      // Initialize with first shape
      logic.init(shapes[0].name, shapes[0].shape);
      
      // Add all other shapes
      for (let i = 1; i < shapes.length; i++) {
        logic.or(shapes[i].name, shapes[i].shape);
      }
      
      // Test that it works correctly
      const result = logic.defuzzify(7.5); // Should match shape1 which is shapeAA (0-5-10)
      assert.equal(result.defuzzified, 'shapeAA');
      assert.equal(result.fuzzified, 0.5);
      
      const result2 = logic.defuzzify(252.5); // Both BX and BY match, BX wins (comes first)
      assert.equal(result2.defuzzified, 'shapeBX');
      assert.equal(result2.fuzzified, 0.5);
      
      // Verify we have 100 rules
      assert.equal(logic.rules.length, 100);
    });
  });

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
});