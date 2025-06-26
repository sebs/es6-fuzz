import Shape from './curve/shape';
import Grade from './curve/grade';
import ReverseGrade from './curve/reverse-grade';
import Triangle from './curve/triangle';
import Trapezoid from './curve/trapezoid';
import Constant from './curve/constant';
import FuzzyFunction from './curve/fuzzy-function';
import Sigmoid from './curve/sigmoid';
declare const TYPE_INIT = "init";
declare const TYPE_AND = "and";
declare const TYPE_OR = "or";
declare const TYPE_NOT = "not";
type RuleType = typeof TYPE_INIT | typeof TYPE_AND | typeof TYPE_OR | typeof TYPE_NOT;
interface Rule {
    output: string;
    shape: Shape;
    type: RuleType;
    fuzzy?: number;
}
interface DefuzzifyResult {
    boonJsInputs: Record<string, boolean>;
    fuzzified: number;
    defuzzified: string;
    rules: Rule[];
    valueOf(): number;
    toString(): string;
}
/** Class helping with FuzzyLogic. */
declare class Logic {
    private initCalled;
    private rules;
    c: {
        Shape: typeof Shape;
        Grade: typeof Grade;
        ReverseGrade: typeof ReverseGrade;
        Trapezoid: typeof Trapezoid;
        Triangle: typeof Triangle;
        Constant: typeof Constant;
        FuzzyFunction: typeof FuzzyFunction;
        Sigmoid: typeof Sigmoid;
    };
    constructor();
    private checkInitCalled;
    private checkOutputName;
    init(output: string, shape: Shape): this;
    and(output: string, shape: Shape): this;
    or(output: string, shape: Shape): this;
    not(output: string, shape: Shape): this;
    defuzzify(value: number, as?: string): DefuzzifyResult;
}
export = Logic;
//# sourceMappingURL=logic.d.ts.map