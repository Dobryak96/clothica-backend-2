import { Router } from "express";
import { celebrate } from "celebrate";

import { goods as ctrl } from "../controllers/index.js";
import {
  getGoodByIdSchema,
  getGoodsSchema,
} from "../validations/goodsValidation.js";

const goodsRouter = Router();

goodsRouter.get("/", celebrate(getGoodsSchema), ctrl.getGoods);
goodsRouter.get("/:goodId", celebrate(getGoodByIdSchema), ctrl.getGoodById);

export default goodsRouter;
