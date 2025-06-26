'use strict';
const { describe, it } = require('node:test');
const assert = require('assert');
const Logic = require('../../lib/logic');
const Triangle = require('../../lib/curve/triangle');

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
});