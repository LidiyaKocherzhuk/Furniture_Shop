import { Response, NextFunction } from 'express';

import { IRequest } from '../intefaces';
import { productTextileService } from '../services';

class ProductTextileController {
    async save(req: IRequest, res: Response, next: NextFunction) {
        try {
            await productTextileService.save(req.body);
        } catch (e) {
            next(e);
        }
    }
}

export const productTextileController = new ProductTextileController();
