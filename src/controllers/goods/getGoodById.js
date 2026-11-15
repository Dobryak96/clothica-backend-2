import createHttpError from "http-errors";
import { GoodModel } from "../../models/good.js";
import { getGoodsRatings } from "../../services/getGoodsRatings.js";

export const getGoodById = async (req, res) => {
  const { goodId } = req.params;
  const good = await GoodModel.findById(goodId);

  if (!good) {
    throw createHttpError(404, `Good with id ${goodId} not found`);
  }

  const ratings = await getGoodsRatings([good._id]);

  return res.json({ ...good.toJSON(), rating: ratings.get(String(good._id)) ?? 0 });
};
