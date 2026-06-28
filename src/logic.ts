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

  /**
   * @deprecated Redundant with the package's named exports. Import the shape
   * classes directly instead, e.g. `import { Triangle } from 'es6-fuzz'`.
   * Kept for backwards compatibility and slated for removal in the next major.
   */
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
    // ASCII letters only — the keys end up as boon-js identifiers, which are
    // not Unicode-aware, so non-ASCII letters (e.g. "ÜberHeiss") are rejected
    // by design rather than silently producing an unusable boon-js input.
    const reg = /^[a-z]+$/i;
    if (!reg.test(name)) {
      throw Error(
        'Output names can only be strings without space, without numbers and without special chars (ASCII letters a-z only)'
      );
    }
    if (this.rules.some((rule) => rule.output === name)) {
      throw Error('Output name "' + name + '" is already in use');
    }
  }

  /**
   * Registers the first rule. Must be called before {@link and}, {@link or},
   * {@link not} or {@link defuzzify}.
   *
   * Rule composition is sequential and order-dependent: at {@link defuzzify}
   * time each rule's membership is folded into a single value that is carried
   * to the next rule (see {@link and}). `init` and `or` start a fresh value
   * from the rule's own shape; `and` narrows it; `not` inverts it.
   *
   * @param output Output label, letters only (`/^[a-z]+$/i`), must be unique.
   * @param shape Fuzzifier mapping a crisp input to a membership degree 0..1.
   */
  init(output: string, shape: Fuzzifier): this {
    this.checkOutputName(output);
    this.initCalled = true;
    const type = TYPE_INIT;
    this.rules.push({ output, shape, type });
    return this;
  }

  /**
   * Narrows the carried membership with `min(previous, shape(value))`
   * (the standard fuzzy-AND / T-norm). Because `previous` is whatever the
   * immediately preceding rule produced, `and` is order-dependent — it
   * composes against the prior rule in the chain, not a grouped rule set.
   *
   * @param output Output label, letters only, must be unique.
   * @param shape Fuzzifier mapping a crisp input to a membership degree 0..1.
   */
  and(output: string, shape: Fuzzifier): this {
    this.checkInitCalled();
    this.checkOutputName(output);
    const type = TYPE_AND;
    this.rules.push({ output, shape, type });
    return this;
  }

  /**
   * Starts a fresh membership from this rule's own shape value, ignoring the
   * value carried from previous rules (fuzzy-OR / max is applied implicitly by
   * {@link defuzzify} picking the single highest membership across all rules).
   *
   * @param output Output label, letters only, must be unique.
   * @param shape Fuzzifier mapping a crisp input to a membership degree 0..1.
   */
  or(output: string, shape: Fuzzifier): this {
    this.checkInitCalled();
    this.checkOutputName(output);
    const type = TYPE_OR;
    this.rules.push({ output, shape, type });
    return this;
  }

  /**
   * Inverts this rule's shape value: `1 - shape(value)` (fuzzy-NOT /
   * complement). Like {@link or}, it does not depend on the carried value.
   *
   * @param output Output label, letters only, must be unique.
   * @param shape Fuzzifier mapping a crisp input to a membership degree 0..1.
   */
  not(output: string, shape: Fuzzifier): this {
    this.checkInitCalled();
    this.checkOutputName(output);
    const type = TYPE_NOT;
    this.rules.push({ output, shape, type });
    return this;
  }

  /**
   * Evaluates every rule for `value` and returns the result.
   *
   * Note on terminology: this performs **max-membership classification**, not
   * centroid / center-of-gravity defuzzification. It returns the *label* of the
   * rule with the highest membership (`defuzzified`) together with that
   * membership degree (`fuzzified`) — it does not compute a crisp output
   * number. On ties the earliest rule wins (strict greater-than).
   *
   * @param value Crisp input fed to every rule's shape.
   * @param as Optional namespace prefix for {@link DefuzzifyResult.boonJsInputs}
   *   keys, e.g. `'heat'` yields `heat.cold`. Useful when merging the inputs of
   *   several `Logic` instances for boon-js evaluation.
   * @example logic.defuzzify(10)
   */
  defuzzify(value: number, as?: string): Logic.DefuzzifyResult {
    this.checkInitCalled();
    let defuzzified = 'none';
    let fuzzified = 0;
    // Seed at 0, not -Infinity: a rule only wins with membership strictly above
    // 0. When no rule fires (every membership is 0) there is genuinely no winner,
    // so 'none' is returned instead of the first rule being reported with a
    // membership of 0 (which also kept its boonJsInputs entry wrongly true).
    let best = 0;
    // membership carried along the chain, used by AND to narrow the result
    let running = 0;

    // Defend against fuzzifiers that violate the 0..1 contract: clamp the raw
    // value (and map NaN to 0) before composing. Otherwise a rogue shape — or
    // `not` computing 1 - raw on it — could make the winner's fuzzified value
    // fall outside 0..1.
    const clamp = (v: number): number =>
      Number.isNaN(v) ? 0 : Math.min(1, Math.max(0, v));

    // Evaluate into fresh rule copies so the engine's internal state is never
    // mutated or handed out to the caller.
    const rules: Rule[] = this.rules.map((rule) => {
      const raw = clamp(rule.shape.fuzzify(value));
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
    if (as) {
      // Validate the namespace prefix with the same rule as output names, so it
      // can't inject spaces, dots or other characters into the boonJsInputs keys
      // (which are meant to be valid boon-js identifiers).
      if (typeof as !== 'string' || !/^[a-z]+$/i.test(as)) {
        throw Error(
          'The "as" namespace prefix can only be letters without space, without numbers and without special chars'
        );
      }
      namePrefix = as + '.';
    }

    const boonJsInputs: Record<string, boolean> = {};
    rules.forEach((rule) => {
      boonJsInputs[`${namePrefix}${rule.output}`] = rule.output === defuzzified;
    });

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
