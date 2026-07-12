'use strict';
import { describe, it } from 'node:test';
import assert from 'assert';
import { SVGRenderer } from '../../lib/svg-renderer';
import { Triangle } from '../../lib/curve/triangle';

// findings.md F11: an unknown legendPosition left legendX/legendY undefined and
// the legend rendered at x="undefined" y="undefined".
describe('SVGRenderer legend position validation', function () {
  it('throws on an unknown legendPosition instead of emitting undefined', function () {
    const renderer = new SVGRenderer({
      showLegend: true,
      legendPosition: 'middle' as unknown as 'top-right',
    });
    assert.throws(
      () => renderer.renderMultiple([{ shape: new Triangle(40, 50, 60), label: 'A' }]),
      /Unknown legendPosition "middle"/
    );
  });

  it('still renders a valid legend position without "undefined" coordinates', function () {
    const svg = new SVGRenderer({ showLegend: true, legendPosition: 'top-right' }).renderMultiple([
      { shape: new Triangle(40, 50, 60), label: 'A' },
    ]);
    assert.equal(svg.includes('x="undefined"'), false);
    assert.equal(svg.includes('y="undefined"'), false);
  });
});
