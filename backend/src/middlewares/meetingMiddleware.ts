import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { ErrorHandler } from '../error/errorHandler';
import { meetingValidator } from '../validators';

class MeetingMiddleware {
    async isValidSaveBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = meetingValidator.save.validate(req.body);

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

export const meetingMiddleware = new MeetingMiddleware();
