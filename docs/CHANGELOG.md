2026-06-13
==========

  * 7.0.0
  * fix: repair broken example.js and example2.js
    Both used 'var Logic = require(./lib/logic)' against named exports, so
    'new Logic()' threw 'Logic is not a constructor'. Switch to the package's
    named exports, log result.toString(), and use defuzzify values that match
    the documented output.
    Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  * docs: fix Quick Start output and example console.log
    The Quick Start defuzzified at x=40, which yields 'normalAttack', not the
    documented 'enragedAttack'. Use x=99 so the example matches its comment, and
    log result.toString() (console.log(result) printed the object, not the label)
    in both the Quick Start and Temperature examples.
    Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  * fix: reject duplicate output names
    Reusing an output name silently collapsed the entries in boonJsInputs and
    made max-membership selection ambiguous. Throw when a name is already in use.
    Also check the init precondition before the name in and/or/not so the more
    fundamental error surfaces first.
    Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  * fix: correct FuzzyFunction range error message
    The message said 'must be smaller than 1 but greater than 0' while the check
    is inclusive (res >= 0 && res <= 1) and was missing a space before the value
    ('...but is5'). Reword to 'must be between 0 and 1 but is <res>' and update
    the tests that matched the old text.
    Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  * docs: correct Sigmoid slope description
    The slope param was documented as 'higher = steeper', but it sits in the
    denominator of 1/(1+exp(-(x-center)/slope)), so a larger slope is gentler and
    a smaller slope steeper. Fix the comment to match the formula.
    Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  * fix: remove unreachable vertical branch in ReverseGrade
    The x0 === x1 handling sat inside the else of x <= x0 / x >= x1, which can
    never be reached when x0 === x1. Hoist the vertical (step-down) case to the
    top, mirroring Grade, and drop the dead code. Behaviour is unchanged.
    Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  * fix: make vertical Grade consistent with the ramp at x0
    Grade(5,5).fuzzify(5) returned 1 while the near-vertical Grade(5,5.0001)
    returned 0 at the same point - a discontinuity as x1 approaches x0. Treat the
    degenerate step as the limit of the ramp: 0 at the foot x0, 1 above it.
    Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  * fix: do not expose or mutate internal rules from defuzzify
    defuzzify injected a 'fuzzy' property onto the engine's internal rule objects
    and returned the live this.rules array, letting callers mutate engine state.
    Evaluate into fresh rule copies and return those instead.
    Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  * fix: validate Constant value is within 0..1
    Constant returned whatever value it was given, so new Constant(5) produced a
    membership of 5 and silently broke the 0..1 invariant the rule engine relies
    on (Math.min/max in the operators). Validate in the constructor, mirroring
    FuzzyFunction's range check. Update the edge-value test accordingly.
    Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  * fix: correct NOT and AND aggregation in defuzzify (max-membership)
    defuzzify was a fragile sequential pairwise comparison against the previous
    shape, with three defects:
    - NOT was never implemented: the operator ignored the rule's own shape and
    the reported 'fuzzified' used the raw shape value, not 1 - value.
    - AND blindly relabeled the output to the second operand and the reported
    'fuzzified' ignored the min() it computed.
    - ruleEngine.not had a misleading defaulted parameter before a required one.
    Rewrite as a proper max-membership defuzzifier: each rule yields a membership
    for its output (init/or = raw, and = min(running, raw), not = 1 - raw), and
    the output with the highest membership wins (ties keep the earliest rule).
    ruleEngine now uses a uniform (prev, raw) signature. Tests that encoded the
    old broken NOT/AND behavior are updated to assert the correct semantics.
    Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  * fix: give Triangle/Grade/ReverseGrade their own constructors
    These shapes inherited Shape's 4-argument constructor, so the documented
    3-arg new Triangle(0,10,20) and 2-arg new Grade(0,10) were TypeScript errors
    ("Expected 4 arguments, but got 3"). Add per-shape constructors with the
    correct arity. Also fix render-examples.ts call sites that were passing a
    bogus 4th argument and silently building degenerate shapes.
    Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  * fix: add Fuzzifier interface so Constant/Sigmoid/FuzzyFunction work with Logic
    Constant, Sigmoid and FuzzyFunction are exported as fuzzifiers but did not
    extend Shape, so passing them to Logic.init/and/or/not was a TypeScript
    error ("missing properties x0..x3"). Introduce a shared Fuzzifier interface
    implemented by all fuzzifiers (Shape included) and have Logic accept it.
    Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>

2025-07-02
==========

  * (churn): changelog
  * 6.1.0
  * feature: prettier
  * chore: updated versions
  * docs: added ts support in desc

2025-07-01
==========

  * (churn): changelog
  * 6.0.9
  * docs: readme a little updated

2025-06-27
==========

  * (churn): changelog
  * 6.0.8
  * fix: unclaude my heart again
  * 6.0.7
  * fix: changelog got lost
  * 6.0.6
  * fix: wrong folder for docs generation
  * fix: entrypoints for docs
  * 6.0.5
  * fix: less content from the repo gets published
  * chore: unclaude my heart
  * 6.0.4
  * feature: render examples
  * feature: svg renderer
  * 6.0.3
  * fix: all outputs
  * 6.0.2
  * fix: exports
  * docs: update reademe version
  * 6.0.1
  * refactor: update docs solution
  * 6.0.0
  * chore: update deps

2025-06-26
==========

  * Merge branch 'master' into refactor/convert-ts
  * (churn): changelog
  * refactor: convert to typescript
  * Create SECURITY.md
  * 5.0.1
  * refactor: cleanup of test files
  * chore: remove unused test
  * docs: add correct name of test framework
  * 5.0.0
  * 4.0.4
  * fix: edge cases
  * 4.0.3
  * refactor: cleaned up test structure
  * 4.0.2
  * docs: add a clearer test case for constant
  * fix: [#76](https://github.com/sebs/es6-fuzz/issues/76) sigmoid implementation with weird microoptimizations
    * added a different sigmoid function with easier to understand parameters

2023-01-18
==========

  * test: find the bug with trapezoid special form square

2023-01-17
==========

  * test: more tests for the trapezoid

2022-06-14
==========

  * chore: link docs
  * (churn): changelog
  * 4.0.1
  * fix: update readme
  * 4.0.0
  * feature: make the api work with boonJsInputs
  * feature: add a test for outoput names only to consist of alphabet
    letters

2022-06-11
==========

  * (churn): changelog
  * 3.0.7
  * fix: revert dep change
  * refactor: make dependencies lighter

2022-06-02
==========

  * 3.0.6
  * (churn): changelog
  * feature: chehck if init was called before any logic os performed
  * test: add another example to the tests
  * chore: remove travis config
  * chore: update dependencies

2019-01-15
==========

  * (churn): changelog
  * 3.0.5
  * Updated docs gen

2018-09-24
==========

  * Badges
  * Add text=auto
  * docs
  * Move badges to top
