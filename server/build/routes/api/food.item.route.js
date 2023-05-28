"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_wrapper_1 = require("../../middlewares/error.wrapper");
const food_item_controller_1 = __importDefault(require("../../controllers/food.item.controller"));
const body_validator_1 = require("../../middlewares/body.validator");
const food_item_joi_1 = require("../../models/validates/food.item.joi");
const check_jwt_1 = require("../../middlewares/check.jwt");
const check_is_admin_1 = require("../../middlewares/check.is.admin");
const router = (0, express_1.Router)();
// api/food-item/
router.get('/', (0, error_wrapper_1.errorWrapper)(food_item_controller_1.default.getAll.bind(food_item_controller_1.default)));
// api/food-item/:id
router.get('/:id', (0, error_wrapper_1.errorWrapper)(food_item_controller_1.default.findById.bind(food_item_controller_1.default)));
// api/food-item/:id
router.delete('/:id', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, error_wrapper_1.errorWrapper)(food_item_controller_1.default.delete.bind(food_item_controller_1.default)));
// api/food-item/
router.post('/', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, body_validator_1.bodyValidator)(food_item_joi_1.foodItemSchemaCreate), (0, error_wrapper_1.errorWrapper)(food_item_controller_1.default.create.bind(food_item_controller_1.default)));
// api/food-item/:id
router.put('/:id', check_jwt_1.checkJWT, check_is_admin_1.checkIsAdmin, (0, body_validator_1.bodyValidator)(food_item_joi_1.foodItemSchemaUpdate), (0, error_wrapper_1.errorWrapper)(food_item_controller_1.default.update.bind(food_item_controller_1.default)));
exports.default = router;
