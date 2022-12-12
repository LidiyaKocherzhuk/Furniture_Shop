import { Router } from 'express';

import {
    authMiddleware,
    fileMiddleware,
    checkParamsMiddleware,
    productMiddleware,
} from '../middlewares';
import { imageController } from '../controllers';

export const imageRouter = Router();

imageRouter.patch(
    '/:id/:userId',
    checkParamsMiddleware.isValidParamsMoreId,
    authMiddleware.checkIsAuthorized,
    productMiddleware.checkIsSuperUser,
    fileMiddleware.checkFile,
    imageController.update,
);

imageRouter.delete(
    '/:id/:userId',
    checkParamsMiddleware.isValidParamsMoreId,
    authMiddleware.checkIsAuthorized,
    productMiddleware.checkIsSuperUser,
    imageController.delete,
);
