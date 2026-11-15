import { Router } from 'express';
import { celebrate } from 'celebrate';

import {feedbacks as ctrl} from '../controllers/index.js';
import { getFeedbacksSchema } from '../validations/feedbacksValidation.js';

const feedbacksRouter = Router();

feedbacksRouter.post('/', ctrl.createFeedback);
feedbacksRouter.get('/', celebrate(getFeedbacksSchema), ctrl.getFeedbacks);

export default feedbacksRouter;
