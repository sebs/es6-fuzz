# es6-fuzz [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Fuzzy Logic in Javascript

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
