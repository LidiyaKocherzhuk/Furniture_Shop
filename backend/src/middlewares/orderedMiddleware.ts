import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { ErrorHandler } from '../error/errorHandler';
import { orderedValidator } from '../validators';

class OrderedMiddleware {
    async isValidSaveBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = orderedValidator.save.validate(req.body);

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
            const { error } = orderedValidator.update.validate(req.body);

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

export const orderedMiddleware = new OrderedMiddleware();
