"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.put("/signup", [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid email.")
        .custom((value, { req }) => {
        return user_1.default.findOne({ email: value }).then((userDoc) => {
            if (userDoc) {
                return Promise.reject("Email address already exists");
            }
        });
    })
        .normalizeEmail(),
    (0, express_validator_1.body)("password").trim().isLength({ min: 5 }).isAlphanumeric(),
    (0, express_validator_1.body)("name").trim().not().isEmpty(),
], auth_1.AuthController.signup);
router.post("/login", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Please enter a valid mail"),
    (0, express_validator_1.body)("password", "Password has to be valid.").trim().isLength({ min: 5 }).isAlphanumeric()
], auth_1.AuthController.login);
exports.default = router;
