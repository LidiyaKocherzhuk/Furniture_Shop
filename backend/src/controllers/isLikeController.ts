import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { isLikeRepository, userRepository } from '../repositiries';

class IsLikeController {
    async saveIsLike(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            await isLikeRepository.save(req.body);
            const user = await userRepository.getById(req.body.userId);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async delete(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            await isLikeRepository.delete(req.body);
        } catch (e) {
            next(e);
        }
    }
}

export const isLikeController = new IsLikeController();
