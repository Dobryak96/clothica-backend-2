import { Joi, Segments } from 'celebrate';
import { uaPhone } from './phoneValidation.js';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(32)
      .pattern(/^[\p{Script=Latin}\p{Script=Cyrillic}0-9]+$/u)
      .required()
      .messages({ 'string.pattern.base': "Ім'я може містити лише літери та цифри" }),
    phone: Joi.string()
      .trim()
      .pattern(/^\+38\d{10}$/)
      .required(),
    password: Joi.string()
      .min(8)
      .max(128)
      .pattern(/^[A-Za-z0-9]+$/)
      .required()
      .messages({ 'string.pattern.base': 'Пароль може містити лише латинські літери та цифри' }),
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
