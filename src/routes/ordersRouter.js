import { Router } from 'express';

import {orders as ctrl} from '../controllers/index.js';
import { authenticate } from '../middlewares/authenticate.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';

const ordersRouter = Router();

ordersRouter.post('/', ctrl.createOrder);
ordersRouter.get('/', authenticate, ctrl.getOrders);
ordersRouter.patch('/:orderId/status', authenticate, requireAdmin, ctrl.updateOrderStatus);

export default ordersRouter;
