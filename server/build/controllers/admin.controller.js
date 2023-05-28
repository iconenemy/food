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
const model_service_1 = __importDefault(require("../services/model.service"));
class AdminController {
    constructor(ModelService) {
        this.ModelService = ModelService;
    }
    getModels(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _modelList = this.ModelService.getModelNames();
            // Doesn't retrieve Token collection due to access restrictions
            const modelList = _modelList.filter(item => item !== 'Token');
            return res.status(200).json({
                status: 200,
                modelList
            });
        });
    }
}
exports.default = new AdminController(new model_service_1.default);
