'use strict';
import { describe, it } from 'node:test';
import assert from 'assert';
import { Grade } from '../../lib/curve/grade';
import { ReverseGrade } from '../../lib/curve/reverse-grade';
import { Triangle } from '../../lib/curve/triangle';
import { Trapezoid } from '../../lib/curve/trapezoid';

// findings.md F2: coordinates can be finite while their span overflows to
// Infinity, collapsing the ramp to 0/NaN. The constructors reject such spans.
describe('Shape span overflow', function () {
  it('Grade rejects a span that overflows to a non-finite value', function () {
    assert.throws(() => new Grade(-1e308, 1e308), /span x1 - x0 overflows/);
  });

  it('ReverseGrade rejects a span that overflows to a non-finite value', function () {
    assert.throws(() => new ReverseGrade(-1e308, 1e308), /span x1 - x0 overflows/);
  });

  it('Triangle rejects an edge span that overflows to a non-finite value', function () {
    assert.throws(() => new Triangle(-1e308, 1e308, 1.5e308), /edge span overflows/);
  });

  it('Trapezoid rejects an edge span that overflows to a non-finite value', function () {
    assert.throws(() => new Trapezoid(-1e308, 1e308, 1.6e308, 1.7e308), /edge span overflows/);
  });

  it('still accepts a large but finite span and returns the correct midpoint', function () {
    // A span of 2e307 is finite; the ramp midpoint must read 0.5, not 0/NaN.
    const g = new Grade(0, 2e307);
    assert.equal(g.fuzzify(1e307), 0.5);
  });
});
