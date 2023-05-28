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
const food_section_service_1 = __importDefault(require("../services/food.section.service"));
const food_item_service_1 = __importDefault(require("../services/food.item.service"));
class FoodController {
    constructor(FoodSectionSerive, FoodItemService) {
        this.FoodSectionSerive = FoodSectionSerive;
        this.FoodItemService = FoodItemService;
    }
    getAllFoodSectionList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.FoodSectionSerive.getAll();
            res.status(200).json({
                status: 200,
                list
            });
        });
    }
    getAllFoodItemsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, count, offset } = req.query;
            const list = yield this.FoodItemService.getAllFoodItemsByFoodSectionId(id, Number(offset), Number(count));
            if (list === null)
                res.status(404).json({ status: 200, message: 'Not found' });
            const countDoc = yield this.FoodItemService.getCountDocById(id);
            const totalPage = Math.ceil(countDoc / Number(count));
            res.status(200).json({
                status: 200,
                list,
                totalPage,
                page: offset
            });
        });
    }
    getAllFoodItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const list = yield this.FoodItemService.getListByFoodSection(id);
            if (list === null)
                res.status(404).json({ status: 200, message: 'Not found' });
            res.status(200).json({
                status: 200,
                list
            });
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const [item] = yield this.FoodItemService.findById(id);
            return res.status(200).json({
                status: 200,
                item
            });
        });
    }
}
exports.default = new FoodController(new food_section_service_1.default, new food_item_service_1.default);
