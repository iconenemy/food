"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const foodSectionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    ordering_priority: {
        type: Number,
        required: true,
        default: 1
    },
    is_available: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: false
});
const FoodSection = (0, mongoose_1.model)('FoodSection', foodSectionSchema);
exports.default = FoodSection;
