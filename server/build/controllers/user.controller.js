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
const user_service_1 = __importDefault(require("../services/user.service"));
const password_service_1 = __importDefault(require("../services/password.service"));
class FoodSectionController {
    constructor(UserService, PasswordService) {
        this.UserService = UserService;
        this.PasswordService = PasswordService;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const docList = yield this.UserService.getAll();
            return res.status(200).json({
                status: 200,
                docList
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield this.UserService.deleteUserById(id);
            return res.status(200).json({
                message: `${id} has been delete`,
                status: 200
            });
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = yield this.UserService.findUserById(id);
            return res.status(200).json({
                status: 200,
                item
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, phone_number } = req.body;
            const candidateByUsername = yield this.UserService.findUserByUsername({ username });
            if (candidateByUsername)
                return res.status(400).json({ message: `This username is already in use. Please try different username.` });
            const candidateByEmail = yield this.UserService.findUserByEmail({ email });
            if (candidateByEmail)
                return res.status(400).json({ message: `This email is already in use. Please try different email.` });
            const candidateByPhoneNumber = yield this.UserService.findUserByPhoneNumber({ phone_number });
            if (candidateByPhoneNumber)
                return res.status(400).json({ message: `This phone is already in use. Please try different phone.` });
            const hashPassword = yield this.PasswordService.hashPassword(password);
            const newUser = yield this.UserService.createUser(Object.assign(Object.assign({}, req.body), { password: hashPassword }));
            yield newUser.save();
            return res.status(201).json({
                message: 'User has been created',
                status: 201
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { password, username, email, phone_number } = req.body;
            if (username) {
                const userByUsername = yield this.UserService.findUserByUsername({ username });
                if (userByUsername && userByUsername.id !== id)
                    return res.status(400).json({ message: 'This username is already in use. Please try different username.' });
            }
            if (email) {
                const userByEmail = yield this.UserService.findUserByEmail({ email });
                if (userByEmail && userByEmail.id !== id)
                    return res.status(400).json({ message: 'This email is already in use. Please try different email.' });
            }
            if (phone_number) {
                const userByPhone = yield this.UserService.findUserByPhoneNumber({ phone_number });
                if (userByPhone && userByPhone.id !== id)
                    return res.status(400).json({ message: 'This phone number is already in use. Please try different phone number.' });
            }
            if (password) {
                const hashPassword = yield this.PasswordService.hashPassword(password);
                yield this.UserService.updateUserById(id, Object.assign(Object.assign({}, req.body), { password: hashPassword }));
            }
            else {
                yield this.UserService.updateUserById(id, Object.assign({}, req.body));
            }
            res.status(200).json({
                status: 200,
                message: `${id} has been update`
            });
        });
    }
}
exports.default = new FoodSectionController(new user_service_1.default, new password_service_1.default);
