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
/**
 * Maps a rule to the membership degree of its output, given the membership
 * carried along the chain so far (`prev`) and this rule's own shape value
 * (`raw`). The winning output is then the one with the highest membership.
 */
const ruleEngine = {
    init(_prev, raw) {
        return raw;
    },
    or(_prev, raw) {
        return raw;
    },
    and(prev, raw) {
        return Math.min(prev, raw);
    },
    not(_prev, raw) {
        return 1 - raw;
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
        let best = -Infinity;
        // membership carried along the chain, used by AND to narrow the result
        let running = 0;
        this.rules.forEach((rule) => {
            const raw = rule.shape.fuzzify(value);
            const membership = ruleEngine[rule.type](running, raw);
            rule.fuzzy = membership;
            running = membership;
            // max-membership defuzzification: highest membership wins, ties keep
            // the earliest rule (strict greater-than)
            if (membership > best) {
                best = membership;
                defuzzified = rule.output;
                fuzzified = membership;
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