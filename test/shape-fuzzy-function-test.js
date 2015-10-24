import { FuzzyFunction } from '../lib/curve/fuzzy-function';
import assert from 'assert';

describe('FuzzyFunction', function() {
  it('is a function', function() {
    assert.equal(typeof FuzzyFunction, 'function');
  });
  it('can create a new instance', function() {
    var ff = new FuzzyFunction(function(x) {
      return 1;
    });
    var res = ff.fuzzify(1);
    assert.equal(res, 1);
  });
});
