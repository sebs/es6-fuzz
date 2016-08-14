import { Logic } from '../lib/logic';
import { Triangle } from '../lib/curve/triangle';
import { Trapezoid } from '../lib/curve/trapezoid';
import { Grade } from '../lib/curve/grade';

import assert from 'assert';

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
      .and('normalAttack', new Trapezoid(20, 30,90, 100))
      .and('enragedAttack', new Grade(90, 100))
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
        .not('no rage', rageRange)
        .defuzzify(20);
      assert.equal(res.toString(), 'no rage');
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
        .and('normalAttack', new Trapezoid(20, 30,90, 100))
        .and('enragedAttack', new Grade(90, 100))
        .defuzzify(99);
      assert.equal(res.toString(), 'enragedAttack');
    });
  });
});
