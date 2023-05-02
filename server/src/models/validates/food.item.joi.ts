import Joi from 'joi';
import { IFoodItemUpdate } from '../types/food.item.type'; 

export const foodItemSchemaCreate = Joi.object<IFoodItemUpdate>({
    name: Joi.string().min(4).max(40).required().messages({
        'string.base': 'Name name should be a type of text',
        'string.empty': 'Name name cannot be an empty field',
        'string.min': 'Name should have a minimum length of 4',
        'string.max': 'Name should have a maximum length of 40',
        'string.required': 'Name is a required field'
    }),
    ordering_priority: Joi.number().greater(0).required().messages({
        'number.base': 'Ordering priority should be a type of number',
        'number.empty': 'Ordering priority cannot be an empty field',
        'number.greater': 'Ordering priority should be greater than 0',
    }),
    is_available: Joi.boolean(),
    price: Joi.string().regex(/^(([1-9][0-9]*))(.[0-9]+)?$/).required(),
    food_section: Joi.string().hex().length(24).required(),
    image: Joi.string().required(),
    file: Joi.binary()
})

export const foodItemSchemaUpdate = Joi.object<IFoodItemUpdate>({
    name: Joi.string().optional().min(4).max(40).messages({
        'string.base': 'Name name should be a type of text',
        'string.min': 'Name should have a minimum length of 4',
        'string.max': 'Name should have a maximum length of 40',
    }),
    ordering_priority: Joi.number().optional().greater(0).messages({
        'number.base': 'Ordering priority should be a type of number',
        'number.greater': 'Ordering priority should be greater than 0',
    }),
    is_available: Joi.boolean().optional(),
    price: Joi.string().optional().regex(/^(([1-9][0-9]*))(.[0-9]+)?$/),
    food_section: Joi.string().hex().length(24).optional(),
    image: Joi.string().optional(),
    file: Joi.binary().optional()
})



