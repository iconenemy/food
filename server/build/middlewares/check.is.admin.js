"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkIsAdmin = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        const { role } = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        role === 'admin' ? next() : res.status(405).json({ message: 'Do not has permission' });
    }
    else {
        return res.status(405).json({ msg: 'No token provided.' });
    }
};
exports.checkIsAdmin = checkIsAdmin;
