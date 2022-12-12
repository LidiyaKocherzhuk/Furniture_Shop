import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { imageForDesignService } from '../services';
import { imageForDesignRepository } from '../repositiries';
import { ErrorHandler } from '../error/errorHandler';

class ImageForDesignController {
    async getImages(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const images = await imageForDesignRepository.getAll();
            res.json(images);
        } catch (e) {
            next(e);
        }
    }

    async saveImage(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { body, image } = req;
            const { location, description } = body;

            if (!image?.length) {
                next(new ErrorHandler('File not exists', 404));
                return;
            }

            await imageForDesignService.saveImage(image, location, description);
            const images = await imageForDesignRepository.getAll();

            res.json(images);
        } catch (e) {
            next(e);
        }
    }

    async getByParams(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const images = await imageForDesignRepository.getByParams(req.body);
            res.json(images);
        } catch (e) {
            next(e);
        }
    }

    async updateImage(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const images = await imageForDesignService.updateImage(req);
            res.json(images);
        } catch (e) {
            next(e);
        }
    }
}

export const imageForDesignController = new ImageForDesignController();
