import { Feedback } from "../models/feedback.js";

export const getGoodsRatings = async (goodIds) => {
  const ratings = await Feedback.aggregate([
    { $match: { productId: { $in: goodIds } } },
    { $group: { _id: "$productId", rating: { $avg: "$rate" } } },
  ]);

  return new Map(
    ratings.map(({ _id, rating }) => [String(_id), Math.round(rating * 10) / 10]),
  );
};
