import { Router } from 'express';

import {
    checkParamsMiddleware,
    productMiddleware,
    authMiddleware,
    fileMiddleware,
} from '../middlewares';
import { textileImagesController } from '../controllers';

export const textileImagesRouter = Router();

textileImagesRouter.post(
    '/:id/:userId',
    checkParamsMiddleware.isValidParamsMoreId,
    authMiddleware.checkIsAuthorized,
    productMiddleware.checkIsSuperUser,
    fileMiddleware.checkFile,
    textileImagesController.update,
);

textileImagesRouter.delete(
    '/:id/:userId',
    checkParamsMiddleware.isValidParamsMoreId,
    authMiddleware.checkIsAuthorized,
    productMiddleware.checkIsSuperUser,
    textileImagesController.delete,
);
