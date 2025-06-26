import { describe, it, beforeEach  } from 'node:test';
import assert from 'assert';
import Logic from '../lib/logic';
import Triangle from '../lib/curve/triangle';

describe('Example Test', function() {
    var fuzzyvariable_pageSize;
    beforeEach(()=>{
        const logic = new Logic();
        fuzzyvariable_pageSize = logic
            .init('Excellent', new Triangle(20, 40, 60))
            .or('Medium', new Triangle(40,60,80))
            .or('Bad', new Triangle(60,80,100))
        
    })

    it('40 is excellent', ()=>{
        assert.equal(fuzzyvariable_pageSize.defuzzify(40).defuzzified, 'Excellent');
    })
    it('60 is medium', ()=>{
        assert.equal(fuzzyvariable_pageSize.defuzzify(60).defuzzified, 'Medium');
    })
    it('80 is bad', ()=>{
        assert.equal(fuzzyvariable_pageSize.defuzzify(80).defuzzified, 'Bad');
    });
});