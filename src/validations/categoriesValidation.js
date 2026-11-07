import { Joi, Segments } from "celebrate";

export const getCategorySchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(20).default(6),
  }),
};
