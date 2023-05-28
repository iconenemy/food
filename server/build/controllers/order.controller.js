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
const order_service_1 = __importDefault(require("../services/order.service"));
const user_service_1 = __importDefault(require("../services/user.service"));
const payment_method_service_1 = __importDefault(require("../services/payment.method.service"));
class OrderController {
    constructor(OrderSerive, UserService, PaymentMethodService) {
        this.OrderSerive = OrderSerive;
        this.UserService = UserService;
        this.PaymentMethodService = PaymentMethodService;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const docList = yield this.OrderSerive.getAllOrders();
            return res.status(200).json({
                status: 200,
                docList
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const order = yield this.OrderSerive.findById(id);
            if (!order)
                return res.status(404).json({ message: `Order ${id} do not exist. Please, try again.` });
            yield this.OrderSerive.deleteById(id);
            return res.status(200).json({
                message: `${id} has been deleted`,
                status: 200
            });
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = yield this.OrderSerive.findById(id);
            return res.status(200).json({
                status: 200,
                item
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, payment_method } = req.body;
            const userData = yield this.UserService.findUserById(user);
            if (!userData)
                return res.status(404).json({ message: 'User with such id do not exist. Try again' });
            const paymentData = yield this.PaymentMethodService.findById(payment_method);
            if (!paymentData)
                return res.status(404).json({ message: 'Payment method with such id do not exist. Try again' });
            const order = yield this.OrderSerive.create(Object.assign({}, req.body));
            return res.status(201).json({
                status: 201,
                message: 'Created',
                id: order._id
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { user, payment_method } = req.body;
            const order = yield this.OrderSerive.findById(id);
            if (!order)
                return res.status(400).json({ message: `Order ${id} do not exist. Please, try again!` });
            const userData = yield this.UserService.findUserById(user);
            if (!userData)
                return res.status(400).json({ message: 'User with such id do not exist. Please, try again' });
            const paymentData = yield this.PaymentMethodService.findById(payment_method);
            if (!paymentData)
                return res.status(400).json({ message: 'Payment method with such id do not exist. Please, try again' });
            yield this.OrderSerive.update(id, Object.assign({}, req.body)).catch(error => res.status(404).json({ message: `Order status can not be equal to ${error.errors.status.value}` }));
            return res.status(200).json({
                status: 200,
                message: `${id} order has been updated`
            });
        });
    }
    chachgeStatusOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status } = req.body;
            const order = yield this.OrderSerive.findById(id);
            if (!order)
                return res.status(404).json({ message: `Order ${id} do not exist. Please, try again!` });
            yield this.OrderSerive.changeStatusOrder(id, status).catch(error => res.status(404).json({ message: `Order status can not be equal to ${error.errors.status.value}` }));
            return res.status(200).json({
                status: 200,
                message: `${id} order has been changed on status ${status}`
            });
        });
    }
}
exports.default = new OrderController(new order_service_1.default, new user_service_1.default, new payment_method_service_1.default);
