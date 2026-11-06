import { Router } from 'express';

import {goods as ctrl} from '../controllers/index.js';

const goodsRouter = Router();

goodsRouter.get('/', ctrl.getGoods);

export default goodsRouter;
