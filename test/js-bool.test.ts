'use strict';
import { describe, it  } from 'node:test';
import Logic from '../lib/logic';
import Triangle from '../lib/curve/triangle';
import Trapezoid from '../lib/curve/trapezoid';
import assert from 'assert';
const getEvaluator = require('boon-js').getEvaluator;

describe('js-bool test', () => {
    var logicHeat = new Logic();
    const optimalTemperature = new Triangle(10, 20, 30);
    const toColdTemperature = new Triangle(0, 10, 15);
    const toHotTemperature = new Triangle(25, 40, 60);
    
    logicHeat.init('cold', toColdTemperature)
    logicHeat.or('optimal', optimalTemperature)
    logicHeat.or('hot', toHotTemperature)
    
    var logicDistance = new Logic();
    const close = new Triangle(0, 10, 20);
    const far = new Triangle(5, 50, 100);

    logicDistance.init('close', close)
    logicDistance.or('far', far)


    it('provides output for js-bool', () => { 
        const res = logicHeat.defuzzify(20, 'heat');
        assert.ok(res.boonJsInputs);
    })

    it('jsbool output cold is false', () => { 
        const res = logicHeat.defuzzify(20);
        assert.equal(res.boonJsInputs.cold, false);
    })

    it('jsbool output hot is false', () => { 
        const res = logicHeat.defuzzify(20);
        assert.equal(res.boonJsInputs.cold, false);
    })

    it('jsbool output optimal is false', () => { 
        const res = logicHeat.defuzzify(20);
        assert.equal(res.boonJsInputs.optimal, true);
    })

    it('jsbool output cold as heat is false', () => { 
        const res = logicHeat.defuzzify(20, 'heat');
        assert.equal(res.boonJsInputs['heat.cold'], false);
    })

    it('jsbool output hot as heat is false', () => { 
        const res = logicHeat.defuzzify(20, 'heat');
        assert.equal(res.boonJsInputs['heat.hot'], false);
    })

    it('jsbool output optimal as heat is true', () => { 
        const res = logicHeat.defuzzify(20, 'heat');
        assert.equal(res.boonJsInputs['heat.optimal'], true);
    });


    describe('can combine 2 fuzzy decisions via boonJs', ()=>{
        it('monster bites when heat is cold and distance is close', ()=>{
            
            const resHeat = logicHeat.defuzzify(2, 'heat');
            const resClose = logicDistance.defuzzify(2, 'distance');
            
            const jsBoonInput = { ...resHeat.boonJsInputs, ...resClose.boonJsInputs }
            console.log(jsBoonInput);

            const monsterBiteTest = getEvaluator(
                'heat.cold AND distance.close',
            );

            const monsterSleepTest = getEvaluator(
                'heat.hot AND distance.far',
            );

            const resBite = monsterBiteTest(jsBoonInput)
            assert.equal(resBite, true);

            const resSleep = monsterSleepTest(jsBoonInput)
            assert.equal(resSleep, false);
        });
    });
});