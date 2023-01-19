# js-fuzzy-logic ( forked from: es6-fuzz ) 

> Fuzzy Logic in Javascript

[![npm](https://img.shields.io/npm/dt/es6-fuzz.svg)](https://www.npmjs.com/package/es6-fuzz)
[![license](https://img.shields.io/github/license/sebs/es6-fuzz.svg)](https://github.com/sebs/es6-fuzz/blob/master/LICENSE.md)
[![GitHub tag](https://img.shields.io/github/tag/sebs/es6-fuzz.svg)](https://github.com/sebs/es6-fuzz)
[![GitHub issues](https://img.shields.io/github/issues/sebs/es6-fuzz.svg)](https://github.com/sebs/es6-fuzz/issues)

Supported fuzzyfiers


* Constant
* Grade
* Reverse Grade
* Sigmoid
* Trapezoid
* Triangle


* [api docs](http://sebs.github.io/es6-fuzz)
* [changelog](https://github.com/sebs/es6-fuzz/blob/master/docs/CHANGELOG.md)

```
## Example

```javascript
var logic = new Logic();
var res = logic
  .init('noAttack', new Triangle(0, 20, 40))
  .or('normalAttack', new Trapezoid(20, 30, 90, 100))
  .or('enragedAttack', new Grade(90, 100))
	.defuzzify(40);
```
* enraged attack

## Example 2

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Fuzzy_logic_temperature_en.svg/300px-Fuzzy_logic_temperature_en.svg.png" />

```javascript
var Trapezoid = require('./lib/curve/trapezoid');

var logic = new Logic();
var res = logic
  .init('cold', new Trapezoid(0, 12, 18, 20))   
  .or('hot', new Trapezoid(12, 14, 16, 100)) 
  .defuzzify(20);

```

* hot

## Example 3: Usage of the RuleBase class
(see example-1-RuleBase.js)

## Usage with boon-js

In order to combine 2 fuzzy functions with boolean logic, there is a compat layer for boon-js which allows the sauge of 'boolean expression language'. 

Example of a monster biting when its cold and you are close to it: 
 

Heat part:

```js
var logicHeat = new Logic();
const optimalTemperature = new Triangle(10, 20, 30);
const toColdTemperature = new Triangle(0, 10, 15);
const toHotTemperature = new Triangle(25, 40, 60);

logicHeat.init('cold', toColdTemperature)
logicHeat.or('optimal', optimalTemperature)
logicHeat.or('hot', toHotTemperature);
```

Distance Part

```js

var logicDistance = new Logic();
const close = new Triangle(0, 10, 20);
const far = new Triangle(5, 50, 100);

logicDistance.init('close', close)
logicDistance.or('far', far)

```

Now we marry the 2 and use boon js

```js
const monsterBiteTest = getEvaluator(
    'heat.cold AND distance.close',
);
const resHeat = logicHeat.defuzzify(2, 'heat');
const resClose = logicDistance.defuzzify(2, 'distance');

const jsBoonInput = { ...resHeat.boonJsInputs, ...resClose.boonJsInputs }

monsterBiteTest(jsBoonInput) 
// returns true
```

    





## development

**Tests** use mocha and a plugin for traceur

```
npm test
```

* docs: npm run docs, npm run docs:site

# Stuff
* http://de.slideshare.net/BCSLeicester/fuzzy-logic-in-the-real-world-2326817
* http://computing.dcu.ie/~humphrys/Notes/Neural/sigmoid.html

## Supported Node.js Versions

Versions: 6 and 7

## Related

* https://www.npmjs.com/package/gaussian
*
