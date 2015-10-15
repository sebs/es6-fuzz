# fuzzylogic for es6

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
