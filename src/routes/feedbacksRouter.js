import { Router } from 'express';

import {feedbacks as ctrl} from '../controllers/index.js';

const feedbacksRouter = Router();

feedbacksRouter.get('/', ctrl.getFeedbacks);

export default feedbacksRouter;
