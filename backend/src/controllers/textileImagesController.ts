import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { ErrorHandler } from '../error/errorHandler';
import { imageService } from '../services';
import { textileImageRepository, textileRepository } from '../repositiries';

class TextileImagesController {
    async update(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { image, params } = req;

            const textileForUpdate = await textileRepository.getByParams({ id: Number(params.id) });

            if (!textileForUpdate) {
                next(new ErrorHandler('Not found product', 404));
                return;
            }
            const { id } = textileForUpdate;

            await imageService.saveFile(image, id, 'textile');
            const updateTextileImages = await textileRepository.getAll();

            res.json(updateTextileImages);
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
            await textileImageRepository.deleteById(Number(id));
        } catch (e) {
            next(e);
        }
    }
}

export const textileImagesController = new TextileImagesController();
