# es6-fuzz

> Fuzzy Logic in JavaScript

[![npm](https://img.shields.io/npm/dt/es6-fuzz.svg)](https://www.npmjs.com/package/es6-fuzz)
[![license](https://img.shields.io/github/license/sebs/es6-fuzz.svg)](https://github.com/sebs/es6-fuzz/blob/master/LICENSE.md)
[![GitHub tag](https://img.shields.io/github/tag/sebs/es6-fuzz.svg)](https://github.com/sebs/es6-fuzz)
[![GitHub issues](https://img.shields.io/github/issues/sebs/es6-fuzz.svg)](https://github.com/sebs/es6-fuzz/issues)

## Supported Fuzzifiers

* **Constant** - Fixed membership value
* **Grade** - Linear membership function
* **Reverse Grade** - Inverted linear membership
* **Sigmoid** - S-shaped membership curve
* **Trapezoid** - Trapezoidal membership function
* **Triangle** - Triangular membership function

## Documentation

* [API Documentation](http://sebs.github.io/es6-fuzz)
* [Changelog](https://github.com/sebs/es6-fuzz/blob/master/docs/CHANGELOG.md)

## Installation

```bash
npm install es6-fuzz
```

## Quick Start

```javascript
const { Logic, Triangle, Trapezoid, Grade } = require('es6-fuzz');

const logic = new Logic();
const result = logic
  .init('noAttack', new Triangle(0, 20, 40))
  .or('normalAttack', new Trapezoid(20, 30, 90, 100))
  .or('enragedAttack', new Grade(90, 100))
  .defuzzify(40);

console.log(result); // 'enragedAttack'
```

## Temperature Example

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Fuzzy_logic_temperature_en.svg/300px-Fuzzy_logic_temperature_en.svg.png" />

```javascript
const { Logic, Trapezoid } = require('es6-fuzz');

const logic = new Logic();
const result = logic
  .init('cold', new Trapezoid(0, 12, 18, 20))   
  .or('hot', new Trapezoid(12, 14, 16, 100)) 
  .defuzzify(20);

console.log(result); // 'hot'
```


## Advanced Usage with boon-js

Combine multiple fuzzy functions with boolean logic using the boon-js compatibility layer.

### Example: Monster AI

A monster that bites when it's cold AND you're close to it:

```javascript
const { Logic, Triangle } = require('es6-fuzz');
const { getEvaluator } = require('boon-js');

// Temperature logic
const logicHeat = new Logic();
logicHeat.init('cold', new Triangle(0, 10, 15))
  .or('optimal', new Triangle(10, 20, 30))
  .or('hot', new Triangle(25, 40, 60));

// Distance logic  
const logicDistance = new Logic();
logicDistance.init('close', new Triangle(0, 10, 20))
  .or('far', new Triangle(5, 50, 100));

// Combine with boolean logic
const monsterBiteTest = getEvaluator('heat.cold AND distance.close');

const resHeat = logicHeat.defuzzify(2, 'heat');
const resClose = logicDistance.defuzzify(2, 'distance');

const jsBoonInput = { ...resHeat.boonJsInputs, ...resClose.boonJsInputs };

console.log(monsterBiteTest(jsBoonInput)); // true
```

    





## Development

### Running Tests

```bash
npm test
```

### Building Documentation

```bash
npm run docs        # Generate API docs
npm run docs:site   # Build documentation site
```

## Requirements

* Node.js 20+

## Resources

* [Fuzzy Logic in the Real World](http://de.slideshare.net/BCSLeicester/fuzzy-logic-in-the-real-world-2326817)
* [Understanding Sigmoid Functions](http://computing.dcu.ie/~humphrys/Notes/Neural/sigmoid.html)

## Related Projects

* [gaussian](https://www.npmjs.com/package/gaussian) - Gaussian distribution functions
