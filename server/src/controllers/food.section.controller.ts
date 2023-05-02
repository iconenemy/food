import { Request, Response } from 'express'
import { Types } from 'mongoose';

import FoodSectionService from '../services/food.section.service'; 
import { IFoodSection } from '../models/types/food.section.type'; 
import { TypedRequestBody } from '../utils/req.body.type';
import { TypedRequestBodyParams } from '../utils/req.body.params.types';
import { IFoodItemUpdate } from '../models/types/food.item.type';


class FoodSectionController {

    constructor (private FoodSectionSerive: FoodSectionService) {}

    async getAll(req: Request, res: Response){
        const docList: IFoodSection[] = await this.FoodSectionSerive.getAll()

        return res.status(200).json({
            status: 200,
            docList
        })
    }

    async delete (req: Request<{id: Types.ObjectId}>, res: Response) {
        const { id } = req.params

        await this.FoodSectionSerive.deleteById(id)

        return res.status(200).json({
            message: `${id} has been delete`,
            status: 200
        })
    }

    async findById (req: Request<{id: Types.ObjectId}>, res: Response){
        const { id } = req.params

        const item: IFoodSection  = await this.FoodSectionSerive.findById(id) as IFoodSection
        
        return res.status(200).json({ 
            status: 200,
            item 
        })
    }

    async create (req: TypedRequestBody<IFoodSection>, res: Response){
        const { name, ordering_priority } = req.body
        const foodSectionByName = await this.FoodSectionSerive.findByName({ name })
        if(foodSectionByName) return res.status(400).json({message: 'Food section name already exists'})

        const foodSectionByPriority = await this.FoodSectionSerive.findByOrderPriority({ ordering_priority })
        if(foodSectionByPriority) return res.status(400).json({message: 'Order priority already exists'})

        await this.FoodSectionSerive.create({...req.body})

        res.status(201).json({
            status: 201,
            message: `FoodSection has been create`
       })
    }   

    async update (req: TypedRequestBodyParams<{id: Types.ObjectId}, IFoodItemUpdate>, res: Response){
        const { id } = req.params
        const { name, ordering_priority } = req.body

        if (name){
            const foodSectionByName = await this.FoodSectionSerive.findByName({ name })
            if(foodSectionByName && foodSectionByName.id !== id) return res.status(400).json({message: 'This food section name is already in use. Please try different name.'})
        }

        if (ordering_priority){
            const foodSectionByPriority = await this.FoodSectionSerive.findByOrderPriority({ ordering_priority })
            if(foodSectionByPriority && foodSectionByPriority.id !== id) return res.status(400).json({message: 'This order priority is already in use. Please try different order priority.'})
        }

        await this.FoodSectionSerive.updateById(id, {...req.body} )  
    
        res.status(200).json({
            status: 200,
            message: `${id} has been update`
        })
    }

    
}

export default new FoodSectionController (new FoodSectionService)
