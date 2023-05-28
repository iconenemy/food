"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.tokenSchema = joi_1.default.object({
    user_id: joi_1.default.string().hex().length(24).required(),
    refresh_token: joi_1.default.array().items({ item: joi_1.default.string() }).length(2)
});