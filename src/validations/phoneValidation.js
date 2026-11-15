import { Joi } from "celebrate";

export const UA_PHONE_PATTERN = /^\+380\d{9}$/;

export const uaPhone = () =>
  Joi.string()
    .trim()
    .replace(/[\s()-]/g, "")
    .pattern(UA_PHONE_PATTERN)
    .messages({
      "string.pattern.base":
        "Невірний формат номера телефону. Очікується +380XXXXXXXXX",
    });
