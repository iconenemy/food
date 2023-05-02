import { DocumentDefinition, Types } from "mongoose";

import { IFoodItem, IFoodItemUpdate } from "../models/types/food.item.type"; 
import FoodItem from "../models/Food.Item.model"; 

export default class FoodItemService {
    async create(data: DocumentDefinition<IFoodItem>) {
        return await FoodItem.create(data)
    }

    async deleteById(id: Types.ObjectId) {
        return await FoodItem.findByIdAndDelete(id)
    }

    async updateById(id: string, updateData: DocumentDefinition<IFoodItemUpdate>) {
        return await FoodItem.findByIdAndUpdate(id, updateData)
    }

    async getAll(){
        return await FoodItem.aggregate([
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
        ])
    }

    async findById(id: Types.ObjectId) {
        //return await FoodItem.findById(id)
        return await FoodItem.aggregate([
            {
                $match: {_id: new Types.ObjectId(id)}
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
        ])
    }

    async getListByFoodSection(id: Types.ObjectId) {
        return await FoodItem.find({food_section: id})
    }

    async getAllFoodItemsByFoodSectionId(id: string, offset: number, count: number) {
        return await FoodItem.find({food_section: id}).skip((offset-1) * count).limit(count)
    }

    async findByName(name: DocumentDefinition<Pick<IFoodItem, 'name'>>) {
        return await FoodItem.findOne(name)
    }

    async getCountDocById(id: string) {
        return await FoodItem.count({food_section: id})
    }
}
