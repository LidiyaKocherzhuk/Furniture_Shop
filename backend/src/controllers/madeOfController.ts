import { Response, NextFunction } from 'express';

import { IRequest } from '../intefaces';
import { madeOfRepository } from '../repositiries';

class MadeOfController {
    async save(req: IRequest, res: Response, next: NextFunction) {
        try {
            await madeOfRepository.save(req.body);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req: IRequest, res: Response, next: NextFunction) {
        try {
            const madeOfMaterials = await madeOfRepository.getAll();
            res.json(madeOfMaterials);
        } catch (e) {
            next(e);
        }
    }
}

export const madeOfController = new MadeOfController();
