import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { ErrorHandler } from '../error/errorHandler';
import { madeOfValidator } from '../validators';

class MadeOfMiddleware {
    async isValidSaveBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = madeOfValidator.save.validate(req.body);

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

export const madeOfMiddleware = new MadeOfMiddleware();
