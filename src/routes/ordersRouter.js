import { Router } from 'express';

import {orders as ctrl} from '../controllers/index.js';

const ordersRouter = Router();

ordersRouter.post('/', ctrl.createOrder);

export default ordersRouter;
