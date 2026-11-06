import {Schema, model} from 'mongoose';
import './good.js';

const feedbackSchema = new Schema(
    {
        author:{
          type: String,
          required: true,
          trim: true,
        },
        description:{
          type: String,
          required: true,
        },
        rate:{
          type: Number,
          min:1,
          max:5,
          required: true,
        },
        category:{
          type: String,
          required: true,
        },
        date:{
          type: String,
          required: true,
        },
        productId:{
          type: Schema.Types.ObjectId,
          ref: "good",
          required:true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
export const Feedback = model('Feedback', feedbackSchema);