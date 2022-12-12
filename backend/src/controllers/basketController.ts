import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { basketRepository } from '../repositiries';
import { productService } from '../services';
import { ErrorHandler } from '../error/errorHandler';

class BasketController {
    async save(req: IRequest, res: Response, next: NextFunction) {
        try {
            const createdBasket = await basketRepository.save(req.body);
            const userBasket = await productService.getOrderedProduct(createdBasket.userId);

            if (!userBasket) {
                next(new ErrorHandler('Not found product', 404));
                return;
            }

            res.json(userBasket);
        } catch (e) {
            next(e);
        }
    }

    async update(req: IRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await basketRepository.update(Number(id), req.body);
        } catch (e) {
            next(e);
        }
    }

    async delete(req: IRequest, res: Response, next: NextFunction) {
        try {
            const { id, userId } = req.params;
            await basketRepository.delete(Number(id));

            const userBasket = await productService.getOrderedProduct(Number(userId));

            if (!userBasket) {
                next(new ErrorHandler('Not found product', 404));
                return;
            }

            res.json(userBasket);
        } catch (e) {
            next(e);
        }
    }
}

export const basketController = new BasketController();
