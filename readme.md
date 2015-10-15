# fuzzylogic for es6

[![Build Status](https://travis-ci.org/sebs/es6-fuzz.png)](https://travis-ci.org/sebs/es6-fuzz)



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
[![Example](https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Fuzzy_logic_temperature_en.svg/300px-Fuzzy_logic_temperature_en.svg.png)](https://travis-ci.org/sebs/es6-fuzz)}


## development

* Run tests: npm test
* Rund a build: node es6ify.js
* jscs: npm run jscs
* doc generator: npm run docs
* pre-release: npm run pre-release

# Stuff
* http://de.slideshare.net/BCSLeicester/fuzzy-logic-in-the-real-world-2326817
