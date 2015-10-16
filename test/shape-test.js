import { Shape } from '../lib/curve/shape';
import assert from 'assert';

describe('Shape', function() {
  it('is a function', function() {
    assert.equal(typeof Shape, 'function');
  });
  it('can create a new instance', function() {
    var shape = new Shape(0, 1, 2, 3);
    assert.equal(shape.x0, 0);
    assert.equal(shape.x1, 1);
    assert.equal(shape.x2, 2);
    assert.equal(shape.x3, 3);
  });
});
