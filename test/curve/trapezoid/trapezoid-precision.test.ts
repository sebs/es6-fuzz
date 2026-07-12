'use strict';
import { describe, it } from 'node:test';
import assert from 'assert';
import { Grade } from '../../../lib/curve/grade';
import { Triangle } from '../../../lib/curve/triangle';
import { Trapezoid } from '../../../lib/curve/trapezoid';

// findings.md F3: the Trapezoid ramps used the numerically unstable "split form"
// that Grade/Triangle had abandoned, producing wrong memberships and a spurious
// discontinuity at large coordinates. The stable form must match Grade/Triangle.
describe('Trapezoid ramp precision at large coordinates', function () {
  it('rising edge matches Grade/Triangle exactly at base 1e15', function () {
    const grade = new Grade(1e15, 1e15 + 3).fuzzify(1e15 + 1);
    const triangle = new Triangle(1e15, 1e15 + 3, 1e15 + 6).fuzzify(1e15 + 1);
    const trap = new Trapezoid(1e15, 1e15 + 3, 1e15 + 6, 1e15 + 9).fuzzify(1e15 + 1);
    assert.equal(grade, 1 / 3);
    assert.equal(triangle, 1 / 3);
    assert.equal(trap, 1 / 3);
  });

  it('rising edge is accurate (~1 ulp) at base 1e16', function () {
    const trap = new Trapezoid(1e16, 1e16 + 12, 1e16 + 50, 1e16 + 100);
    // Previously returned 0.75 (an 8.3% error); the stable form gives 10/12.
    assert.equal(trap.fuzzify(1e16 + 10), 10 / 12);
  });

  it('rising edge approaches the plateau continuously (no 0.5 jump)', function () {
    const trap = new Trapezoid(1e16, 1e16 + 6, 1e16 + 50, 1e16 + 100);
    // Just below x1 the membership should be ~4/6, not 0.5, so the step up to
    // the plateau value 1 is ~1/3 rather than a spurious 0.5.
    assert.equal(trap.fuzzify(1e16 + 4), 4 / 6);
    assert.equal(trap.fuzzify(1e16 + 6), 1);
  });

  it('falling edge is accurate at large coordinates', function () {
    const trap = new Trapezoid(0, 10, 1e16, 1e16 + 12);
    // 10 units into the falling edge of width 12 => 2/12 remaining.
    assert.equal(trap.fuzzify(1e16 + 10), 2 / 12);
  });
});
