import { Router } from 'express';

import { authController } from '../controllers';
import { authMiddleware, checkParamsMiddleware, fileMiddleware } from '../middlewares';

export const authRouter = Router();

authRouter.post(
    '/registration',
    authMiddleware.isValidRegistrationBody,
    authMiddleware.checkRegistration,
    fileMiddleware.checkFile,
    authController.registration,
);

authRouter.post(
    '/login',
    authMiddleware.isValidLoginBody,
    authMiddleware.checkLogin,
    authController.logIn,
);

authRouter.delete(
    '/logout/:id',
    checkParamsMiddleware.isValidParamsId,
    authController.logOut,
);

authRouter.post(
    '/refresh',
    authMiddleware.isValidRefreshBody,
    authMiddleware.checkRefresh,
    authController.refresh,
);

authRouter.post(
    '/forgotPassword',
    authMiddleware.isValidForgotBody,
    authController.forgotPassController,
);
