import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { bedPriceRepository, productRepository } from '../repositiries';

class BedPriceController {
    async saveBedPrice(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            await bedPriceRepository.saveBedPrice(req.body);
            const products = await productRepository.getAll(0);

            res.json(products);
        } catch (e) {
            next(e);
        }
    }

    async updateBedPrice(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await bedPriceRepository.updateBedPrice(Number(id), req.body);
            const products = await productRepository.getAll(0);

            res.json(products);
        } catch (e) {
            next(e);
        }
    }
}

export const bedPriceController = new BedPriceController();
