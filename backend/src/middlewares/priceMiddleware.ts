import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { ErrorHandler } from '../error/errorHandler';
import { priceValidator } from '../validators';

class PriceMiddleware {
    async isValidSaveBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = priceValidator.save.validate(req.body);

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
            const { error } = priceValidator.update.validate(req.body);

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

export const priceMiddleware = new PriceMiddleware();
