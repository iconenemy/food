import { Request, Response } from 'express'

import ModelService from '../services/model.service';

class AdminController  {
    constructor (private ModelService: ModelService) {}

    async getModels(req: Request, res: Response){
        const _modelList: Array<string> = this.ModelService.getModelNames()
        
        // Doesn't retrieve Token collection due to access restrictions
        const modelList = _modelList.filter(item => item !== 'Token')
        
        return res.status(200).json({
            status: 200,
            modelList
        })
    }
}

export default new AdminController(new ModelService)
