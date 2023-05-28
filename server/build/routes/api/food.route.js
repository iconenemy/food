"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const food_controller_1 = __importDefault(require("../../controllers/food.controller"));
const error_wrapper_1 = require("../../middlewares/error.wrapper");
const router = (0, express_1.Router)();
// TODO w.o all
// api/food/section/get-all
router.get('/public/section/all', (0, error_wrapper_1.errorWrapper)(food_controller_1.default.getAllFoodSectionList.bind(food_controller_1.default)));
// api/food/foodItem/getListById
router.post('/public/item/all', (0, error_wrapper_1.errorWrapper)(food_controller_1.default.getAllFoodItems.bind(food_controller_1.default)));
//api/food/item/get-list
router.get('/public/item/get-list', (0, error_wrapper_1.errorWrapper)(food_controller_1.default.getAllFoodItemsById.bind(food_controller_1.default)));
// api/food-item/:id/find
router.get('/public/item/:id/find', (0, error_wrapper_1.errorWrapper)(food_controller_1.default.findById.bind(food_controller_1.default)));
exports.default = router;
