
var Logic = require('./lib/logic')
var Trapezoid = require('./lib/curve/trapezoid');

var logic = new Logic();
var res = logic
  .init('cold', new Trapezoid(0, 12, 18, 20)) // until 12-18 around warm  
  .or('warm', new Trapezoid(12, 14, 16, 100)) // until 12-18 around warm  
  .defuzzify(20);

console.log(res);
