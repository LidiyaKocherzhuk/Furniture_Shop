import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { ErrorHandler } from '../error/errorHandler';
import { userService } from '../services';
import { userValidator } from '../validators';

class UserMiddleware {
    async checkUserById(req: IRequest, res: Response, next: NextFunction) {
        try {
            const id = req.params;
            if (!id) {
                next(new ErrorHandler('Id does not exists!', 401));
                return;
            }

            const userFromBd = await userService.userByParams(id);
            if (!userFromBd) {
                next(new ErrorHandler('User does not exists!', 401));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    async isValidUpdatePasswordBody(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { error } = userValidator.updatePassword.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message, 404));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
