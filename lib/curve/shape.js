'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = void 0;
/** Base class representing a Shape. */
class Shape {
    x0;
    x1;
    x2;
    x3;
    /**
     * Create a Shape.
     * @param {number} x0 - x0
     * @param {number} x1 - x1
     * @param {number} x2 - x2
     * @param {number} x3 - x3
     */
    constructor(x0, x1, x2, x3) {
        Object.defineProperty(this, 'x0', {
            value: x0,
            writable: false,
        });
        Object.defineProperty(this, 'x1', {
            value: x1,
            writable: false,
        });
        Object.defineProperty(this, 'x2', {
            value: x2,
            writable: false,
        });
        Object.defineProperty(this, 'x3', {
            value: x3,
            writable: false,
        });
    }
}
exports.Shape = Shape;
//# sourceMappingURL=shape.js.map