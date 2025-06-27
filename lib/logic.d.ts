import { Shape } from './curve/shape';
import { Grade } from './curve/grade';
import { ReverseGrade } from './curve/reverse-grade';
import { Triangle } from './curve/triangle';
import { Trapezoid } from './curve/trapezoid';
import { Constant } from './curve/constant';
import { FuzzyFunction } from './curve/fuzzy-function';
import { Sigmoid } from './curve/sigmoid';
/** Class helping with FuzzyLogic. */
export declare class Logic {
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
    defuzzify(value: number, as?: string): Logic.DefuzzifyResult;
}
export declare namespace Logic {
    type RuleType = 'init' | 'and' | 'or' | 'not';
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
}
//# sourceMappingURL=logic.d.ts.map