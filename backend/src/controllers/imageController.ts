import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { ErrorHandler } from '../error/errorHandler';
import { imageService } from '../services';
import { imageRepository } from '../repositiries';

class ImageController {
    async update(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const product = await imageService.update(req);

            if (!product) {
                next(new ErrorHandler('Not found product', 404));
                return;
            }
            console.log(product);

            res.json(product);
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
            const { id } = req.params;
            await imageRepository.deleteById(Number(id));
            console.log('deleted');
        } catch (e) {
            next(e);
        }
    }
}

export const imageController = new ImageController();
