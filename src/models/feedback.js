import { Schema, model } from 'mongoose';
const feedbackSchema = new Schema({});

export const FeedbackModel = model('feedback', feedbackSchema);
