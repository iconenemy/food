import { Model, model, Schema } from 'mongoose';

import { IOrder } from './types/order.type';

const orderSchema: Schema<IOrder> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    // keys are always strings. You specify the type of values using `of`
    food_items: { 
        type: Map,
        of: Number
    },
    status: {
        type: String,
        required: true,
        enum: ["new", "processed", "cancelled", "delivered", "in deliverng", "cooking"],
        default: "new"
    },
    payment_method: {
        type: Schema.Types.ObjectId
    },
    orginal_place: {
        type: String,
        enum: ["Hesburger near Vul. Irpins'ka, Kyiv region"],
        default: "Hesburger near Vul. Irpins'ka, Kyiv region"
    },
    address: {
        type: String,
        required: true
    }
  }, {
    versionKey: false,
    timestamps: true,
  });
  
  
const Order: Model<IOrder> = model<IOrder>('Order', orderSchema)
  
Order.schema.path('status').validate((value: string) =>
    /new|processed|cancelled|delivered|in delivering|cooking/i.test(value), 'Invalid status');

Order.schema.path('orginal_place').validate((value: string) => 
    /Hesburger near Vul. Irpins'ka, Kyiv region/i.test(value), 'Invalid original place')

export default Order;
  