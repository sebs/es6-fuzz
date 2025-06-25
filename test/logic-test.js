'use strict';
const { describe, it, beforeEach } = require('node:test');
const Logic = require('../lib/logic');
const Triangle = require('../lib/curve/triangle');
const Trapezoid = require('../lib/curve/trapezoid');
const Grade = require('../lib/curve/grade');
const assert = require('assert');

describe('logic', () => {
  describe('interface', () => {
    var logic;
    beforeEach(() => {
      logic = new Logic();
    });
    it('has a and method',() => {
      assert.equal(typeof logic.and, 'function');
    });
    it('has a or method', () => {
      assert.equal(typeof logic.or, 'function');
    });
    it('has a not method', () => {
      assert.equal(typeof logic.not, 'function');
    });
  });

  describe('behaves like a number', function() {
    var noAttack = new Triangle(0, 20, 40);
    var normalAttack = new Trapezoid(20, 30, 90, 100);
    var enragedAttack = new Grade(90, 100);
    var logic = new Logic();
    var res = logic
      .init('noAttack', new Triangle(0, 20, 40))
      .or('normalAttack', new Trapezoid(20, 30,90, 100))
      .or('enragedAttack', new Grade(90, 100))
      .defuzzify(99);

    var res2 = 0 + res + res;
    assert.equal(res2, 1.8000000000000007);
  });

  describe('Not!', () => {
    it('gets not', function() {
      var rageRange = new Triangle(0, 20, 40);
      var logic = new Logic();
      var res = logic
        .init('rage', rageRange)
        .not('norage', rageRange)
        .defuzzify(20);
      assert.equal(res.toString(), 'norage');
    });
  });

  describe('integration test', () => {
    it('can do a basic attack rage calculation', () => {
      var noAttack = new Triangle(0, 20, 40);
      var normalAttack = new Trapezoid(20, 30, 90, 100);
      var enragedAttack = new Grade(90, 100);
      var logic = new Logic();
      var res = logic
        .init('noAttack', new Triangle(0, 20, 40))
        .or('normalAttack', new Trapezoid(20, 30,90, 100))
        .or('enragedAttack', new Grade(90, 100))
        .defuzzify(99);
      assert.equal(res.toString(), 'enragedAttack');
    });
  });
});
