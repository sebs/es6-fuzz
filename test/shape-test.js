import { Shape } from '../lib/shapes/shape';
import assert from 'assert';

describe('Shape', function() {
  it('is a function', function() {
    assert.equal(typeof Shape, 'function');
  });
  it('can create a new instance', function() {
    var grade = new Shape(0, 1, 2, 3);
    assert.equal(grade.x0, 0);
    assert.equal(grade.x1, 1);
    assert.equal(grade.x2, 2);
    assert.equal(grade.x3, 3);
  });
});
