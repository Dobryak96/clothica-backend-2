import { Router } from 'express';

import {subscriptions as ctrl} from '../controllers/index.js';

const subscriptionsRouter = Router();

subscriptionsRouter.post('/', ctrl.createSubscription);

export default subscriptionsRouter;
