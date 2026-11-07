import { GoodModel } from "../../models/good.js";

export const getGoods = async (req, res) => {
  try {
    const { page = 1, perPage = 10, category } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedPerPage = parseInt(perPage, 10);
    const skip = (parsedPage - 1) * parsedPerPage;

    const filter = {};
    if (category) {
      filter.category = category;
    }

    const goodsQuery = GoodModel.find(filter);
    const [totalItems, goods] = await Promise.all([
      goodsQuery.clone().countDocuments(),
      goodsQuery.skip(skip).limit(parsedPerPage).sort({ _id: 1 }),
    ]);

    const totalPages = Math.ceil(totalItems / parsedPerPage);

    res.status(200).json({
      page: parsedPage,
      perPage: parsedPerPage,
      totalItems,
      totalPages,
      goods,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
