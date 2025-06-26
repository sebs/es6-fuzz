'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import Logic from '../../lib/logic';

describe('Empty rules array handling', function() {
  describe('defuzzify with no rules', function() {
    const logic = new Logic();
    logic.initCalled = true;
    logic.rules = [];
    const result = logic.defuzzify(5);
    
    it('should return defuzzified as none', function() {
      assert.equal(result.defuzzified, 'none');
    });
    
    it('should return fuzzified as 0', function() {
      assert.equal(result.fuzzified, 0);
    });
    
    it('should return empty rules array', function() {
      assert.deepEqual(result.rules, []);
    });
  });
});