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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const food_item_service_1 = __importDefault(require("../services/food.item.service"));
class FoodSectionController {
    constructor(FoodItemService) {
        this.FoodItemService = FoodItemService;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const docList = yield this.FoodItemService.getAll();
            return res.status(200).json({
                status: 200,
                docList
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const [foodItemData] = yield this.FoodItemService.findById(id);
            if (!foodItemData)
                return res.status(404).json({ message: `Food item with such id ${id} - not found` });
            const imgPath = path_1.default.resolve(__dirname, '../../../client/public/images', foodItemData.image);
            fs_1.default.stat(imgPath, err => {
                // check file before delete whether it exist or not
                if (err) {
                    return res.status(404).json({ message: 'File name or path is incorrect' });
                }
            });
            yield this.FoodItemService.deleteById(id);
            fs_1.default.unlink(imgPath, err => {
                if (err) {
                    return res.status(500).json(err);
                }
            });
            return res.status(200).json({
                message: `${id} has been deleted`,
                status: 200
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.files)
                return res.status(400).json({
                    status: 400,
                    message: "No file uploaded"
                });
            const { name } = req.body;
            const foodItemByName = yield this.FoodItemService.findByName({ name });
            if (foodItemByName) {
                return res.status(400).json({ message: 'Food item name already exists' });
            }
            const { file } = req.files;
            const imageFile = file;
            imageFile.name = encodeURI(imageFile.name.replace(/\s/g, ''));
            yield this.FoodItemService.create(Object.assign(Object.assign({}, req.body), { image: imageFile.name }));
            const imgPath = path_1.default.resolve(__dirname, '../../../client/public/images/', imageFile.name);
            imageFile.mv(imgPath, err => {
                if (err) {
                    return res.status(500).json(err);
                }
            });
            return res.status(201).json({
                status: 201,
                message: `FoodItem has been created`
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { image } = req.body;
            const { name } = req.body;
            if (name) {
                const foodItemByName = yield this.FoodItemService.findByName({ name });
                if (foodItemByName && foodItemByName.id !== id)
                    return res.status(400).json({ message: 'This food name is already in use. Please try different name.' });
            }
            if (req.files) {
                const { file } = req === null || req === void 0 ? void 0 : req.files;
                const imageFile = file;
                imageFile.name = encodeURI(imageFile.name.replace(/\s/g, ''));
                const rootPath = path_1.default.resolve(__dirname, '../../../client/public/images/');
                fs_1.default.stat(path_1.default.resolve(rootPath, image), err => {
                    if (err) {
                        return res.status(404).json({ message: 'File name or path is incorrect' });
                    }
                });
                fs_1.default.unlink(path_1.default.resolve(rootPath, image), err => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                });
                imageFile.mv(path_1.default.resolve(rootPath, imageFile.name), err => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                });
                yield this.FoodItemService.updateById(id, Object.assign(Object.assign({}, req.body), { image: imageFile.name }));
                return res.status(200).json({
                    status: 200,
                    message: `${id} has been updated`
                });
            }
            else {
                yield this.FoodItemService.updateById(id, Object.assign({}, req.body));
                return res.status(200).json({
                    status: 200,
                    message: `${id} has been updated`
                });
            }
        });
    }
}
exports.default = new FoodSectionController(new food_item_service_1.default);
