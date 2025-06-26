'use strict';
const { describe, it } = require('node:test');
const assert = require('assert');
const Logic = require('../../lib/logic');

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