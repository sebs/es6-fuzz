'use strict';
const { describe, it, beforeEach } = require('node:test');
const Logic = require('../../lib/logic');
const assert = require('assert');

describe('interface', () => {
  var logic;
  beforeEach(() => {
    logic = new Logic();
  });
  it('has a and method',() => {
    assert.equal(typeof logic.and, 'function');
  });
  it('has a or method', () => {
    assert.equal(typeof logic.or, 'function');
  });
  it('has a not method', () => {
    assert.equal(typeof logic.not, 'function');
  });
});