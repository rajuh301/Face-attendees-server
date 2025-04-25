"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.euclideanDistance = void 0;
const euclideanDistance = (d1, d2) => {
    if (d1.length !== d2.length)
        return Infinity;
    return Math.sqrt(d1.reduce((sum, val, i) => sum + (val - d2[i]) ** 2, 0));
};
exports.euclideanDistance = euclideanDistance;
