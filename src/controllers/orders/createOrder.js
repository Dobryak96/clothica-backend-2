import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import { customAlphabet } from "nanoid";
import { GoodModel } from "../../models/good.js";
import { OrderModel } from "../../models/order.js";
import { Session } from "../../models/session.js";

const generateOrderNumber = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);
const MAX_NUMBER_ATTEMPTS = 5;

const saveWithUniqueNumber = async (order) => {
  for (let attempt = 1; ; attempt += 1) {
    order.number = generateOrderNumber();
    try {
      return await order.save();
    } catch (error) {
      const isDuplicateNumber = error?.code === 11000 && error?.keyPattern?.number;
      if (!isDuplicateNumber || attempt >= MAX_NUMBER_ATTEMPTS) throw error;
    }
  }
};

const getUserIdFromSession = async (req) => {
  const { accessToken, sessionId } = req.cookies ?? {};
  if (!accessToken || !isValidObjectId(sessionId)) return null;
  const session = await Session.findOne({ _id: sessionId, accessToken });
  if (!session || session.accessTokenValidUntil <= new Date()) return null;
  return session.userId;
};

export const createOrder = async (req, res, next) => {
  try {
    const { items, firstName, lastName, phone, city, postOffice, comment } =
      req.body;

    const userId = await getUserIdFromSession(req);

    const goods = await GoodModel.find({
      _id: { $in: items.map(({ good }) => good) },
    });
    const goodsById = new Map(goods.map((good) => [good.id, good]));

    const orderItems = items.map(({ good: goodId, size, quantity }) => {
      const good = goodsById.get(goodId);

      if (!good) {
        throw createHttpError(404, `Товар ${goodId} не знайдено`);
      }

      if (!good.size.includes(size)) {
        throw createHttpError(
          400,
          `Розмір ${size} недоступний для товару ${goodId}`,
        );
      }

      return { good: good._id, size, quantity, price: good.price.value };
    });

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = new OrderModel({
      items: orderItems,
      firstName,
      lastName,
      phone,
      city,
      postOffice,
      comment,
      total,
      user: userId,
    });

    await saveWithUniqueNumber(order);

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};
