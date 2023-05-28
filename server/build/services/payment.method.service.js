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
const Payment_Method_model_1 = __importDefault(require("../models/Payment.Method.model"));
class PaymentMethodService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Payment_Method_model_1.default.create(data);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Payment_Method_model_1.default.find();
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Payment_Method_model_1.default.findByIdAndDelete(id);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Payment_Method_model_1.default.findById(id);
        });
    }
    update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Payment_Method_model_1.default.findByIdAndUpdate(id, updateData);
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Payment_Method_model_1.default.findOne(name);
        });
    }
}
exports.default = PaymentMethodService;
