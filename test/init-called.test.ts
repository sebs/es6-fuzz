import { describe, it  } from 'node:test';
import assert from 'assert';
import Logic from '../lib/logic';
import Triangle from '../lib/curve/triangle';

describe('Example Test', function() {
    
    it('init needs to be called before using logic', ()=>{

        assert.throws(()=>{
            const logic = new Logic();
            fuzzyvariable_pageSize = logic
                .or('Excellent', new Triangle(20, 40, 60))     
        });
    });
    
});
