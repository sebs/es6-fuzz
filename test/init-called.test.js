const assert = require('assert');
const Logic = require('../lib/logic');
const Triangle = require('../lib/curve/triangle');

describe('Example Test', function() {
    
    it('init needs to be called before using logic', ()=>{

        assert.throws(()=>{
            const logic = new Logic();
            fuzzyvariable_pageSize = logic
                .or('Excellent', new Triangle(20, 40, 60))     
        });
    });
    
});
