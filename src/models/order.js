import { Schema, model } from 'mongoose';
const orderSchema = new Schema({});

export const OrderModel = model('order', orderSchema);
