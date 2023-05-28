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
class FoodSectionController {
    constructor(FoodSectionSerive) {
        this.FoodSectionSerive = FoodSectionSerive;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const docList = yield this.FoodSectionSerive.getAll();
            return res.status(200).json({
                status: 200,
                docList
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield this.FoodSectionSerive.deleteById(id);
            return res.status(200).json({
                message: `${id} has been delete`,
                status: 200
            });
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = yield this.FoodSectionSerive.findById(id);
            return res.status(200).json({
                status: 200,
                item
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, ordering_priority } = req.body;
            const foodSectionByName = yield this.FoodSectionSerive.findByName({ name });
            if (foodSectionByName)
                return res.status(400).json({ message: 'Food section name already exists' });
            const foodSectionByPriority = yield this.FoodSectionSerive.findByOrderPriority({ ordering_priority });
            if (foodSectionByPriority)
                return res.status(400).json({ message: 'Order priority already exists' });
            yield this.FoodSectionSerive.create(Object.assign({}, req.body));
            res.status(201).json({
                status: 201,
                message: `FoodSection has been create`
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, ordering_priority } = req.body;
            if (name) {
                const foodSectionByName = yield this.FoodSectionSerive.findByName({ name });
                if (foodSectionByName && foodSectionByName.id !== id)
                    return res.status(400).json({ message: 'This food section name is already in use. Please try different name.' });
            }
            if (ordering_priority) {
                const foodSectionByPriority = yield this.FoodSectionSerive.findByOrderPriority({ ordering_priority });
                if (foodSectionByPriority && foodSectionByPriority.id !== id)
                    return res.status(400).json({ message: 'This order priority is already in use. Please try different order priority.' });
            }
            yield this.FoodSectionSerive.updateById(id, Object.assign({}, req.body));
            res.status(200).json({
                status: 200,
                message: `${id} has been update`
            });
        });
    }
}
exports.default = new FoodSectionController(new food_section_service_1.default);
