import { Schema, model } from 'mongoose';

const subscriptionSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const SubscriptionModel = model('subscription', subscriptionSchema);
