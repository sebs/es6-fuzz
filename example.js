'use strict';
const { Logic, Trapezoid } = require('./lib/index');

const logic = new Logic();
const res = logic
  .init('cold', new Trapezoid(0, 12, 18, 20)) // cold roughly until 12-18
  .or('warm', new Trapezoid(12, 14, 16, 100)) // warm from 12-18 upwards
  .defuzzify(20);

console.log(res.toString()); // 'warm'
