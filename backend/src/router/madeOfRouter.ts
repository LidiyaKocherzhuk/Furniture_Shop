import { Router } from 'express';

import { madeOfController } from '../controllers';
import { madeOfMiddleware } from '../middlewares';

export const madeOfRouter = Router();

madeOfRouter.post(
    '',
    madeOfMiddleware.isValidSaveBody,
    madeOfController.save,
);
madeOfRouter.get('', madeOfController.getAll);
