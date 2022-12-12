import { Router } from 'express';

import { basketController } from '../controllers';
import { basketMiddleware, checkParamsMiddleware } from '../middlewares';

export const basketRouter = Router();

basketRouter.post(
    '',
    basketMiddleware.isValidSaveBody,
    basketController.save,
);
basketRouter.patch(
    '/:id',
    checkParamsMiddleware.isValidParamsId,
    basketMiddleware.isValidUpdateBody,
    basketController.update,
);
basketRouter.post(
    '/:id/:userId',
    checkParamsMiddleware.isValidParamsMoreId,
    basketController.delete,
);
