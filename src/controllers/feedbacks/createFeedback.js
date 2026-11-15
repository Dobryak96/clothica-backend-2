import { Feedback } from '../../models/feedback.js';
import { GoodModel } from '../../models/good.js';
import { CategoryModel } from '../../models/category.js';

export const createFeedback = async (req, res, next) => {
  try {
    const { author, description, rate, productId } = req.body;

    if (!author || !description || !rate || !productId) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: "Будь ласка, заповніть усі обов'язкові поля (author, description, rate, productId)",
      });
    }

    const good = await GoodModel.findById(productId);

    if (!good) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Товар не знайдено',
      });
    }

    const category = await CategoryModel.findById(good.category);

    const newFeedback = await Feedback.create({
      author,
      description,
      rate,
      category: category ? category.name : 'Інше',
      date: new Date().toISOString().slice(0, 10),
      productId,
    });

    await GoodModel.findByIdAndUpdate(productId, {
      $push: { feedbacks: newFeedback._id },
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
