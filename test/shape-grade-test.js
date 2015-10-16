import { Grade } from '../lib/curve/grade';
import assert from 'assert';

describe('Grade', function() {
  it('is a function', function() {
    assert.equal(typeof Grade, 'function');
  });
  it('can create a new instance', function() {
    var grade = new Grade(0, 1);
    assert.equal(grade.x0, 0);
    assert.equal(grade.x1, 1);
  });
  it('fuzzify', function() {
    var grade = new Grade(0,10);
    var res = grade.fuzzify(5);
    assert.equal(res, 0.5);
  });
});
