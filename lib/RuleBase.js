'use strict'

/** 
 * Helper class that allows client code to group evaluator rules in an array of 3-tuples,
 * each 3-tuple associates the evaluator (built out of a rule) to its output and evaluation result.
 * (For more information on to use it, please refer to example_1_RuleBase.js).
*/
class RuleBase {

  /** 
   * just creates an empty array to hold the 3-tuples 
   * */
  constructor() {
    this.rules = [];
  }

  /** 
   * adds a 3-tuples of { evaluator, evaluation, result } and the evaluation is 
   * initialized to "false".
   */
  addRule(evaluator, result) {
    this.rules.push( { evaluator: evaluator, evaluation: false, result: result} );
  }

  /**
   * launches batch evaluation of all rules against the given input.
   * This method has to be called before getResult().
   * @param {*} input: the input object that contains a value for each fuzzy variable of the model.
   */
  evaluateAllRules(input){
    for(let i = 0; i < this.rules.length; i++){
      this.rules[i].evaluation = this.rules[i].evaluator(input);
    }
  }

  /**
   * gets the final result of the defuzzification process.
   * It looks for the rule (should be only one if the model is correct) that 
   * was evaluated to true.
   */
  getResult(){
    for(let i = 0; i < this.rules.length; i++){
      if( this.rules[i].evaluation == true )
        return this.rules[i].result;
    }
    // If no rule evaluated to true then there is a problem with the model.
    return(-1);
  }

}

module.exports = RuleBase;