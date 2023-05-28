"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentMethodSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    versionKey: false,
    timestamps: false
});
const PaymentMethod = (0, mongoose_1.model)('PaymentMethod', paymentMethodSchema);
exports.default = PaymentMethod;
