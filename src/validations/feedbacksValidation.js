import { Joi, Segments } from 'celebrate';

export const getFeedbacksSchema = {
  [Segments.QUERY]: Joi.object({
    productId: Joi.string().hex().length(24),
  }),
};
