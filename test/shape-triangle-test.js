import { Triangle } from '../lib/curve/triangle';
import assert from 'assert';
describe('Triangle', function() {
  it('is a function', function() {
    assert.equal(typeof Triangle, 'function');
  });
  it('can create a new instance', function() {
    var triangle = new Triangle(0, 1, 2);
    assert.equal(triangle.x0, 0);
    assert.equal(triangle.x1, 1);
    assert.equal(triangle.x2, 2);
  });
  it('fuzzify', function() {
    var triangle = new Triangle(10, 11, 12);
    var res = triangle.fuzzify(11);
    assert.equal(res, 1);
  });
});
