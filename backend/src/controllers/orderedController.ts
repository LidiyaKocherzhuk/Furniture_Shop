import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { orderedRepository } from '../repositiries';
import { productService } from '../services';
import { ErrorHandler } from '../error/errorHandler';

class OrderedController {
    async save(req: IRequest, res: Response, next: NextFunction) {
        try {
            const createdOrdered = await orderedRepository.save(req.body);
            const userOrdered = await productService.getOrderedProduct(createdOrdered.userId);

            if (!userOrdered) {
                next(new ErrorHandler('Not found product', 404));
                return;
            }

            res.json(userOrdered);
        } catch (e) {
            next(e);
        }
    }

    async update(req: IRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await orderedRepository.update(Number(id), req.body);
        } catch (e) {
            next(e);
        }
    }

    async delete(req: IRequest, res: Response, next: NextFunction) {
        try {
            const { id, userId } = req.params;
            await orderedRepository.delete(Number(id));

            const userOrdered = await productService.getOrderedProduct(Number(userId));

            if (!userOrdered) {
                next(new ErrorHandler('Not found product', 404));
                return;
            }

            res.json(userOrdered);
        } catch (e) {
            next(e);
        }
    }
}

export const orderedController = new OrderedController();
