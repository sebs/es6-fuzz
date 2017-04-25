
var Logic = require('./lib/logic')
var Trapezoid = require('./lib/curve/trapezoid');

var logic = new Logic();
var res = logic
  .init('verycold', new Trapezoid(0, 0, 8, 12))  // until 10 degrees very cold
  .and('cold', new Trapezoid(8, 12, 18, 20)) // until 12-18 around warm
  .and('hot', new Trapezoid(12, 20, 30, 100)) // all up from 30 surely  hot
  .defuzzify(99);

console.log(res);
