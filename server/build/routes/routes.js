"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./api/auth.route"));
const admin_route_1 = __importDefault(require("./api/admin.route"));
const food_route_1 = __importDefault(require("./api/food.route"));
const food_section_route_1 = __importDefault(require("./api/food.section.route"));
const food_item_route_1 = __importDefault(require("./api/food.item.route"));
const user_route_1 = __importDefault(require("./api/user.route"));
const order_route_1 = __importDefault(require("./api/order.route"));
const payment_method_1 = __importDefault(require("./api/payment.method"));
class AppRouter {
    constructor(app) {
        this.app = app;
    }
    init() {
        this.app.get('/', (_, res) => {
            res.status(200);
        });
        this.app.use('/api/auth', auth_route_1.default);
        this.app.use('/api/admin', admin_route_1.default);
        this.app.use('/api/food', food_route_1.default);
        this.app.use('/api/food-section', food_section_route_1.default);
        this.app.use('/api/food-item', food_item_route_1.default);
        this.app.use('/api/user', user_route_1.default);
        this.app.use('/api/order', order_route_1.default);
        this.app.use('/api/payment-method', payment_method_1.default);
    }
}
exports.default = AppRouter;
