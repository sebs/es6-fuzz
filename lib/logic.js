'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logic = void 0;
const shape_1 = require("./curve/shape");
const grade_1 = require("./curve/grade");
const reverse_grade_1 = require("./curve/reverse-grade");
const triangle_1 = require("./curve/triangle");
const trapezoid_1 = require("./curve/trapezoid");
const constant_1 = require("./curve/constant");
const fuzzy_function_1 = require("./curve/fuzzy-function");
const sigmoid_1 = require("./curve/sigmoid");
const TYPE_INIT = 'init';
const TYPE_AND = 'and';
const TYPE_OR = 'or';
const TYPE_NOT = 'not';
const ruleEngine = {
    and(a, b, value) {
        return Math.min(a.fuzzify(value), b.fuzzify(value));
    },
    or(a, b, value) {
        return Math.max(a.fuzzify(value), b.fuzzify(value));
    },
    not(a, b = null, value) {
        return 1 - a.fuzzify(value);
    },
};
/** Class helping with FuzzyLogic. */
class Logic {
    initCalled = false;
    rules = [];
    c;
    constructor() {
        this.c = {
            Shape: shape_1.Shape,
            Grade: grade_1.Grade,
            ReverseGrade: reverse_grade_1.ReverseGrade,
            Trapezoid: trapezoid_1.Trapezoid,
            Triangle: triangle_1.Triangle,
            Constant: constant_1.Constant,
            FuzzyFunction: fuzzy_function_1.FuzzyFunction,
            Sigmoid: sigmoid_1.Sigmoid,
        };
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
        const type = TYPE_INIT;
        this.rules.push({ output, shape, type });
        return this;
    }
    and(output, shape) {
        this.checkOutputName(output);
        this.checkInitCalled();
        const type = TYPE_AND;
        this.rules.push({ output, shape, type });
        return this;
    }
    or(output, shape) {
        this.checkOutputName(output);
        this.checkInitCalled();
        const type = TYPE_OR;
        this.rules.push({ output, shape, type });
        return this;
    }
    not(output, shape) {
        this.checkOutputName(output);
        this.checkInitCalled();
        const type = TYPE_NOT;
        this.rules.push({ output, shape, type });
        return this;
    }
    defuzzify(value, as) {
        this.checkInitCalled();
        let defuzzified = 'none';
        let fuzzified = 0;
        let lastShape;
        this.rules.forEach((rule) => {
            rule.fuzzy = rule.shape.fuzzify(value);
            // lets keep the initial value
            if (rule.type === TYPE_INIT) {
                defuzzified = rule.output;
                fuzzified = rule.fuzzy;
                lastShape = rule.shape;
                return;
            }
            else {
                if (!lastShape)
                    return;
                const fuzzyCompRes = ruleEngine[rule.type](lastShape, rule.shape, value);
                lastShape.fuzzify(value);
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
        let namePrefix = '';
        if (as && typeof as === 'string') {
            namePrefix = as + '.';
        }
        const boonJsInputs = {};
        this.rules.forEach((rule) => {
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
            },
        };
    }
}
exports.Logic = Logic;
//# sourceMappingURL=logic.js.map