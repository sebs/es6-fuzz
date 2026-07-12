'use strict';
import { describe, it } from 'node:test';
import assert from 'assert';
import { SVGRenderer } from '../../lib/svg-renderer';
import { Triangle } from '../../lib/curve/triangle';

// findings.md F10: a zero-width/height domain crashed (infinite grid loop ->
// RangeError) or produced NaN/Infinity path coordinates.
describe('SVGRenderer degenerate domain', function () {
  it('rejects xMax === xMin', function () {
    assert.throws(() => new SVGRenderer({ xMin: 50, xMax: 50 }), /requires xMax > xMin/);
  });

  it('rejects yMax === yMin', function () {
    assert.throws(() => new SVGRenderer({ yMin: 1, yMax: 1 }), /requires yMax > yMin/);
  });

  it('rejects reversed x bounds', function () {
    assert.throws(() => new SVGRenderer({ xMin: 100, xMax: 0 }), /requires xMax > xMin/);
  });

  it('renders a valid domain without NaN/Infinity in the path', function () {
    const svg = new SVGRenderer({ xMin: 0, xMax: 100 }).render(new Triangle(40, 50, 60));
    assert.equal(/NaN|Infinity/.test(svg), false);
  });
});
