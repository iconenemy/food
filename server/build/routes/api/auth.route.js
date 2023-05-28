"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_validator_1 = require("../../middlewares/body.validator");
const user_joi_1 = require("../../models/validates/user.joi");
const error_wrapper_1 = require("../../middlewares/error.wrapper");
const auth_controller_1 = __importDefault(require("../../controllers/auth.controller"));
const router = (0, express_1.Router)();
router.post('/register', (0, body_validator_1.bodyValidator)(user_joi_1.userSchemaCreate), (0, error_wrapper_1.errorWrapper)(auth_controller_1.default.register.bind(auth_controller_1.default)));
// api/auth/login
router.post('/login', (0, body_validator_1.bodyValidator)(user_joi_1.userSchemaLogin), (0, error_wrapper_1.errorWrapper)(auth_controller_1.default.login.bind(auth_controller_1.default)));
// api/auth/logout
router.get('/logout', (0, error_wrapper_1.errorWrapper)(auth_controller_1.default.logout.bind(auth_controller_1.default)));
// api/auth/refresh
router.get('/refresh', (0, error_wrapper_1.errorWrapper)(auth_controller_1.default.refresh.bind(auth_controller_1.default)));
exports.default = router;
