import { Router } from "express";

import { categories as ctrl } from "../controllers/index.js";
import { celebrate } from "celebrate";
import { getCategorySchema } from "../validations/categoriesValidation.js";

const categoriesRouter = Router();

categoriesRouter.get("/", celebrate(getCategorySchema), ctrl.getCategories);

export default categoriesRouter;
