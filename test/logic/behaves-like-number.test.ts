'use strict';
import { describe, it  } from 'node:test';
import { Logic } from '../../lib/logic';
import { Triangle } from '../../lib/curve/triangle';
import { Trapezoid } from '../../lib/curve/trapezoid';
import { Grade } from '../../lib/curve/grade';
import assert from 'assert';

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

  // enragedAttack wins at x=99 with membership Grade(90,100).fuzzify(99) = 0.9
  // exactly (the stable formula no longer leaks a cancellation error), so
  // 0 + 0.9 + 0.9 === 1.8.
  var res2 = 0 + res + res;
  assert.equal(res2, 1.8);
});