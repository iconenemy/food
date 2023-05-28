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
const payment_method_service_1 = __importDefault(require("../services/payment.method.service"));
class PaymentMethodController {
    constructor(PaymentMethodService) {
        this.PaymentMethodService = PaymentMethodService;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const docList = yield this.PaymentMethodService.getAll();
            return res.status(200).json({
                status: 200,
                docList
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const payment = yield this.PaymentMethodService.findById(id);
            if (!payment)
                return res.status(404).json({ message: `Payment method ${id} do not exist. Please, try again.` });
            yield this.PaymentMethodService.deleteById(id);
            return res.status(200).json({
                message: `${id} has been delete`,
                status: 200
            });
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = yield this.PaymentMethodService.findById(id);
            return res.status(200).json({
                status: 200,
                item
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const payment = yield this.PaymentMethodService.findByName({ name });
            if (payment)
                return res.status(400).json({ message: `Payment method ${name} has already exist` });
            yield this.PaymentMethodService.create({ name });
            res.status(201).json({
                status: 201,
                message: 'Created'
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name } = req.body;
            const payment = yield this.PaymentMethodService.findById(id);
            if (!payment)
                return res.status(404).json({ message: `Payment method ${id} do not exist. Please, try again!` });
            const nameCandidate = yield this.PaymentMethodService.findByName({ name });
            if (nameCandidate)
                return res.status(400).json({ message: `Payment method ${name} has already exist` });
            yield this.PaymentMethodService.update(id, { name });
            return res.status(200).json({
                status: 200,
                message: `Payment method ${id} has been change`
            });
        });
    }
}
exports.default = new PaymentMethodController(new payment_method_service_1.default);
