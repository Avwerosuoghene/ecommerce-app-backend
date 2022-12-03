"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
// import { Request, Response, NextFunction } from 'express'
const products_1 = __importDefault(require("./routes/products"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/auth", auth_1.default);
app.use("/cart", products_1.default);
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    console.log(status);
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});
mongoose_1.default
    .connect("mongodb+srv://kesuion:auth-08-finished@cluster0.2dtoywh.mongodb.net/speaker_app?retryWrites=true")
    .then((result) => {
    app.listen(8000);
})
    .catch((err) => {
});
