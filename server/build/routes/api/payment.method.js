"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_wrapper_1 = require("../../middlewares/error.wrapper");
const payment_method_controller_1 = __importDefault(require("../../controllers/payment.method.controller"));
const body_validator_1 = require("../../middlewares/body.validator");
const payment_method_joi_1 = require("../../models/validates/payment.method.joi");
const check_jwt_1 = require("../../middlewares/check.jwt");
const check_is_admin_1 = require("../../middlewares/check.is.admin");
const router = (0, express_1.Router)();
// api/payment-method/
router.get('/', check_jwt_1.checkJWT, (0, error_wrapper_1.errorWrapper)(payment_method_controller_1.default.getAll.bind(payment_method_controller_1.default)));
// api/payment-method/:id
router.get('/:id', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, error_wrapper_1.errorWrapper)(payment_method_controller_1.default.findById.bind(payment_method_controller_1.default)));
// api/payment-method/:id
router.delete('/:id', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, error_wrapper_1.errorWrapper)(payment_method_controller_1.default.delete.bind(payment_method_controller_1.default)));
// api/payment-method
router.post('/', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, body_validator_1.bodyValidator)(payment_method_joi_1.paymentMethodSchemaCreate), (0, error_wrapper_1.errorWrapper)(payment_method_controller_1.default.create.bind(payment_method_controller_1.default)));
// api/payment-method/:id
router.put('/:id', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, body_validator_1.bodyValidator)(payment_method_joi_1.paymentMethodSchemaUpdate), (0, error_wrapper_1.errorWrapper)(payment_method_controller_1.default.update.bind(payment_method_controller_1.default)));
exports.default = router;
