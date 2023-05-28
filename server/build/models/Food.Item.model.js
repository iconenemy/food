"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const foodItemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    food_section: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'FoodSection'
    },
    ordering_priority: {
        type: Number,
        required: true,
        default: 1
    },
    is_available: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: ''
    },
    price: {
        type: mongoose_1.Types.Decimal128,
        required: true
    }
}, {
    versionKey: false,
    timestamps: false
});
const FoodItem = (0, mongoose_1.model)('FoodItem', foodItemSchema);
exports.default = FoodItem;
