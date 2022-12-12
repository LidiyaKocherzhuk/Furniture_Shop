import { Router } from 'express';

import { textileController } from '../controllers';
import {
    textileMiddleware,
    fileMiddleware,
    checkParamsMiddleware,
    productMiddleware,
} from '../middlewares';

export const textileRouter = Router();

textileRouter.post(
    '',
    textileMiddleware.isValidSaveBody,
    fileMiddleware.checkFile,
    textileController.saveTextile,
);

textileRouter.get('', textileController.getAll);

textileRouter.post(
    '/getByParams',
    textileMiddleware.isValidParamsBody,
    textileController.getByParams,
);

textileRouter.patch(
    '/:id/:userId',
    checkParamsMiddleware.isValidParamsMoreId,
    productMiddleware.checkIsSuperUser,
    textileController.update,
);

textileRouter.patch(
    '/textileImages/:id/:userId',
    checkParamsMiddleware.isValidParamsMoreId,
    productMiddleware.checkIsSuperUser,
    textileController.update,
);

textileRouter.delete(
    '/:id/:userId',
    checkParamsMiddleware.isValidParamsMoreId,
    productMiddleware.checkIsSuperUser,
    textileController.delete,
);

textileRouter.delete(
    '/textileImages/:id/:userId',
    checkParamsMiddleware.isValidParamsMoreId,
    productMiddleware.checkIsSuperUser,
    textileController.delete,
);
