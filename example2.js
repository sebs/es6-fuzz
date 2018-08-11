var Logic = require('./lib/logic')
var Trapezoid = require('./lib/curve/trapezoid');
var Triangle = require('./lib/curve/triangle');
var Grade = require('./lib/curve/grade');

var logic = new Logic();
var res = logic
  .init('noAttack', new Triangle(0, 20, 40))
  .or('normalAttack', new Trapezoid(20, 30, 90, 100))
  .or('enragedAttack', new Grade(90, 100))
	.defuzzify(40);
	
	console.log(res);