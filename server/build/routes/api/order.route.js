"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../../controllers/order.controller"));
const error_wrapper_1 = require("../../middlewares/error.wrapper");
const body_validator_1 = require("../../middlewares/body.validator");
const order_joi_1 = require("../../models/validates/order.joi");
const check_jwt_1 = require("../../middlewares/check.jwt");
const check_is_staff_1 = require("../../middlewares/check.is.staff");
const router = (0, express_1.Router)();
// api/order/
router.get('/', check_jwt_1.checkJWT, check_is_staff_1.checkIsStaff, (0, error_wrapper_1.errorWrapper)(order_controller_1.default.getAll.bind(order_controller_1.default)));
// api/order/:id
router.get('/:id', check_jwt_1.checkJWT, check_is_staff_1.checkIsStaff, (0, error_wrapper_1.errorWrapper)(order_controller_1.default.findById.bind(order_controller_1.default)));
// api/order/:id
router.delete('/:id', check_jwt_1.checkJWT, check_is_staff_1.checkIsStaff, (0, error_wrapper_1.errorWrapper)(order_controller_1.default.delete.bind(order_controller_1.default)));
// api/order/
router.post('/', check_jwt_1.checkJWT, (0, body_validator_1.bodyValidator)(order_joi_1.orderSchemaCreate), (0, error_wrapper_1.errorWrapper)(order_controller_1.default.create.bind(order_controller_1.default)));
// api/order/:id
router.put('/:id', check_jwt_1.checkJWT, check_is_staff_1.checkIsStaff, (0, body_validator_1.bodyValidator)(order_joi_1.orderSchemaUpdate), (0, error_wrapper_1.errorWrapper)(order_controller_1.default.update.bind(order_controller_1.default)));
// api/order/:id/change-status
router.patch('/:id/status', check_jwt_1.checkJWT, check_is_staff_1.checkIsStaff, (0, error_wrapper_1.errorWrapper)(order_controller_1.default.chachgeStatusOrder.bind(order_controller_1.default)));
exports.default = router;
