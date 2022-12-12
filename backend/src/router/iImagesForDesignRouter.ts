import { Router } from 'express';

import { imageForDesignController } from '../controllers';
import { fileMiddleware, imageForDesignMiddleware } from '../middlewares';

export const imagesForDesignRouter = Router();

imagesForDesignRouter.get('', imageForDesignController.getImages);
imagesForDesignRouter.post(
    '',
    imageForDesignMiddleware.isValidSaveBody,
    fileMiddleware.checkFile,
    imageForDesignController.saveImage,
);
imagesForDesignRouter.post(
    '/params',
    imageForDesignMiddleware.isValidGetByParamsBody,
    imageForDesignController.getByParams,
);
imagesForDesignRouter.patch(
    '',
    imageForDesignMiddleware.isValidUpdateBody,
    fileMiddleware.checkFile,
    imageForDesignController.updateImage,
);
