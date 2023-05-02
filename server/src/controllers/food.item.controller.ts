import { Request, Response } from 'express'
import { DocumentDefinition, Types } from 'mongoose';
import { UploadedFile } from 'express-fileupload';
import fs from 'fs'
import path from 'path'

import FoodItemService from '../services/food.item.service';
import { IFoodItem } from '../models/types/food.item.type';

class FoodSectionController {

    constructor (private FoodItemService: FoodItemService) {}

    async getAll(req: Request, res: Response){
        const docList: IFoodItem[] = await this.FoodItemService.getAll()
    
        return res.status(200).json({ 
            status: 200, 
            docList
        })
    }

    async delete (req: Request<{id: Types.ObjectId}>, res: Response) {
        const { id } = req.params

        const [foodItemData] = await this.FoodItemService.findById(id)
        if(!foodItemData) return res.status(404).json({message: `Food item with such id ${id} - not found`})
        const imgPath = path.resolve(__dirname, '../../../client/public/images', foodItemData.image)
        fs.stat(imgPath, err => {
        // check file before delete whether it exist or not
            if (err) {
                return res.status(404).json({message: 'File name or path is incorrect'})
            }
        })
        
        await this.FoodItemService.deleteById(id)
        
        fs.unlink(imgPath, err => {
            if (err) {
                return res.status(500).json(err)
            }
        })

        return res.status(200).json({
            message: `${id} has been deleted`,
            status: 200
        })
    }

    async findById (req: Request<{id: Types.ObjectId}>, res: Response){
        const { id } = req.params

        const [ item ] = await this.FoodItemService.findById(id) as IFoodItem[]
        return res.status(200).json({ 
            status: 200,
            item
        })
    }

    async create (req: Request, res: Response){
        if (!req.files) return res.status(400).json({
            status: 400,
            message: "No file uploaded"
        })
        
        const { name } = req.body as DocumentDefinition<Pick<IFoodItem, 'name'>>
        const foodItemByName = await this.FoodItemService.findByName({name})
        if (foodItemByName) { 
            return res.status(400).json({message: 'Food item name already exists'})
        }
        const { file } = req.files
        const imageFile: UploadedFile = file as UploadedFile
        imageFile.name = encodeURI(imageFile.name.replace(/\s/g, ''))
    
        await this.FoodItemService.create({...req.body, image: imageFile.name})

        const imgPath = path.resolve(__dirname, '../../../client/public/images/', imageFile.name)
        imageFile.mv(imgPath, err => {
            if (err) {
                return res.status(500).json(err)
            }
        })

        return res.status(201).json({
            status: 201,
            message: `FoodItem has been created`
        })
    }   

    async update (req: Request, res: Response){
        const { id } = req.params
        const { image } = req.body as DocumentDefinition<Pick<IFoodItem, 'image'>>
        const { name } = req.body as DocumentDefinition<Pick<IFoodItem, 'name'>>
        
        if (name){
            const foodItemByName = await this.FoodItemService.findByName({ name })
            if (foodItemByName && foodItemByName.id !== id) return res.status(400).json({message: 'This food name is already in use. Please try different name.'})
        }

        if (req.files) {
            const { file } = req?.files
            const imageFile: UploadedFile = file as UploadedFile

            imageFile.name = encodeURI(imageFile.name.replace(/\s/g, ''))
            const rootPath = path.resolve(__dirname, '../../../client/public/images/')
            fs.stat(path.resolve(rootPath, image as string), err => {
                if (err) {
                    return res.status(404).json({message: 'File name or path is incorrect'})
                }
            })

            fs.unlink(path.resolve(rootPath, image as string), err => {
                if (err) {
                    return res.status(500).json(err)
                }
            })

            imageFile.mv(path.resolve(rootPath, imageFile.name), err => {
                if (err) {
                    return res.status(500).json(err)
                }
            })
            
            await this.FoodItemService.updateById(id, {...req.body, image: imageFile.name})
            
            return res.status(200).json({
                status: 200,
                message: `${id} has been updated`
            })
        } else {
            await this.FoodItemService.updateById(id, {...req.body})  
            
            return res.status(200).json({
                status: 200,
                message: `${id} has been updated`
            })
        }

    }  
}

export default new FoodSectionController (new FoodItemService)
