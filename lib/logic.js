'use strict'
const Shape = require('./curve/shape');
const Grade = require('./curve/grade');
const ReverseGrade = require('./curve/reverse-grade');
const Triangle = require('./curve/triangle');
const Trapezoid = require('./curve/trapezoid');
const Constant = require('./curve/constant');
const FuzzyFunction = require('./curve/fuzzy-function');
const Sigmoid = require('./curve/sigmoid');

const TYPE_INIT = 'init';
const TYPE_AND = 'and';
const TYPE_OR = 'or';
const TYPE_NOT = 'not';

const ruleEngine = {
  and(a, b, value){
    return Math.min(a.fuzzify(value), b.fuzzify(value));
  },
  or(a, b, value) {
    return Math.max(a.fuzzify(value), b.fuzzify(value));
  },
  not(a, b=null, value) {
    return 1 - a.fuzzify(value);
  }
};
/** Class helping with FuzzyLogic. */

class Logic {
  initCalled = false;
  constructor() {
    this.c = {
      Shape,
      Grade,
      ReverseGrade,
      Trapezoid,
      Triangle,
      Constant,
      FuzzyFunction,
      Sigmoid
    };
    this.rules = [];
  }

  checkInitCalled() {
    if (!this.initCalled) {
      throw Error('init needs to be called before performing logic');
    }
  }

  checkOutputName(name) {
    const reg = /^[a-z]+$/i;
    if (!reg.test(name)) {
      throw Error('Output names can only be strings without space, without numbers and without special chars');
    }
  }

  

  init(output, shape) {
    this.checkOutputName(output);
    this.initCalled = true;
    let type = TYPE_INIT;
    this.rules.push({ output, shape, type });
    return this;
  }
  and(output, shape) {
    this.checkOutputName(output);
    this.checkInitCalled();
    let type = TYPE_AND;
    this.rules.push({ output, shape, type });
    return this;
  }
  or(output, shape) {+
    this.checkOutputName(output);
    this.checkInitCalled();
    let type = TYPE_OR;
    this.rules.push({ output, shape, type });
    return this;
  }
  not(output, shape) {
    this.checkOutputName(output);
    this.checkInitCalled();
    let type = TYPE_NOT;
    this.rules.push({ output, shape, type });
    return this;
  }
  defuzzify(value, as=undefined) {
    this.checkInitCalled();
    let defuzzified = 'none';
    let fuzzified = 0;
    let lastShape;
    this.rules.forEach(rule => {
      rule.fuzzy = rule.shape.fuzzify(value);
      // lets keep the initial value
      if (rule.type === TYPE_INIT) {
        defuzzified = rule.output;
        fuzzified = rule.fuzzy;
        lastShape = rule.shape;
        return;
      } else {
        let fuzzyCompRes = ruleEngine[rule.type](lastShape, rule.shape, value);
        lastShape.fuzzify(value)
        // old value is kept, not is not yet implemented
        if (fuzzyCompRes === lastShape.fuzzify(value)) {
          return;
        }
        defuzzified = rule.output;
        fuzzified = rule.fuzzy;
        // if there is no shape, like for example for a NOT keep the last one
        lastShape = rule.shape || lastShape;
      }
    });

    var namePrefix = '';
    if (!!as && typeof as === 'string') {
      namePrefix = as + '.';
    }

    const boonJsInputs = {};
    this.rules.forEach(rule => { 
      boonJsInputs[`${namePrefix}${rule.output}`] = rule.output === defuzzified;
    });

    /**
     *
     * @example  fuzzy.defuzzify(10)
     */
    return {
      boonJsInputs,
      fuzzified: fuzzified,
      defuzzified: defuzzified,
      rules: this.rules,
      valueOf() {
        return fuzzified;
      },
      toString() {
        return defuzzified;
      }
    };
  }
}
module.exports = Logic;
