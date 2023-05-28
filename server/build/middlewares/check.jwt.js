"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: 'Unauthorized' });
            }
            else {
                req.access = decoded;
                next();
            }
        });
    }
    else {
        return res.status(405).json({ msg: 'No token provided.' });
    }
};
exports.checkJWT = checkJWT;
