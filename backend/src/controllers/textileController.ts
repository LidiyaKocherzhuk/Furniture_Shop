import { Response, NextFunction } from 'express';

import { IRequest } from '../intefaces';
import { textileRepository } from '../repositiries';
import { textileService } from '../services';
import { ErrorHandler } from '../error/errorHandler';

class TextileController {
    async getAll(req: IRequest, res: Response, next: NextFunction) {
        try {
            const textile = await textileRepository.getAll();
            res.json(textile);
        } catch (e) {
            next(e);
        }
    }

    async saveTextile(req: IRequest, res: Response, next: NextFunction) {
        try {
            const textiles = await textileService.save(req);

            if (!textiles) {
                next(new ErrorHandler('Not found data!', 404));
                return;
            }

            res.json(textiles);
        } catch (e) {
            next(e);
        }
    }

    async getByParams(req: IRequest, res: Response, next: NextFunction) {
        try {
            const productTextiles = [];
            const productTextile = await textileRepository.getByParams(req.body);
            productTextiles.push(productTextile);

            res.json(productTextiles);
        } catch (e) {
            next(e);
        }
    }

    async update(req: IRequest, res: Response, next: NextFunction) {
        try {
            const textiles = await textileService.update(req);

            if (!textiles) {
                next(new ErrorHandler('Not found data!', 404));
                return;
            }

            res.json(textiles);
        } catch (e) {
            next(e);
        }
    }

    async delete(req: IRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await textileRepository.delete(Number(id));

            const textiles = await textileRepository.getAll();
            res.json(textiles);
        } catch (e) {
            next(e);
        }
    }
}

export const textileController = new TextileController();
