import { Joi, Segments } from "celebrate";
import { SIZES } from "../constants/goods.js";
import { ORDER_STATUSES } from "../constants/orders.js";
import { uaPhone } from "./phoneValidation.js";

export const createOrderSchema = {
  [Segments.BODY]: Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          good: Joi.string().hex().length(24).required(),
          size: Joi.string()
            .valid(...SIZES)
            .required(),
          quantity: Joi.number().integer().min(1).required(),
        }),
      )
      .min(1)
      .required(),
    firstName: Joi.string().trim().min(2).max(32).required(),
    lastName: Joi.string().trim().min(2).max(32).required(),
    phone: uaPhone().required(),
    city: Joi.string().trim().min(2).max(64).required(),
    postOffice: Joi.string().trim().min(1).max(64).required(),
    comment: Joi.string().trim().max(500).allow(""),
  }),
};

export const updateOrderStatusSchema = {
  [Segments.PARAMS]: Joi.object({
    orderId: Joi.string().hex().length(24).required(),
  }),
  [Segments.BODY]: Joi.object({
    status: Joi.string()
      .valid(...ORDER_STATUSES)
      .required(),
  }),
};
