import { Router } from 'express';

import {
    authMiddleware,
    fileMiddleware,
    productMiddleware,
    checkParamsMiddleware,
} from '../middlewares';
import { productController } from '../controllers';

export const productsRouter = Router();

productsRouter.post(
    '',
    authMiddleware.checkIsAuthorized,
    // productMiddleware.checkIsSuperUser,
    productMiddleware.isValidProduct,
    fileMiddleware.checkFile,
    productController.save,
);

productsRouter.get(
    '/limit/:limit',
    checkParamsMiddleware.isValidParamsLimit,
    productController.getAll,
);

productsRouter.post(
    '/params',
    productMiddleware.isValidDataFromClient,
    productController.getManyByParams,
);

productsRouter.get(
    '/:id',
    checkParamsMiddleware.isValidParamsId,
    productController.getById,
);

productsRouter.post(
    '/filter',
    productMiddleware.isValidDataFromClient,
    productController.filterByParams,
);

productsRouter.post(
    '/sort',
    productMiddleware.isValidSortDataFromClient,
    productController.sortByParams,
);

productsRouter.post(
    '/basket/:id',
    checkParamsMiddleware.isValidParamsId,
    authMiddleware.checkIsAuthorized,
    productController.getBasketProducts,
);

productsRouter.post(
    '/ordered/:id',
    checkParamsMiddleware.isValidParamsId,
    authMiddleware.checkIsAuthorized,
    productController.getOrderedProducts,
);

productsRouter.post(
    '/likes/:id',
    checkParamsMiddleware.isValidParamsId,
    authMiddleware.checkIsAuthorized,
    productController.getLikesProducts,
);

productsRouter.patch(
    '/update/:id/:userId',
    checkParamsMiddleware.isValidParamsMoreId,
    authMiddleware.checkIsAuthorized,
    productMiddleware.checkIsSuperUser,
    productMiddleware.isValidProduct,
    fileMiddleware.checkFile,
    productController.updateById,
);

productsRouter.delete(
    '/:id/:userId',
    checkParamsMiddleware.isValidParamsMoreId,
    authMiddleware.checkIsAuthorized,
    productMiddleware.checkIsSuperUser,
    productController.deleteById,
);
