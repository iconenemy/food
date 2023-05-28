"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchemaUpdate = exports.orderSchemaCreate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.orderSchemaCreate = joi_1.default.object({
    user: joi_1.default.string().hex().length(24).required(),
    food_items: joi_1.default.required(),
    status: joi_1.default.string().valid('new', 'processed', 'cancelled', 'delivered').required(),
    payment_method: joi_1.default.string().hex().length(24).required(),
    orginal_place: joi_1.default.string().valid("Hesburger near Vul. Irpins'ka, Kyiv region").required(),
    address: joi_1.default.string().required()
});
exports.orderSchemaUpdate = joi_1.default.object({
    user: joi_1.default.string().hex().length(24).optional(),
    food_items: joi_1.default.optional(),
    status: joi_1.default.string().valid('new', 'processed', 'cancelled', 'delivered').optional(),
    payment_method: joi_1.default.string().hex().length(24).optional(),
    orginal_place: joi_1.default.string().valid("Hesburger near Vul. Irpins'ka, Kyiv region").optional(),
    address: joi_1.default.string().optional()
});
