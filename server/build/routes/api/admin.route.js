"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../../controllers/admin.controller"));
const error_wrapper_1 = require("../../middlewares/error.wrapper");
const check_jwt_1 = require("../../middlewares/check.jwt");
const check_is_staff_1 = require("../../middlewares/check.is.staff");
const router = (0, express_1.Router)();
// api/admin/models
router.get('/models', check_jwt_1.checkJWT, check_is_staff_1.checkIsStaff, (0, error_wrapper_1.errorWrapper)(admin_controller_1.default.getModels.bind(admin_controller_1.default)));
exports.default = router;
