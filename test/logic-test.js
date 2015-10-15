import { Logic } from '../lib/logic';
import { Triangle } from '../lib/shapes/triangle';
import { Trapezoid } from '../lib/shapes/trapezoid';
import { Grade } from '../lib/shapes/grade';

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
      assert.equal(res, 'enragedAttack');
    });
  });
});
