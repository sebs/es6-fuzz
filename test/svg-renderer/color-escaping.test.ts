'use strict';
import { describe, it } from 'node:test';
import assert from 'assert';
import { SVGRenderer } from '../../lib/svg-renderer';
import { Triangle } from '../../lib/curve/triangle';

// findings.md F9: color/style option values were interpolated into attributes
// without escaping, so a value containing `"` could break out and inject markup.
describe('SVGRenderer color/style attribute escaping', function () {
  it('does not let strokeColor break out of the fill attribute', function () {
    const svg = new SVGRenderer({
      gridLines: false,
      strokeColor: '"/><script>alert(2)</script>',
    }).render(new Triangle(40, 50, 60));
    assert.equal(svg.includes('<script>alert(2)</script>'), false);
    assert.equal(svg.includes('&quot;/&gt;&lt;script&gt;'), true);
  });

  it('escapes a quote in the background color', function () {
    const svg = new SVGRenderer({
      gridLines: false,
      backgroundColor: '"><rect/>',
    }).render(new Triangle(40, 50, 60));
    assert.equal(svg.includes('"><rect/>'), false);
    assert.equal(svg.includes('&quot;&gt;&lt;rect/&gt;'), true);
  });

  it('leaves an ordinary hex color intact', function () {
    const svg = new SVGRenderer({ gridLines: false, strokeColor: '#2563eb' }).render(
      new Triangle(40, 50, 60)
    );
    assert.equal(svg.includes('stroke="#2563eb"'), true);
  });
});
