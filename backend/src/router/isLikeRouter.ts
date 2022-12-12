import { Router } from 'express';

import { authMiddleware, isLikeMiddleware } from '../middlewares';
import { isLikeController } from '../controllers';

export const isLikeRouter = Router();

isLikeRouter.post(
    '',
    isLikeMiddleware.isValidSaveBody,
    authMiddleware.checkIsAuthorized,
    isLikeController.saveIsLike,
);
isLikeRouter.post(
    '/delete',
    isLikeMiddleware.isValidDeleteBody,
    authMiddleware.checkIsAuthorized,
    isLikeController.delete,
);
