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
const mongoose_1 = require("mongoose");
const Food_Item_model_1 = __importDefault(require("../models/Food.Item.model"));
class FoodItemService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Food_Item_model_1.default.create(data);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Food_Item_model_1.default.findByIdAndDelete(id);
        });
    }
    updateById(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Food_Item_model_1.default.findByIdAndUpdate(id, updateData);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Food_Item_model_1.default.aggregate([
                {
                    $lookup: {
                        from: 'foodsections',
                        localField: 'food_section',
                        foreignField: '_id',
                        as: 'food_section',
                        pipeline: [
                            {
                                $project: {
                                    _id: 1,
                                    name: 1
                                }
                            }
                        ]
                    }
                },
                {
                    $unwind: '$food_section'
                }
            ]);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //return await FoodItem.findById(id)
            return yield Food_Item_model_1.default.aggregate([
                {
                    $match: { _id: new mongoose_1.Types.ObjectId(id) }
                },
                {
                    $limit: 1
                },
                {
                    $lookup: {
                        from: 'foodsections',
                        localField: 'food_section',
                        foreignField: '_id',
                        as: 'food_section',
                        pipeline: [
                            {
                                $project: {
                                    _id: 1,
                                    name: 1
                                }
                            }
                        ]
                    }
                },
                {
                    $unwind: '$food_section'
                },
            ]);
        });
    }
    getListByFoodSection(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Food_Item_model_1.default.find({ food_section: id });
        });
    }
    getAllFoodItemsByFoodSectionId(id, offset, count) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Food_Item_model_1.default.find({ food_section: id }).skip((offset - 1) * count).limit(count);
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Food_Item_model_1.default.findOne(name);
        });
    }
    getCountDocById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Food_Item_model_1.default.count({ food_section: id });
        });
    }
}
exports.default = FoodItemService;
