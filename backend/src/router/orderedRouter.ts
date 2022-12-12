import { Router } from 'express';

import { checkParamsMiddleware, orderedMiddleware } from '../middlewares';
import { orderedController } from '../controllers';

export const orderedRouter = Router();

orderedRouter.post(
    '',
    orderedMiddleware.isValidSaveBody,
    orderedController.save,
);

orderedRouter.patch(
    '/:id',
    checkParamsMiddleware.isValidParamsId,
    orderedMiddleware.isValidUpdateBody,
    orderedController.update,
);

orderedRouter.post(
    '/:id/:userId',
    checkParamsMiddleware.isValidParamsMoreId,
    orderedController.delete,
);
