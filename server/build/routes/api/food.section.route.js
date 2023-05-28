"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const food_section_controller_1 = __importDefault(require("../../controllers/food.section.controller"));
const error_wrapper_1 = require("../../middlewares/error.wrapper");
const body_validator_1 = require("../../middlewares/body.validator");
const food_section_joi_1 = require("../../models/validates/food.section.joi");
const check_jwt_1 = require("../../middlewares/check.jwt");
const check_is_admin_1 = require("../../middlewares/check.is.admin");
const router = (0, express_1.Router)();
// api/food-section/
router.get('/', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, error_wrapper_1.errorWrapper)(food_section_controller_1.default.getAll.bind(food_section_controller_1.default)));
// api/food-section/:id
router.get('/:id', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, error_wrapper_1.errorWrapper)(food_section_controller_1.default.findById.bind(food_section_controller_1.default)));
// api/food-section/:id
router.delete('/:id', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, error_wrapper_1.errorWrapper)(food_section_controller_1.default.delete.bind(food_section_controller_1.default)));
// api/food-section
router.post('/', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, body_validator_1.bodyValidator)(food_section_joi_1.foodSectionSchemaCreate), (0, error_wrapper_1.errorWrapper)(food_section_controller_1.default.create.bind(food_section_controller_1.default)));
// api/food-section/:id
router.put('/:id', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, body_validator_1.bodyValidator)(food_section_joi_1.foodSectionSchemaUpdate), (0, error_wrapper_1.errorWrapper)(food_section_controller_1.default.update.bind(food_section_controller_1.default)));
exports.default = router;
