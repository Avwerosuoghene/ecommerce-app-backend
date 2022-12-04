"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const modules_1 = __importDefault(require("./modules"));
const setHeaders_1 = __importDefault(require("./middleware/setHeaders"));
const db_1 = require("./database/db");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(setHeaders_1.default);
(0, modules_1.default)(app);
app.use((0, express_session_1.default)({ secret: 'my secret', resave: false, saveUninitialized: false }));
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});
(0, db_1.connectDb)();
// app.listen(port);
exports.default = app;
