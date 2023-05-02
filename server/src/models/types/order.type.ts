import { Document, Types } from 'mongoose';

export type StatusType = "new" | "processed" | "cancelled" | "delivered" | "cooking" | "in delivering" 

export type AddressType = "Hesburger near Vul. Irpins'ka, Kyiv region"

export interface IOrder extends Document {
    user: Types.ObjectId;
    food_items: Map<String, Number>,
    status: StatusType
    payment_method: Types.ObjectId,
    address: string;
    orginal_place: AddressType;
}

export interface IOrderUpdate {
    user?: Types.ObjectId;
    food_items?: Map<String, Number>,
    status?: StatusType
    payment_method?: Types.ObjectId;
    address?: string;
    orginal_place?: AddressType;
}
