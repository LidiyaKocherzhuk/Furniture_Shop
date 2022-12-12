import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { productService } from '../services';
import { productRepository } from '../repositiries';
import { ErrorHandler } from '../error/errorHandler';

class ProductController {
    async save(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const createdProduct = await productService.save(req);

            if (!createdProduct) {
                next(new ErrorHandler('Not found product', 404));
                return;
            }

            res.json(createdProduct);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { limit } = req.params;
            const product = await productRepository.getAll(Number(limit));
            res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async getManyByParams(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { limit } = req.body;
            delete req.body.limit;

            const products = await productRepository.getManyByParams(req.body, limit);
            res.json(products);
        } catch (e) {
            next(e);
        }
    }

    async getById(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const product = await productRepository.getById(req.params);
            console.log(product);
            res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async filterByParams(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { price, limit } = req.body;
            delete req.body.price;
            delete req.body.limit;

            const products = await productRepository.filterByParams(
                req.body,
                Number(price),
                limit,
            );

            res.json(products);
        } catch (e) {
            next(e);
        }
    }

    async sortByParams(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const {
                sortParam,
                orderParam,
                price,
                params,
                limit,
            } = req.body;

            const products = await productRepository.sortByParams(
                sortParam,
                orderParam,
                Number(price),
                params,
                limit,
            );

            res.json(products);
        } catch (e) {
            next(e);
        }
    }

    async getBasketProducts(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const basketProdukts = await productService.getBasketProduct(Number(id));

            if (!basketProdukts) {
                next(new ErrorHandler('Not found product', 404));
                return;
            }

            res.json(basketProdukts);
        } catch (e) {
            next(e);
        }
    }

    async getOrderedProducts(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const orderedProdukts = await productService.getOrderedProduct(Number(id));

            if (!orderedProdukts) {
                next(new ErrorHandler('Not found product', 404));
                return;
            }
            res.json(orderedProdukts);
        } catch (e) {
            next(e);
        }
    }

    async getLikesProducts(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const likesProducts = await productService.getLikesProducts(Number(id));

            if (!likesProducts) {
                next(new ErrorHandler('Not found product', 404));
                return;
            }

            res.json(likesProducts);
        } catch (e) {
            next(e);
        }
    }

    async updateById(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const product = await productService.updateProductById(req);

            if (!product) {
                next(new ErrorHandler('Not found product', 404));
                return;
            }

            res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async deleteById(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            await productRepository.deleteById(Number(id));
        } catch (e) {
            next(e);
        }
    }
}

export const productController = new ProductController();
