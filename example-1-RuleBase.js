const Logic = require('./lib/logic')
const Trapezoid = require('./lib/curve/trapezoid');
const boon = require('boon-js');

const RuleBase = require('./lib/RuleBase');

const createLikelihoodLogic = () => {
  var logicLikelihood = new Logic();
  const lowLikelihood = new Trapezoid(0, 0, 2, 3);
  const moderateLikelihood = new Trapezoid(2, 3, 7, 8);
  const highLikelihood = new Trapezoid(7, 8, 10, 11);

  logicLikelihood.init('low', lowLikelihood)
  logicLikelihood.or('moderate', moderateLikelihood)
  logicLikelihood.or('high', highLikelihood);

  return logicLikelihood;
}

const createImpactLogic = () => {
  var logicImpact = new Logic();
  const lowImpact = new Trapezoid(0, 0, 2, 3);
  const moderateImpact = new Trapezoid(2, 3, 7, 8);
  const highImpact = new Trapezoid(7, 8, 10, 11);

  logicImpact.init('low', lowImpact)
  logicImpact.or('moderate', moderateImpact)
  logicImpact.or('high', highImpact);

  return logicImpact;
}

const assess = (likelihood, impact) => {
  var logicLikelihood = createLikelihoodLogic();

  var logicImpact = createImpactLogic();

  const assessments = new RuleBase();

  /////////////////////////////////////////////////////////////////////////////////////////////////
  assessments.addRule(boon.getEvaluator('likelihood.low AND impact.low'), "very low");
  assessments.addRule(boon.getEvaluator('likelihood.low AND impact.moderate'), "low");
  assessments.addRule(boon.getEvaluator('likelihood.low AND impact.high'), "top low");
   /////////////////////////////////////////////////////////////////////////////////////////////////
  assessments.addRule(boon.getEvaluator('likelihood.moderate AND impact.low'), "low");
  assessments.addRule(boon.getEvaluator('likelihood.moderate AND impact.moderate'), "top low");
  assessments.addRule(boon.getEvaluator('likelihood.moderate AND impact.high'), "moderate");
   /////////////////////////////////////////////////////////////////////////////////////////////////
  assessments.addRule(boon.getEvaluator('likelihood.high AND impact.low'), "moderate");
  assessments.addRule(boon.getEvaluator('likelihood.high AND impact.moderate'), "high");
  assessments.addRule(boon.getEvaluator('likelihood.high AND impact.high'), "very high");
  /////////////////////////////////////////////////////////////////////////////////////////////////

  // Defuzzify //
  const resLikelihood = logicLikelihood.defuzzify(likelihood, 'likelihood');
  const resImpact = logicImpact.defuzzify(impact, 'impact');

  const jsBoonInput = { ...resLikelihood.boonJsInputs, ...resImpact.boonJsInputs }

  assessments.evaluateAllRules(jsBoonInput);

  return assessments.getResult();
}

// Launch test cases

console.log("Assessment result for {likelihood: 1, impact: 2}: " + assess( 1, 2));
console.log("Assessment result for {likelihood: 1, impact: 8}: " + assess( 1, 8));
console.log("Assessment result for {likelihood: 8, impact: 2}: " + assess( 8, 2));
console.log("Assessment result for {likelihood: 9, impact: 10}: " + assess( 9, 10));
