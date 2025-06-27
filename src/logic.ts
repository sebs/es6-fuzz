'use strict'
import { Shape } from './curve/shape';
import { Grade } from './curve/grade';
import { ReverseGrade } from './curve/reverse-grade';
import { Triangle } from './curve/triangle';
import { Trapezoid } from './curve/trapezoid';
import { Constant } from './curve/constant';
import { FuzzyFunction } from './curve/fuzzy-function';
import { Sigmoid } from './curve/sigmoid';

const TYPE_INIT = 'init';
const TYPE_AND = 'and';
const TYPE_OR = 'or';
const TYPE_NOT = 'not';

type RuleType = Logic.RuleType;
type Rule = Logic.Rule;


const ruleEngine = {
  and(a: Shape, b: Shape, value: number): number {
    return Math.min(a.fuzzify(value), b.fuzzify(value));
  },
  or(a: Shape, b: Shape, value: number): number {
    return Math.max(a.fuzzify(value), b.fuzzify(value));
  },
  not(a: Shape, b: Shape | null = null, value: number): number {
    return 1 - a.fuzzify(value);
  }
};

/** Class helping with FuzzyLogic. */
export class Logic {
  private initCalled: boolean = false;
  private rules: Rule[] = [];
  
  public c: {
    Shape: typeof Shape;
    Grade: typeof Grade;
    ReverseGrade: typeof ReverseGrade;
    Trapezoid: typeof Trapezoid;
    Triangle: typeof Triangle;
    Constant: typeof Constant;
    FuzzyFunction: typeof FuzzyFunction;
    Sigmoid: typeof Sigmoid;
  };

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
  }

  private checkInitCalled(): void {
    if (!this.initCalled) {
      throw Error('init needs to be called before performing logic');
    }
  }

  private checkOutputName(name: string): void {
    const reg = /^[a-z]+$/i;
    if (!reg.test(name)) {
      throw Error('Output names can only be strings without space, without numbers and without special chars');
    }
  }

  init(output: string, shape: Shape): this {
    this.checkOutputName(output);
    this.initCalled = true;
    const type = TYPE_INIT;
    this.rules.push({ output, shape, type });
    return this;
  }

  and(output: string, shape: Shape): this {
    this.checkOutputName(output);
    this.checkInitCalled();
    const type = TYPE_AND;
    this.rules.push({ output, shape, type });
    return this;
  }

  or(output: string, shape: Shape): this {
    this.checkOutputName(output);
    this.checkInitCalled();
    const type = TYPE_OR;
    this.rules.push({ output, shape, type });
    return this;
  }

  not(output: string, shape: Shape): this {
    this.checkOutputName(output);
    this.checkInitCalled();
    const type = TYPE_NOT;
    this.rules.push({ output, shape, type });
    return this;
  }

  defuzzify(value: number, as?: string): Logic.DefuzzifyResult {
    this.checkInitCalled();
    let defuzzified = 'none';
    let fuzzified = 0;
    let lastShape: Shape | undefined;

    this.rules.forEach(rule => {
      rule.fuzzy = rule.shape.fuzzify(value);
      // lets keep the initial value
      if (rule.type === TYPE_INIT) {
        defuzzified = rule.output;
        fuzzified = rule.fuzzy;
        lastShape = rule.shape;
        return;
      } else {
        if (!lastShape) return;
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

    const boonJsInputs: Record<string, boolean> = {};
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

export namespace Logic {
  export type RuleType = 'init' | 'and' | 'or' | 'not';

  export interface Rule {
    output: string;
    shape: Shape;
    type: RuleType;
    fuzzy?: number;
  }

  export interface DefuzzifyResult {
    boonJsInputs: Record<string, boolean>;
    fuzzified: number;
    defuzzified: string;
    rules: Rule[];
    valueOf(): number;
    toString(): string;
  }
}

