import { Router } from 'express';

import {goods as ctrl} from '../controllers/index.js';

const goodsRouter = Router();

goodsRouter.get('/', ctrl.getGoods);
goodsRouter.get('/:goodId', ctrl.getGoodById);

export default goodsRouter;
