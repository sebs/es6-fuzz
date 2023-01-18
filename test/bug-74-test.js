const assert = require('assert');
const Logic = require('../lib/logic');
const Triangle = require('../lib/curve/triangle');
const Trapezoid = require('../lib/curve/trapezoid');
const Grade = require('../lib/curve/grade');
const getEvaluator = require('boon-js').getEvaluator;

const assess = (likelihood, impact) => {
    var logicLikelihood = new Logic();
    const lowLikelihood = new Trapezoid(0, 0, 2, 3);
    const moderateLikelihood = new Trapezoid(2, 3, 7, 8);
    const highLikelihood = new Trapezoid(7, 8, 10, 10);
  
    logicLikelihood.init('low', lowLikelihood)
    logicLikelihood.or('moderate', moderateLikelihood)
    logicLikelihood.or('high', highLikelihood);
  
    var logicImpact = new Logic();
    const publicImpact = new Trapezoid(0, 0, 1.5, 2.5);
    const internalImpact = new Trapezoid(1.5, 2.5, 4.5, 5.5);
    const confidentialImpact = new Trapezoid(4.5, 5.5, 7.5, 8.5);
    const restrictedImpact = new Trapezoid(7.5, 8.5, 10, 10);
  
    logicImpact.init('public', publicImpact)
    logicImpact.or('internal', internalImpact)
    logicImpact.or('confidential', confidentialImpact);
    logicImpact.or('restricted', restrictedImpact);
  
    const tests = [];
      // assessment very low
    const securityTest_low_public = getEvaluator('likelihood.low AND impact.public');
    tests.push(securityTest_low_public);
      // assessment low
    const securityTest_low_internal = getEvaluator('likelihood.low AND impact.internal');
    tests.push(securityTest_low_internal);
      // assessment medium
    const securityTest_low_confidential = getEvaluator('likelihood.low AND impact.confidential');
    tests.push(securityTest_low_confidential);
      // assessment high
    const securityTest_low_restricted = getEvaluator('likelihood.low AND impact.restricted');
    tests.push(securityTest_low_restricted);
      // assessment low
    const securityTest_moderate_public = getEvaluator('likelihood.moderate AND impact.public');
    tests.push(securityTest_moderate_public);
      // assessment medium
    const securityTest_moderate_internal = getEvaluator('likelihood.moderate AND impact.internal');
    tests.push(securityTest_moderate_internal);
      // assessment high
    const securityTest_moderate_confidential = getEvaluator('likelihood.moderate AND impact.confidential');
    tests.push(securityTest_moderate_confidential);
      // assessment very high
    const securityTest_moderate_restricted = getEvaluator('likelihood.moderate AND impact.restricted');
    tests.push(securityTest_moderate_restricted);
      // assessment low
    const securityTest_high_public = getEvaluator('likelihood.high AND impact.public');
    tests.push(securityTest_high_public);
      // assessment medium
    const securityTest_high_internal = getEvaluator('likelihood.high AND impact.internal');
    tests.push(securityTest_high_internal);
      // assessment high
    const securityTest_high_confidential = getEvaluator('likelihood.high AND impact.confidential');
    tests.push(securityTest_high_confidential);
      // assessment very high
    const securityTest_high_restricted = getEvaluator('likelihood.high AND impact.restricted');
    tests.push(securityTest_high_restricted);
  
    const resLikelihood = logicLikelihood.defuzzify(likelihood, 'likelihood');
    const resImpact = logicImpact.defuzzify(impact, 'impact');
  
    const jsBoonInput = { ...resLikelihood.boonJsInputs, ...resImpact.boonJsInputs }
  
    const results = [];
    for(let i = 0; i < tests.length; i++){
      results.push( tests[i](jsBoonInput) );
    }
  
    if(results[0]) return "very low";
    else if(results[1]) return "low";
    else if(results[2]) return "medium";
    else if(results[3]) return "high";
    else if(results[4]) return "low";
    else if(results[5]) return "medium";
    else if(results[6]) return "high";
    else if(results[7]) return "high";
    else if(results[8]) return "low";
    else if(results[9]) return "medium";
    else if(results[10]) return "high";
    else if(results[11]) return "very high";
    else return "Unknown";
  }


describe('Bug #74 Wrong evaluation at limit of trapezoid', function() {
    it.skip('asses', ()=>{
        const restrictedImpact = new Trapezoid(7.5, 8.5, 10, 10);
        var res = restrictedImpact.fuzzify(10);
        assert.equal(res, 1);
    })
});
