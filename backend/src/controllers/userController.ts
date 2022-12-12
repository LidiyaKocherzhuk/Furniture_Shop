import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { userService } from '../services';
import { userRepository } from '../repositiries';

class UserController {
    async getAll(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await userRepository.getAll(req.body.limit);
            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async userById(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params;
            const userFromBd = await userService.userByParams(id);
            if (userFromBd) {
                res.status(200).json(userFromBd);
            }
        } catch (e) {
            next(e);
        }
    }

    async updateUser(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await userService.update(req.body, Number(id));
        } catch (e) {
            next(e);
        }
    }

    async delete(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await userRepository.delete(Number(id));
            const users = await userRepository.getAll(10);
            res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
