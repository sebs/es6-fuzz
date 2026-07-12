'use strict';
import { describe, it } from 'node:test';
import assert from 'assert';
import { SVGRenderer } from '../../lib/svg-renderer';
import { Triangle } from '../../lib/curve/triangle';

// findings.md F8: legend labels were interpolated into <text> without escaping,
// allowing SVG/script injection.
describe('SVGRenderer legend label escaping', function () {
  it('escapes markup in labels so it cannot break out of <text>', function () {
    const svg = new SVGRenderer({ showLegend: true }).renderMultiple([
      { shape: new Triangle(40, 50, 60), label: '</text><script>alert(1)</script>' },
    ]);
    assert.equal(svg.includes('<script>alert(1)</script>'), false);
    assert.equal(svg.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), true);
  });

  it('escapes ampersands and angle brackets', function () {
    const svg = new SVGRenderer({ showLegend: true }).renderMultiple([
      { shape: new Triangle(40, 50, 60), label: 'a & b < c > d' },
    ]);
    assert.equal(svg.includes('a &amp; b &lt; c &gt; d'), true);
  });

  it('renders an ordinary label unchanged', function () {
    const svg = new SVGRenderer({ showLegend: true }).renderMultiple([
      { shape: new Triangle(40, 50, 60), label: 'Warm' },
    ]);
    assert.equal(svg.includes('>Warm</text>'), true);
  });
});
