import { Feedback } from '../../models/feedback.js';

export const createFeedback = async (req, res, next) => {
  try {
    const { author, description, rate, category, date, productId } = req.body;

    if (!author || !description || !rate || !productId) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: "Будь ласка, заповніть усі обов'язкові поля (author, description, rate, productId)",
      });
    }

    const newFeedback = await Feedback.create({
      author,
      description,
      rate,
      category,
      date,
      productId,
    });

    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        feedback: newFeedback,
      },
    });
} catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: error.message,
        });
    }
    next(error);
}
};