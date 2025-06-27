'use strict';
import { describe, it  } from 'node:test';
import assert from 'assert';
import { Triangle } from '../../lib/curve/triangle';

describe('Property immutability', function() {
  describe('shape properties are read-only', function() {
    const triangle = new Triangle(0, 5, 10);
    
    it('should throw error when attempting to modify x0', function() {
      assert.throws(() => {
        'use strict';
        triangle.x0 = 100;
      }, /Cannot assign to read only property/);
    });
    
    it('should keep x0 unchanged after modification attempt', function() {
      assert.equal(triangle.x0, 0);
    });
    
    it('should keep x1 unchanged', function() {
      assert.equal(triangle.x1, 5);
    });
    
    it('should keep x2 unchanged', function() {
      assert.equal(triangle.x2, 10);
    });
  });
});