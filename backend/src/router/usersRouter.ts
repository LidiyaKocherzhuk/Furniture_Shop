import { Router } from 'express';

import { authMiddleware, userMiddleware, checkParamsMiddleware } from '../middlewares';
import { userController } from '../controllers';

export const usersRouter = Router();

usersRouter.get(
    '',
    authMiddleware.checkIsAuthorized,
    userController.getAll,
);

usersRouter.get(
    '/:id',
    checkParamsMiddleware.isValidParamsId,
    authMiddleware.checkIsAuthorized,
    userMiddleware.checkUserById,
    userController.userById,
);

usersRouter.post(
    '/:id',
    checkParamsMiddleware.isValidParamsId,
    userMiddleware.isValidUpdatePasswordBody,
    userMiddleware.checkUserById,
    userController.updateUser,
);

usersRouter.delete(
    '/:id',
    checkParamsMiddleware.isValidParamsId,
    authMiddleware.checkIsAuthorized,
    userMiddleware.checkUserById,
    userController.delete,
);
