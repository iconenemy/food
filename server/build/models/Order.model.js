"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    // keys are always strings. You specify the type of values using `of`
    food_items: {
        type: Map,
        of: Number
    },
    status: {
        type: String,
        required: true,
        enum: ["new", "processed", "cancelled", "delivered", "in deliverng", "cooking"],
        default: "new"
    },
    payment_method: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    orginal_place: {
        type: String,
        enum: ["Hesburger near Vul. Irpins'ka, Kyiv region"],
        default: "Hesburger near Vul. Irpins'ka, Kyiv region"
    },
    address: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true,
});
const Order = (0, mongoose_1.model)('Order', orderSchema);
Order.schema.path('status').validate((value) => /new|processed|cancelled|delivered|in delivering|cooking/i.test(value), 'Invalid status');
Order.schema.path('orginal_place').validate((value) => /Hesburger near Vul. Irpins'ka, Kyiv region/i.test(value), 'Invalid original place');
exports.default = Order;
