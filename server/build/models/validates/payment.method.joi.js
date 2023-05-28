"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMethodSchemaUpdate = exports.paymentMethodSchemaCreate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.paymentMethodSchemaCreate = joi_1.default.object({
    name: joi_1.default.string().min(4).max(20).required().messages({
        'string.base': 'Name name should be a type of text',
        'string.empty': 'Name name cannot be an empty field',
        'string.min': 'Name should have a minimum length of 4',
        'string.max': 'Name should have a maximum length of 20',
        'string.required': 'Name is a required field'
    })
});
exports.paymentMethodSchemaUpdate = joi_1.default.object({
    name: joi_1.default.string().min(4).max(20).optional().messages({
        'string.base': 'Name name should be a type of text',
        'string.empty': 'Name name cannot be an empty field',
        'string.min': 'Name should have a minimum length of 4',
        'string.max': 'Name should have a maximum length of 20',
        'string.required': 'Name is a required field'
    })
});
