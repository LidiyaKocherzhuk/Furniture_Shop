import { Router } from 'express';

import { productTextileController } from '../controllers';
import { productTextileMiddleware } from '../middlewares';

export const productTextileRouter = Router();

productTextileRouter.post(
    '',
    productTextileMiddleware.isValidSaveBody,
    productTextileController.save,
);
