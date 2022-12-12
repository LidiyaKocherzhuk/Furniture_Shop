import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { ErrorHandler } from '../error/errorHandler';
import { imageForDesignValidator } from '../validators';

class ImageForDesignMiddleware {
    async isValidSaveBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = imageForDesignValidator.save.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    async isValidGetByParamsBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(req.body, 'images');
            const { error } = imageForDesignValidator.getByParams.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    async isValidUpdateBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = imageForDesignValidator.update.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const imageForDesignMiddleware = new ImageForDesignMiddleware();
