import { Schema, model } from 'mongoose';
const goodSchema = new Schema({});

export const GoodModel = model('good', goodSchema);
