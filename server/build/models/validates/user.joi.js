"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaLogin = exports.userSchemaUpdate = exports.userSchemaCreate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchemaCreate = joi_1.default.object({
    username: joi_1.default.string().lowercase().min(6).max(20).required().messages({
        'string.base': 'User name should be a type of text',
        'string.empty': 'User name cannot be an empty field',
        'string.min': 'User name should have a minimum length of 6',
        'string.max': 'User name should have a maximum length of 20',
        'string.required': 'User name is a required field'
    }),
    email: joi_1.default.string().email().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email cannot be an empty field',
        'string.domain': 'Email shoud have a domain length of 2',
    }),
    password: joi_1.default.string().min(8).max(20).required().messages({
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password should have a minimum length of 8',
        'string.max': 'Password should have a maximum length of 20',
        'string.required': 'Password is a required field'
    }),
    first_name: joi_1.default.string().pattern(/^[A-Z]{1}[a-z]+$/).min(3).max(15).messages({
        'string.pattern.base': 'First name should contain letters only and the first letter should be a capital',
        'string.empty': 'First name cannot be an empty field',
        'string.min': 'First name should have a minimum length of 3',
        'string.max': 'First name should have a maximum length of 15'
    }),
    last_name: joi_1.default.string().pattern(/^[A-Z]{1}[a-z]+$/).min(3).max(20).messages({
        'string.pattern.base': 'Last name should contain letters only and the first letter should be a capital',
        'string.empty': 'Last name cannot be an empty field',
        'string.min': 'Last name should have a minimum length of 3',
        'string.max': 'Last name should have a maximum length of 20'
    }),
    age: joi_1.default.number().greater(14).messages({
        'number.base': 'Age should be a type of number',
        'number.empty': 'Age cannot be an empty field',
        'number.greater': 'Age should be greater than 10',
    }),
    phone_number: joi_1.default.string().pattern(/^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/).messages({
        'string.pattern.base': 'Phone number should contain 10 symbols and start from 0',
        'string.empty': 'Phone number cannot be an empty field',
    }),
    role: joi_1.default.string().valid("admin", "staff", "guest").optional(),
    is_active: joi_1.default.boolean()
});
exports.userSchemaUpdate = joi_1.default.object({
    username: joi_1.default.string().lowercase().min(6).max(20).optional().messages({
        'string.base': 'User name should be a type of text',
        'string.empty': 'User name cannot be an empty field',
        'string.min': 'User name should have a minimum length of 6',
        'string.max': 'User name should have a maximum length of 20',
        'string.required': 'User name is a required field'
    }),
    email: joi_1.default.string().email().optional().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email cannot be an empty field',
        'string.domain': 'Email shoud have a domain length of 2',
    }),
    password: joi_1.default.string().min(8).max(20).optional().messages({
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password should have a minimum length of 8',
        'string.max': 'Password should have a maximum length of 20',
        'string.required': 'Password is a required field'
    }),
    first_name: joi_1.default.string().pattern(/^[A-Z]{1}[a-z]+$/).min(3).max(15).optional().messages({
        'string.pattern.base': 'First name should contain letters only and the first letter should be a capital',
        'string.empty': 'First name cannot be an empty field',
        'string.min': 'First name should have a minimum length of 3',
        'string.max': 'First name should have a maximum length of 15'
    }),
    last_name: joi_1.default.string().pattern(/^[A-Z]{1}[a-z]+$/).min(3).max(20).optional().messages({
        'string.pattern.base': 'Last name should contain letters only and the first letter should be a capital',
        'string.empty': 'Last name cannot be an empty field',
        'string.min': 'Last name should have a minimum length of 3',
        'string.max': 'Last name should have a maximum length of 20'
    }),
    age: joi_1.default.number().greater(14).optional().messages({
        'number.base': 'Age should be a type of number',
        'number.empty': 'Age cannot be an empty field',
        'number.greater': 'Age should be greater than 10',
    }),
    phone_number: joi_1.default.string().pattern(/^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/).optional().messages({
        'string.pattern.base': 'Phone number should contain 10 symbols and start from 0',
        'string.empty': 'Phone number cannot be an empty field',
    }),
    role: joi_1.default.string().valid("admin", "staff", "guest").optional(),
    is_active: joi_1.default.boolean().optional()
});
exports.userSchemaLogin = joi_1.default.object({
    username: joi_1.default.string().lowercase().min(6).max(20).required().messages({
        'string.base': 'User name should be a type of text',
        'string.empty': 'User name cannot be an empty field',
        'string.min': 'User name should have a minimum length of 6',
        'string.max': 'User name should have a maximum length of 20',
        'string.required': 'User name is a required field'
    }),
    password: joi_1.default.string().min(8).max(20).required().messages({
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password should have a minimum length of 8',
        'string.max': 'Password should have a maximum length of 20',
        'string.required': 'Password is a required field'
    })
});
