'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import { Logic } from '../../lib/logic';
import { Triangle } from '../../lib/curve/triangle';

describe('Invalid chaining sequences', function() {
  describe('multiple init calls', function() {
    const logic = new Logic();
    const triangle1 = new Triangle(0, 5, 10);
    const triangle2 = new Triangle(10, 15, 20);
    
    it('should not throw error on second init call', function() {
      logic.init('cold', triangle1);
      assert.doesNotThrow(() => logic.init('hot', triangle2));
    });
    
    it('should contain both rules after multiple init calls', function() {
      assert.equal(logic.rules.length, 2);
    });
  });

  describe('chaining after defuzzify', function() {
    const logic = new Logic();
    const triangle = new Triangle(0, 5, 10);
    
    it('should allow chaining operations after defuzzify', function() {
      logic.init('cold', triangle).and('warm', new Triangle(5, 10, 15));
      logic.defuzzify(7.5);
      
      // Can continue chaining after defuzzify
      assert.doesNotThrow(() => logic.or('hot', new Triangle(10, 15, 20)));
    });
    
    it('should have all rules after chaining post-defuzzify', function() {
      logic.defuzzify(12.5);
      assert.equal(logic.rules.length, 3);
    });
  });
});