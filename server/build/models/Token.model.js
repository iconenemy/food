"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    refresh_token: [{ type: String }]
}, {
    versionKey: false,
    timestamps: true
});
const Token = (0, mongoose_1.model)('Token', tokenSchema);
exports.default = Token;
