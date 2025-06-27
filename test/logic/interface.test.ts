'use strict';
import { describe, it, beforeEach  } from 'node:test';
import { Logic } from '../../lib/logic';
import assert from 'assert';

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