"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_model_1 = __importDefault(require("../models/Order.model"));
class OrderService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Order_model_1.default.create(data);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Order_model_1.default.find();
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Order_model_1.default.findByIdAndDelete(id);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Order_model_1.default.findById(id);
        });
    }
    update(id, updateDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Order_model_1.default.findByIdAndUpdate(id, updateDate, { runValidators: true });
        });
    }
    changeStatusOrder(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Order_model_1.default.findByIdAndUpdate(id, { status: status }, { runValidators: true });
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Order_model_1.default.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: "user",
                        foreignField: "_id",
                        as: 'user',
                        pipeline: [
                            {
                                $project: {
                                    _id: 1,
                                    username: 1
                                }
                            }
                        ]
                    },
                },
                { $unwind: '$user' },
                {
                    $lookup: {
                        from: 'paymentmethods',
                        localField: 'payment_method',
                        foreignField: "_id",
                        as: "payment_method"
                    }
                },
                { $unwind: '$payment_method' }
            ]);
        });
    }
}
exports.default = OrderService;
