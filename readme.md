# fuzzylogic for javascript

[![npm](https://img.shields.io/npm/dt/es6-fuzz.svg)](https://www.npmjs.com/package/es6-fuzz)
[![license](https://img.shields.io/github/license/sebs/es6-fuzz.svg)](https://github.com/sebs/es6-fuzz/blob/master/LICENSE.md)
[![GitHub tag](https://img.shields.io/github/tag/sebs/es6-fuzz.svg)](https://github.com/sebs/es6-fuzz)
[![Travis](https://img.shields.io/travis/sebs/es6-fuzz.svg)](https://travis-ci.org/sebs/es6-fuzz)
[![GitHub issues](https://img.shields.io/github/issues/sebs/es6-fuzz.svg)](https://github.com/sebs/es6-fuzz/issues)

Supported fuzzyfiers

* Constant
* Grade
* Reverse Grade
* Sigmoid
* Trapezoid
* Triangle

* [api docs](https://github.com/sebs/es6-fuzz)
* [changelog](./docs/changelog.md)

## Install and Usage

es6-fuzz is available as a NPM package.

```
npm install es6-fuzz
```
## Example

```javascript
const Logic = require('es6-fuzz');
var logic = new Logic();
const {Grade, Trapezoid, Triangle} = logic.c;

var res = logic
  .init('noAttack', new Triangle(0, 20, 40))
  .and('normalAttack', new Trapezoid(20, 30, 90, 100))
  .and('enragedAttack', new Grade(90, 100))
  .defuzzify(99);
```
* enraged attack

## Example 2

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Fuzzy_logic_temperature_en.svg/300px-Fuzzy_logic_temperature_en.svg.png" />

```javascript
const Logic = require('es6-fuzz');
var logic = new Logic();
const {Trapezoid} = logic.c;

var res = logic
  .init('verycold', new Trapezoid(0, 0, 8, 12))  // until 10 degrees very cold
  .and('cold', new Trapezoid(8, 12, 18, 20)) // until 12-18 around warm
  .and('hot', new Trapezoid(12, 20, 30, 100)) // all up from 30 surely  hot
  .defuzzify(99);

  console.log(res);
```

* hot

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
