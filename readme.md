# fuzzylogic for es6

[![npm](https://img.shields.io/npm/dt/es6-fuzz.svg)](https://www.npmjs.com/package/es6-fuzz)
[![license](https://img.shields.io/github/license/sebs/es6-fuzz.svg)](https://github.com/sebs/es6-fuzz/blob/master/LICENSE.md)
[![GitHub tag](https://img.shields.io/github/tag/sebs/es6-fuzz.svg)](https://github.com/sebs/es6-fuzz)
[![Travis](https://img.shields.io/travis/sebs/es6-fuzz.svg)](https://travis-ci.org/sebs/es6-fuzz)
[![GitHub issues](https://img.shields.io/github/issues/sebs/es6-fuzz.svg)](https://github.com/sebs/es6-fuzz/issues)

* [api docs](https://github.com/sebs/es6-fuzz)
* [changelog](./docs/changelog.md)

## Install and Usage

es6-fuzz is available as a NPM package.

```
npm install es6-fuzz
```

bower

Otherwise you can use bower for the browser use case. There is a browser ready export at [/dist](/dist)

```
bower install es6-fuzz
```

## Example

```javascript
var logic = new Logic();
var res = logic
  .init('noAttack', new Triangle(0, 20, 40))
  .and('normalAttack', new Trapezoid(20, 30, 90, 100))
  .and('enragedAttack', new Grade(90, 100))
  .defuzzify(99);
```

## Example 2

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Fuzzy_logic_temperature_en.svg/300px-Fuzzy_logic_temperature_en.svg.png" />



```javascript
var logic = new Logic();
var res = logic
  .init('verycold', new Triangle(new Trapezoid(0, 0, 8, 12))  // until 10 degrees very cold
  .and('cold', new Trapezoid(8, 12, 18, 20)) // until 12-18 around warm
  .and('hot', new Trapezoid(12, 20, 30, 100)) // all up from 30 surely  hot
  .defuzzify(99);

  console.log(res);
  { fuzzified: 0.9000000000000004,
  defuzzified: 'enragedAttack',
  rules:
   [ { output: 'noAttack', shape: {}, type: 'init', fuzzy: 0 },
     { output: 'normalAttack',
       shape: {},
       type: 'and',
       fuzzy: 0.09999999999999964 },
     { output: 'enragedAttack',
       shape: {},
       type: 'and',
       fuzzy: 0.9000000000000004 } ],
  toString: [Function] }
```

## development

**Tests** use mocha and a plugin for traceur

```
npm test
```

the commando resolves to

```
./node_modules/mocha/bin/mocha --compilers js:mocha-traceur
```

You **transpile to es5** with es6ify.js. The commando builds a *latest and a version number based file in dist. This is your oldschool es5 coode if you want it. Its more the browser use case.

```
node es6ify
```

You might want to do a **checkstyle** and use jscs, which seems to be fine with es6 :)

```
npm run jscs
```

* docs: npm run docs, npm run docs:site

# Stuff
* http://de.slideshare.net/BCSLeicester/fuzzy-logic-in-the-real-world-2326817
* http://computing.dcu.ie/~humphrys/Notes/Neural/sigmoid.html

## Supported Node.js

Versions: 4, 5, 6 and 7
