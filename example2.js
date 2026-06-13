'use strict';
const { Logic, Triangle, Trapezoid, Grade } = require('./lib/index');

const logic = new Logic();
const res = logic
  .init('noAttack', new Triangle(0, 20, 40))
  .or('normalAttack', new Trapezoid(20, 30, 90, 100))
  .or('enragedAttack', new Grade(90, 100))
  .defuzzify(99);

console.log(res.toString()); // 'enragedAttack'
