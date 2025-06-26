'use strict';
const { describe, it } = require('node:test');
const Logic = require('../../lib/logic');
const Triangle = require('../../lib/curve/triangle');
const Trapezoid = require('../../lib/curve/trapezoid');
const Grade = require('../../lib/curve/grade');
const assert = require('assert');

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