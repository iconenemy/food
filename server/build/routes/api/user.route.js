"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const error_wrapper_1 = require("../../middlewares/error.wrapper");
const body_validator_1 = require("../../middlewares/body.validator");
const user_joi_1 = require("../../models/validates/user.joi");
const check_jwt_1 = require("../../middlewares/check.jwt");
const check_is_admin_1 = require("../../middlewares/check.is.admin");
const check_is_staff_1 = require("../../middlewares/check.is.staff");
const router = (0, express_1.Router)();
// api/user/
router.get('/', check_jwt_1.checkJWT, check_is_staff_1.checkIsStaff, (0, error_wrapper_1.errorWrapper)(user_controller_1.default.getAll.bind(user_controller_1.default)));
// api/user/:id
router.get('/:id', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, error_wrapper_1.errorWrapper)(user_controller_1.default.findById.bind(user_controller_1.default)));
// api/user/:id
router.delete('/:id', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, error_wrapper_1.errorWrapper)(user_controller_1.default.delete.bind(user_controller_1.default)));
// api/user
router.post('/', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, body_validator_1.bodyValidator)(user_joi_1.userSchemaCreate), (0, error_wrapper_1.errorWrapper)(user_controller_1.default.create.bind(user_controller_1.default)));
// api/user/:id
router.put('/:id', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, body_validator_1.bodyValidator)(user_joi_1.userSchemaUpdate), (0, error_wrapper_1.errorWrapper)(user_controller_1.default.update.bind(user_controller_1.default)));
exports.default = router;
