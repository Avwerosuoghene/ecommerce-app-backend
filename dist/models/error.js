"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModError = void 0;
class ModError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, ModError.prototype);
    }
}
exports.ModError = ModError;
