import { Router } from 'express';

import { bedPriceController } from '../controllers';
import { priceMiddleware, checkParamsMiddleware } from '../middlewares';

export const priceRouter = Router();

priceRouter.post(
    '',
    priceMiddleware.isValidSaveBody,
    bedPriceController.saveBedPrice,
);
priceRouter.patch(
    '/:id/:userId',
    checkParamsMiddleware.isValidParamsId,
    priceMiddleware.isValidUpdateBody,
    bedPriceController.updateBedPrice,
);
