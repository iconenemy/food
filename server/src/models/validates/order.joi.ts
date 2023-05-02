import Joi from 'joi';
import { IOrder, IOrderUpdate } from '../types/order.type';

export const orderSchemaCreate = Joi.object<IOrder>({
    user: Joi.string().hex().length(24).required(),
    food_items: Joi.required(),
    status: Joi.string().valid('new', 'processed', 'cancelled', 'delivered').required(),
    payment_method: Joi.string().hex().length(24).required(),
    orginal_place: Joi.string().valid("Hesburger near Vul. Irpins'ka, Kyiv region").required(),
    address: Joi.string().required()
})

export const orderSchemaUpdate = Joi.object<IOrderUpdate>({
    user: Joi.string().hex().length(24).optional(),
    food_items: Joi.optional(),
    status: Joi.string().valid('new', 'processed', 'cancelled', 'delivered').optional(),
    payment_method: Joi.string().hex().length(24).optional(),
    orginal_place: Joi.string().valid("Hesburger near Vul. Irpins'ka, Kyiv region").optional(),
    address: Joi.string().optional()
})
