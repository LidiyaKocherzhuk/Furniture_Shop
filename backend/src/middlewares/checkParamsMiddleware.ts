import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { ErrorHandler } from '../error/errorHandler';
import { paramsValidator } from '../validators';

class CheckParamsMiddleware {
    async isValidParamsId(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(req.params);
            const { error } = paramsValidator.checkOneId.validate(req.params);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    async isValidParamsMoreId(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = paramsValidator.checkMoreId.validate(req.params);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    async isValidParamsLimit(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = paramsValidator.checkLimit.validate(req.params);

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

export const checkParamsMiddleware = new CheckParamsMiddleware();
