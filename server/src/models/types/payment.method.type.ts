import { Document } from 'mongoose';

export interface IPaymentMethod extends Document {
    name: string;
}

export interface IPaymentMethodUpdate {
    name: string;
}