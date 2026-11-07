import { SubscriptionModel } from '../../models/subscription.js';
import createHttpError from 'http-errors';

export const createSubscription = async (req, res, next) => {
    try {
        const { email } = req.body;

        const existingSubscription = await SubscriptionModel.findOne({ email });

        if (existingSubscription) {
          throw createHttpError(409, "Цей email вже підписаний.");}

        const newSubscription = await SubscriptionModel.create({ email });
       return res.status(201).json({
         status: 201,
         message: 'Ви успішно підписалися!',
         data: newSubscription,
    });
  } catch (error) {
    next(error);
  }
};
