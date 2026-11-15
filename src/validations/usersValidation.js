import { Joi, Segments } from 'celebrate';
import { uaPhone } from './phoneValidation.js';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(2).max(32).required(),
    phone: Joi.string()
      .trim()
      .pattern(/^\+38\d{10}$/)
      .required(),
    password: Joi.string().min(8).max(128).required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    phone: Joi.string()
      .trim()
      .pattern(/^\+38\d{10}$/)
      .required(),
    password: Joi.string().required(),
  }),
};

export const updateCurrentUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(2).max(32),
    lastName: Joi.string().trim().min(2).max(32),
    phone: uaPhone(),
    city: Joi.string().trim().min(2).max(64),
    postOffice: Joi.string().trim().min(1).max(64),
  }).min(1),
};
