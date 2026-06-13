'use strict';
import { Shape } from './curve/shape';
import { Fuzzifier } from './curve/fuzzifier';
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

/**
 * Maps a rule to the membership degree of its output, given the membership
 * carried along the chain so far (`prev`) and this rule's own shape value
 * (`raw`). The winning output is then the one with the highest membership.
 */
const ruleEngine: Record<Logic.RuleType, (prev: number, raw: number) => number> = {
  init(_prev: number, raw: number): number {
    return raw;
  },
  or(_prev: number, raw: number): number {
    return raw;
  },
  and(prev: number, raw: number): number {
    return Math.min(prev, raw);
  },
  not(_prev: number, raw: number): number {
    return 1 - raw;
  },
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
      Sigmoid,
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
      throw Error(
        'Output names can only be strings without space, without numbers and without special chars'
      );
    }
  }

  init(output: string, shape: Fuzzifier): this {
    this.checkOutputName(output);
    this.initCalled = true;
    const type = TYPE_INIT;
    this.rules.push({ output, shape, type });
    return this;
  }

  and(output: string, shape: Fuzzifier): this {
    this.checkOutputName(output);
    this.checkInitCalled();
    const type = TYPE_AND;
    this.rules.push({ output, shape, type });
    return this;
  }

  or(output: string, shape: Fuzzifier): this {
    this.checkOutputName(output);
    this.checkInitCalled();
    const type = TYPE_OR;
    this.rules.push({ output, shape, type });
    return this;
  }

  not(output: string, shape: Fuzzifier): this {
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
    let best = -Infinity;
    // membership carried along the chain, used by AND to narrow the result
    let running = 0;

    // Evaluate into fresh rule copies so the engine's internal state is never
    // mutated or handed out to the caller.
    const rules: Rule[] = this.rules.map((rule) => {
      const raw = rule.shape.fuzzify(value);
      const membership = ruleEngine[rule.type](running, raw);
      running = membership;
      // max-membership defuzzification: highest membership wins, ties keep
      // the earliest rule (strict greater-than)
      if (membership > best) {
        best = membership;
        defuzzified = rule.output;
        fuzzified = membership;
      }
      return { ...rule, fuzzy: membership };
    });

    let namePrefix = '';
    if (as && typeof as === 'string') {
      namePrefix = as + '.';
    }

    const boonJsInputs: Record<string, boolean> = {};
    rules.forEach((rule) => {
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
      rules,
      valueOf() {
        return fuzzified;
      },
      toString() {
        return defuzzified;
      },
    };
  }
}

export namespace Logic {
  export type RuleType = 'init' | 'and' | 'or' | 'not';

  export interface Rule {
    output: string;
    shape: Fuzzifier;
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
