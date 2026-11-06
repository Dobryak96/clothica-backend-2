import { Router } from 'express';

import {users as ctrl} from '../controllers/index.js';
import { authenticate } from '../middlewares/authenticate.js';

const usersRouter = Router();

usersRouter.get('/current', authenticate, ctrl.getCurrentUser);
usersRouter.patch('/current', authenticate, ctrl.updateCurrentUser);

export default usersRouter;
