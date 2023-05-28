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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Token_model_1 = __importDefault(require("../models/Token.model"));
class TokenService {
    generateToken(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
        const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
        return { accessToken, refreshToken };
    }
    veriftyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
    }
    veriftyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_PRIVATE_KEY);
    }
    createToken(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token_model_1.default.create({ user_id });
        });
    }
    findTokenByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token_model_1.default.findOne({ user_id: user_id });
        });
    }
    findAndPullToken(user_id, refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Token_model_1.default.updateOne({ user_id: user_id }, { $pull: { refresh_token: refresh_token } });
        });
    }
    pushTokenByUserId(user_id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Token_model_1.default.updateOne({ user_id: user_id }, { $push: { refresh_token: token } });
        });
    }
    popTokenByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Token_model_1.default.updateOne({ user_id: user_id }, { $pop: { refresh_token: -1 } });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token_model_1.default.find();
        });
    }
}
exports.default = TokenService;
