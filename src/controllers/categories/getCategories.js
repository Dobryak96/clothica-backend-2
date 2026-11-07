import { CategoryModel } from "../../models/category.js";

export const getCategories = async (req, res) => {
  const { page, perPage } = req.query;
  const skip = (page - 1) * perPage;
  const categoriesQuery = CategoryModel.find();
  const [totalItems, categories] = await Promise.all([
    categoriesQuery.clone().countDocuments(),
    categoriesQuery.skip(skip).limit(perPage).sort({ _id: 1 }),
  ]);
  const totalPages = Math.ceil(totalItems / perPage);
  res.status(200).json({ page, perPage, totalItems, totalPages, categories });
};
