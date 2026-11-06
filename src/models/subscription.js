import { Schema, model } from 'mongoose';
const subscriptionSchema = new Schema({});

export const SubscriptionModel = model('subscription', subscriptionSchema);
