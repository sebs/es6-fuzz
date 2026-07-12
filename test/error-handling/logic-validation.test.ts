'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import { Logic } from '../../lib/logic';
import { Triangle } from '../../lib/curve/triangle';

describe('Logic class validation', function() {
  describe('method calls without init', function() {
    it('should throw error when calling defuzzify without init', function() {
      const logic = new Logic();
      assert.throws(() => logic.defuzzify(5), /init needs to be called before performing logic/);
    });

    it('should throw error when calling and() without init', function() {
      const logic = new Logic();
      const triangle = new Triangle(0, 5, 10);
      assert.throws(() => logic.and('hot', triangle), /init needs to be called before performing logic/);
    });

    it('should throw error when calling or() without init', function() {
      const logic = new Logic();
      const triangle = new Triangle(0, 5, 10);
      assert.throws(() => logic.or('hot', triangle), /init needs to be called before performing logic/);
    });

    it('should throw error when calling not() without init', function() {
      const logic = new Logic();
      const triangle = new Triangle(0, 5, 10);
      assert.throws(() => logic.not('hot', triangle), /init needs to be called before performing logic/);
    });
  });

  describe('invalid output names', function() {
    const logic = new Logic();
    const triangle = new Triangle(0, 5, 10);
    
    it('should throw error for output name with numbers', function() {
      assert.throws(() => logic.init('hot123', triangle), /Output names can only be strings without space/);
    });

    it('should throw error for output name with spaces', function() {
      assert.throws(() => logic.init('hot cold', triangle), /Output names can only be strings without space/);
    });

    it('should throw error for output name with hyphen', function() {
      assert.throws(() => logic.init('hot-cold', triangle), /Output names can only be strings without space/);
    });
    
    it('should throw error for output name with underscore', function() {
      assert.throws(() => logic.init('hot_cold', triangle), /Output names can only be strings without space/);
    });
    
    it('should throw error for output name with dot', function() {
      assert.throws(() => logic.init('hot.cold', triangle), /Output names can only be strings without space/);
    });
  });

  describe('valid output names', function() {
    const logic = new Logic();
    const triangle = new Triangle(0, 5, 10);
    
    it('should allow lowercase output name', function() {
      assert.doesNotThrow(() => logic.init('hot', triangle));
    });
    
    it('should allow title case output name', function() {
      assert.doesNotThrow(() => logic.init('Hot', triangle));
    });
    
    it('should allow uppercase output name', function() {
      assert.doesNotThrow(() => logic.init('HOT', triangle));
    });
    
    it('should allow camelCase output name', function() {
      assert.doesNotThrow(() => logic.init('veryHot', triangle));
    });
  });

  describe('reserved output name "none"', function() {
    const triangle = new Triangle(0, 5, 10);

    it('should throw when init uses the reserved name "none"', function() {
      const logic = new Logic();
      assert.throws(() => logic.init('none', triangle), /Output name "none" is reserved/);
    });

    it('should throw case-insensitively (e.g. "None")', function() {
      const logic = new Logic();
      assert.throws(() => logic.init('None', triangle), /Output name "none" is reserved/);
    });

    it('should keep "none" unambiguous as the no-winner signal', function() {
      // With 'none' reserved, no output can collide with the sentinel, so when no
      // rule fires every boonJsInputs entry is false (findings.md F6).
      const logic = new Logic();
      logic.init('cold', new Triangle(0, 5, 10));
      const result = logic.defuzzify(-100);
      assert.equal(result.defuzzified, 'none');
      assert.equal(result.boonJsInputs['cold'], false);
      assert.equal(result.boonJsInputs['none'], undefined);
    });
  });

  describe('duplicate output names', function() {
    const triangle = new Triangle(0, 5, 10);

    it('should throw when an output name is reused across rules', function() {
      const logic = new Logic();
      logic.init('cold', triangle);
      assert.throws(() => logic.or('cold', triangle), /Output name "cold" is already in use/);
    });

    it('should allow distinct output names', function() {
      const logic = new Logic();
      logic.init('cold', triangle);
      assert.doesNotThrow(() => logic.or('hot', triangle));
    });
  });
});