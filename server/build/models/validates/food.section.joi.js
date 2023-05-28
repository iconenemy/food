"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodSectionSchemaUpdate = exports.foodSectionSchemaCreate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.foodSectionSchemaCreate = joi_1.default.object({
    name: joi_1.default.string().min(4).max(20).required().messages({
        'string.base': 'Name name should be a type of text',
        'string.empty': 'Name name cannot be an empty field',
        'string.min': 'Name should have a minimum length of 4',
        'string.max': 'Name should have a maximum length of 20',
        'string.required': 'Name is a required field'
    }),
    ordering_priority: joi_1.default.number().greater(0).required().messages({
        'number.base': 'Ordering priority should be a type of number',
        'number.empty': 'Ordering priority cannot be an empty field',
        'number.greater': 'Ordering priority should be greater than 0',
    }),
    is_available: joi_1.default.boolean(),
});
exports.foodSectionSchemaUpdate = joi_1.default.object({
    name: joi_1.default.string().min(4).max(20).optional().messages({
        'string.base': 'Name name should be a type of text',
        'string.empty': 'Name name cannot be an empty field',
        'string.min': 'Name should have a minimum length of 4',
        'string.max': 'Name should have a maximum length of 20',
        'string.required': 'Name is a required field'
    }),
    ordering_priority: joi_1.default.number().greater(0).optional().messages({
        'number.base': 'Ordering priority should be a type of number',
        'number.empty': 'Ordering priority cannot be an empty field',
        'number.greater': 'Ordering priority should be greater than 0',
    }),
    is_available: joi_1.default.boolean().optional(),
});
