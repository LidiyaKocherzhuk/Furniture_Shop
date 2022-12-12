import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { ErrorHandler } from '../error/errorHandler';
import { isLikeValidator } from '../validators';

class IsLikeMiddleware {
    async isValidSaveBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = isLikeValidator.save.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    async isValidDeleteBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = isLikeValidator.delete.validate(req.body);

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

export const isLikeMiddleware = new IsLikeMiddleware();
