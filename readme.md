# fuzzylogic for es6

[![Build Status](https://travis-ci.org/sebs/es6-fuzz.png)](https://travis-ci.org/sebs/es6-fuzz)

```javascript
var logic = new Logic();
var res = logic
  .init('noAttack', new Triangle(0, 20, 40))
  .and('normalAttack', new Trapezoid(20, 30,90, 100))
  .and('enragedAttack', new Grade(90, 100))
  .defuzzify(99);
```

# Stuff
* http://de.slideshare.net/BCSLeicester/fuzzy-logic-in-the-real-world-2326817
