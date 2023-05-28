"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodItemSchemaUpdate = exports.foodItemSchemaCreate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.foodItemSchemaCreate = joi_1.default.object({
    name: joi_1.default.string().min(4).max(40).required().messages({
        'string.base': 'Name name should be a type of text',
        'string.empty': 'Name name cannot be an empty field',
        'string.min': 'Name should have a minimum length of 4',
        'string.max': 'Name should have a maximum length of 40',
        'string.required': 'Name is a required field'
    }),
    ordering_priority: joi_1.default.number().greater(0).required().messages({
        'number.base': 'Ordering priority should be a type of number',
        'number.empty': 'Ordering priority cannot be an empty field',
        'number.greater': 'Ordering priority should be greater than 0',
    }),
    is_available: joi_1.default.boolean(),
    price: joi_1.default.string().regex(/^(([1-9][0-9]*))(.[0-9]+)?$/).required(),
    food_section: joi_1.default.string().hex().length(24).required(),
    image: joi_1.default.string().required(),
    file: joi_1.default.binary()
});
exports.foodItemSchemaUpdate = joi_1.default.object({
    name: joi_1.default.string().optional().min(4).max(40).messages({
        'string.base': 'Name name should be a type of text',
        'string.min': 'Name should have a minimum length of 4',
        'string.max': 'Name should have a maximum length of 40',
    }),
    ordering_priority: joi_1.default.number().optional().greater(0).messages({
        'number.base': 'Ordering priority should be a type of number',
        'number.greater': 'Ordering priority should be greater than 0',
    }),
    is_available: joi_1.default.boolean().optional(),
    price: joi_1.default.string().optional().regex(/^(([1-9][0-9]*))(.[0-9]+)?$/),
    food_section: joi_1.default.string().hex().length(24).optional(),
    image: joi_1.default.string().optional(),
    file: joi_1.default.binary().optional()
});
