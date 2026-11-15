import createHttpError from 'http-errors';
import { UserModel } from '../../models/user.js';

export const updateCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user?._id ?? req.user?.id;

    if (!userId) {
      throw createHttpError(401, 'Not authenticated');
    }

    if (req.body.phone) {
      const phoneOwner = await UserModel.findOne({
        phone: req.body.phone,
        _id: { $ne: userId },
      });

      if (phoneOwner) {
        throw createHttpError(409, 'Phone number is already in use');
      }
    }

    const user = await UserModel.findByIdAndUpdate(userId, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
