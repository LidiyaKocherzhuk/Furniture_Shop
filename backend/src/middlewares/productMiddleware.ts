import { Response, NextFunction } from 'express';

import { IRequest } from '../intefaces';
import { productValidator } from '../validators';
import { ErrorHandler } from '../error/errorHandler';
import { userRepository } from '../repositiries';

class ProductMiddleware {
    async checkIsSuperUser(req: IRequest, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const user = await userRepository.getById(Number(userId));

            if (!user || user.role !== 'superUser') {
                next(new ErrorHandler('User does not have access', 403));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    isValidProduct(req: IRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            if (id) {
                const { value, error } = productValidator.productFromClient.validate(req.body);

                if (error) {
                    next(new ErrorHandler(error.message));
                    return;
                }

                req.updateProduct = value;
                next();
                return;
            }

            const { value, error } = productValidator.createProduct.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.product = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    async isValidDataFromClient(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = productValidator.productFromClient.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    async isValidSortDataFromClient(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { error } = productValidator.sortData.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const productMiddleware = new ProductMiddleware();
