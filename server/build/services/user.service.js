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
const User_model_1 = __importDefault(require("../models/User.model"));
class UserService {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_model_1.default.create(data);
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_model_1.default.findOne(username);
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_model_1.default.findOne(email);
        });
    }
    findUserByPhoneNumber(phone_number) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_model_1.default.findOne(phone_number);
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_model_1.default.findById(id);
        });
    }
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_model_1.default.findByIdAndDelete(id);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_model_1.default.find();
        });
    }
    updateUserById(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_model_1.default.findByIdAndUpdate(id, updateData);
        });
    }
}
exports.default = UserService;
