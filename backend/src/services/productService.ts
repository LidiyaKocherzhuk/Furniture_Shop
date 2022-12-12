import { IRequest } from '../intefaces';
import {
    productRepository,
    userRepository,
    basketRepository, orderedRepository,
} from '../repositiries';
import {
    IProductExtends,
    ProductEntity,
} from '../entity';
import { imageService } from './imageService';
import { IProductBasket, IProductLike, IProductOrdered } from '../intefaces/productInterface';

class ProductService {
    async save(req: IRequest): Promise<ProductEntity | undefined> {
        const { product, image } = req;

        if (product) {
            const createdProduct = await productRepository.save(product);
            const { id, type } = createdProduct;

            await imageService.saveFile(image, id, type);

            return createdProduct;
        }
        return undefined;
    }

    async updateProductById(req: IRequest): Promise<IProductExtends | undefined> {
        const { params, updateProduct } = req;
        const { id } = params;

        const productForUpdate = await productRepository.getById({ id: Number(id) });

        if (productForUpdate && updateProduct) {
            await productRepository.updateById(Number(id), updateProduct);
            return productRepository.getById({ id: Number(id) });
        }
        return undefined;
    }

    async getBasketProduct(id: number): Promise<IProductBasket | undefined> {
        const user = await userRepository.getById(id);
        const products = [];

        if (user) {
            for (const item of user.basket) {
                products.push({
                    ...item,
                    product: await productRepository.getByParams({ id: item.productId }),
                });
            }

            const priceCount = await basketRepository.getBasketPriceCount(id);
            if (priceCount) {
                return { user, products, basketPriceCount: priceCount.basketPriceCount };
            }
            return { user, products, basketPriceCount: 0 };
        }

        return undefined;
    }

    async getOrderedProduct(id: number): Promise<IProductOrdered | undefined> {
        const user = await userRepository.getById(id);
        const products = [];

        if (user) {
            for (const item of user.ordered) {
                products.push({
                    ...item,
                    product: await productRepository.getByParams({ id: item.productId }),
                });
            }

            const priceCount = await orderedRepository.getOrderedPriceCount(id);
            if (priceCount) {
                return { user, products, orderedPriceCount: priceCount.orderedPriceCount };
            }

            return { user, products, orderedPriceCount: 0 };
        }

        return undefined;
    }

    async getLikesProducts(id: number): Promise<IProductLike | undefined> {
        const user = await userRepository.getById(id);
        const products = [];

        if (user) {
            for (const item of user.likes) {
                products.push({
                    ...item,
                    product: await productRepository.getByParams({ id: item.productId }),
                });
            }

            return { user, products };
        }
        return undefined;
    }
}

export const productService = new ProductService();
