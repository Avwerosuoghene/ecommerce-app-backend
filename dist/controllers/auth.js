"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const error_1 = require("../models/error");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
// const User = require("../models/user");
class AuthController {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            const name = req.body.name;
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                const error = new error_1.ModError('Invalid data');
                error.statusCode = 422;
                // error.data = errors.array();
                // throw error;
            }
            try {
                const hashedPw = yield bcryptjs_1.default.hash(password, 12);
                const user = new user_1.default({
                    email: email,
                    password: hashedPw,
                    name: name,
                });
                const result = yield user.save();
                res.status(201).json({ message: 'user created succesfullly', userId: result._id });
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.AuthController = AuthController;
