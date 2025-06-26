'use strict';
const { describe, it } = require('node:test');
const Shape = require('../../lib/curve/shape');
const assert = require('assert');

describe('Shape', function() {
  it('is a function', function() {
    assert.equal(typeof Shape, 'function');
  });
  it('can create a new instance', function() {
    var shape = new Shape(0, 1, 2, 3);
    assert.ok(shape instanceof Shape);
  });
  it('sets x0 property correctly', function() {
    var shape = new Shape(0, 1, 2, 3);
    assert.equal(shape.x0, 0);
  });
  it('sets x1 property correctly', function() {
    var shape = new Shape(0, 1, 2, 3);
    assert.equal(shape.x1, 1);
  });
  it('sets x2 property correctly', function() {
    var shape = new Shape(0, 1, 2, 3);
    assert.equal(shape.x2, 2);
  });
  it('sets x3 property correctly', function() {
    var shape = new Shape(0, 1, 2, 3);
    assert.equal(shape.x3, 3);
  });
});
