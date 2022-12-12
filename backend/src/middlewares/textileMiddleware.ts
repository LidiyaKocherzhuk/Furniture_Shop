import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { ErrorHandler } from '../error/errorHandler';
import { textileValidator } from '../validators';

class TextileMiddleware {
    async isValidSaveBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { value, error } = textileValidator.save.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.textile = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    async isValidParamsBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = textileValidator.checkParams.validate(req.body);

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

export const textileMiddleware = new TextileMiddleware();
