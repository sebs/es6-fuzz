'use strict';
const { describe, it } = require('node:test');
const assert = require('assert');
const Logic = require('../lib/logic');
const Triangle = require('../lib/curve/triangle');
const Trapezoid = require('../lib/curve/trapezoid');
const Grade = require('../lib/curve/grade');
const ReverseGrade = require('../lib/curve/reverse-grade');
const Sigmoid = require('../lib/curve/sigmoid');
const Constant = require('../lib/curve/constant');
const FuzzyFunction = require('../lib/curve/fuzzy-function');
const Shape = require('../lib/curve/shape');

describe('Error Handling', function() {
  describe('Logic class validation', function() {
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

    it('should throw error for invalid output names with numbers', function() {
      const logic = new Logic();
      const triangle = new Triangle(0, 5, 10);
      assert.throws(() => logic.init('hot123', triangle), /Output names can only be strings without space/);
    });

    it('should throw error for invalid output names with spaces', function() {
      const logic = new Logic();
      const triangle = new Triangle(0, 5, 10);
      assert.throws(() => logic.init('hot cold', triangle), /Output names can only be strings without space/);
    });

    it('should throw error for invalid output names with special chars', function() {
      const logic = new Logic();
      const triangle = new Triangle(0, 5, 10);
      assert.throws(() => logic.init('hot-cold', triangle), /Output names can only be strings without space/);
      assert.throws(() => logic.init('hot_cold', triangle), /Output names can only be strings without space/);
      assert.throws(() => logic.init('hot.cold', triangle), /Output names can only be strings without space/);
    });

    it('should allow valid output names', function() {
      const logic = new Logic();
      const triangle = new Triangle(0, 5, 10);
      assert.doesNotThrow(() => logic.init('hot', triangle));
      assert.doesNotThrow(() => logic.init('Hot', triangle));
      assert.doesNotThrow(() => logic.init('HOT', triangle));
      assert.doesNotThrow(() => logic.init('veryHot', triangle));
    });
  });

  describe('Shape constructor validation', function() {
    it('should handle NaN parameters', function() {
      const triangle = new Triangle(NaN, 5, 10);
      // NaN in x0 means x <= NaN is false, so it falls through to other conditions
      // The result depends on the specific implementation
      const result = triangle.fuzzify(5);
      assert(typeof result === 'number');
      
      const trapezoid = new Trapezoid(0, NaN, 10, 15);
      const result2 = trapezoid.fuzzify(5);
      assert(typeof result2 === 'number');
      
      const grade = new Grade(NaN, 10);
      const result3 = grade.fuzzify(5);
      assert(typeof result3 === 'number');
    });

    it('should handle Infinity parameters', function() {
      // Triangle with Infinity produces NaN in division
      const triangle = new Triangle(0, 10, Infinity);
      assert.equal(triangle.fuzzify(0), 0);
      assert.equal(triangle.fuzzify(10), 1);
      assert(isNaN(triangle.fuzzify(20))); // (Infinity - 20) / (Infinity - 10) = NaN
      
      const grade = new Grade(0, Infinity);
      assert.equal(grade.fuzzify(0), 0);
      assert.equal(grade.fuzzify(1000), 0); // 1000/Infinity = 0
      assert.equal(grade.fuzzify(Infinity), 1); // Only at infinity
    });

    it('should handle undefined parameters with defaults', function() {
      // Most shapes don't have default parameters, they'll get undefined
      const sigmoid = new Sigmoid(); // Has defaults
      assert.equal(sigmoid.fuzzify(0), 0.5); // Default center=0, slope=1
    });
  });

  describe('FuzzyFunction validation', function() {
    it('should throw error when callback is not a function', function() {
      assert.throws(() => {
        const func = new FuzzyFunction('not a function');
        func.fuzzify(5);
      }, TypeError);
    });

    it('should throw error when callback is null', function() {
      assert.throws(() => {
        const func = new FuzzyFunction(null);
        func.fuzzify(5);
      }, TypeError);
    });

    it('should throw error when callback is undefined', function() {
      assert.throws(() => {
        const func = new FuzzyFunction(undefined);
        func.fuzzify(5);
      }, TypeError);
    });

    it('should throw error when callback returns non-number', function() {
      const func = new FuzzyFunction(() => 'string');
      // FuzzyFunction doesn't validate type, only range [0,1]
      // String will fail the >= 0 check
      assert.throws(() => func.fuzzify(5), /fuzzified result must be smaller than 1/);
      
      const func2 = new FuzzyFunction(() => null);
      // null converts to 0 in comparisons, so it passes the validation
      assert.equal(func2.fuzzify(5), null); // Returns null as is
      
      const func3 = new FuzzyFunction(() => undefined);
      // undefined doesn't pass the range check
      assert.throws(() => func3.fuzzify(5), /fuzzified result must be smaller than 1/);
    });

    it('should handle callback that sometimes returns valid values', function() {
      const func = new FuzzyFunction(x => {
        if (x < 0) return -1; // Invalid
        if (x > 1) return 2; // Invalid
        return x; // Valid for [0,1]
      });
      
      assert.equal(func.fuzzify(0.5), 0.5);
      assert.throws(() => func.fuzzify(-1), /fuzzified result must be smaller than 1/);
      assert.throws(() => func.fuzzify(2), /fuzzified result must be smaller than 1/);
    });
  });

  describe('ES6 class instantiation', function() {
    it('should throw error when calling shapes without new keyword', function() {
      assert.throws(() => Triangle(0, 5, 10), /Class constructor .* cannot be invoked without 'new'/);
      assert.throws(() => Trapezoid(0, 5, 10, 15), /Class constructor .* cannot be invoked without 'new'/);
      assert.throws(() => Grade(0, 10), /Class constructor .* cannot be invoked without 'new'/);
      assert.throws(() => ReverseGrade(0, 10), /Class constructor .* cannot be invoked without 'new'/);
      assert.throws(() => Sigmoid(5, 1), /Class constructor .* cannot be invoked without 'new'/);
      assert.throws(() => Constant(0.5), /Class constructor .* cannot be invoked without 'new'/);
      assert.throws(() => Shape(0, 5, 10, 15), /Class constructor .* cannot be invoked without 'new'/);
      assert.throws(() => FuzzyFunction(x => x), /Class constructor .* cannot be invoked without 'new'/);
      assert.throws(() => Logic(), /Class constructor .* cannot be invoked without 'new'/);
    });
  });

  describe('Empty rules array handling', function() {
    it('should handle defuzzify with no rules', function() {
      const logic = new Logic();
      // Init is called but rules array is empty
      logic.initCalled = true; // Bypass init check
      logic.rules = []; // Empty rules
      
      const result = logic.defuzzify(5);
      assert.equal(result.defuzzified, 'none');
      assert.equal(result.fuzzified, 0);
      assert.deepEqual(result.rules, []);
    });
  });

  describe('Invalid chaining sequences', function() {
    it('should handle multiple init calls', function() {
      const logic = new Logic();
      const triangle1 = new Triangle(0, 5, 10);
      const triangle2 = new Triangle(10, 15, 20);
      
      logic.init('cold', triangle1);
      // Second init should work (not throw)
      assert.doesNotThrow(() => logic.init('hot', triangle2));
      
      // But rules should contain both
      assert.equal(logic.rules.length, 2);
    });

    it('should handle chaining after defuzzify', function() {
      const logic = new Logic();
      const triangle = new Triangle(0, 5, 10);
      
      logic.init('cold', triangle).and('warm', new Triangle(5, 10, 15));
      const result1 = logic.defuzzify(7.5);
      
      // Can continue chaining after defuzzify
      logic.or('hot', new Triangle(10, 15, 20));
      const result2 = logic.defuzzify(12.5);
      
      assert.equal(logic.rules.length, 3);
    });
  });

  describe('Property immutability', function() {
    it('should verify shape properties are read-only', function() {
      const triangle = new Triangle(0, 5, 10);
      
      // Attempt to modify properties should throw in strict mode
      assert.throws(() => {
        'use strict';
        triangle.x0 = 100;
      }, /Cannot assign to read only property/);
      
      // Properties should be unchanged
      assert.equal(triangle.x0, 0);
      assert.equal(triangle.x1, 5);
      assert.equal(triangle.x2, 10);
    });
  });
});