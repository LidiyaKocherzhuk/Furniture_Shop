import { getManager, UpdateResult } from 'typeorm';

import { ProductEntity, IProduct, IProductExtends } from '../../entity';
import { IProductRepo } from './productRepoInterface';

class ProductRepository implements IProductRepo {
    save(product: IProduct): Promise<ProductEntity> {
        return getManager()
            .getRepository(ProductEntity)
            .save(product);
    }

    getAll(limit: number): Promise<ProductEntity[]> {
        return getManager().getRepository(ProductEntity).find({
            relations: [
                'images',
                'priceForAnotherSize',
                'textiles',
            ],
            take: limit,
        });
    }

    async getByParams(params: Partial<IProductExtends>): Promise<ProductEntity | undefined> {
        return getManager()
            .getRepository(ProductEntity)
            .createQueryBuilder('products')
            .where(params)
            .leftJoinAndSelect('products.images', 'images')
            .leftJoinAndSelect('products.priceForAnotherSize', 'priceForAnotherSize')
            .leftJoinAndSelect('products.textiles', 'textiles')
            .getOne();
    }

    async getById(id: Partial<IProductExtends>): Promise<ProductEntity | undefined> {
        return getManager()
            .getRepository(ProductEntity).findOne(id, {
                relations: [
                    'images',
                    'priceForAnotherSize',
                    'textiles',
                ],
            });
    }

    async getManyByParams(
        params: Partial<IProductExtends>,
        limit: number,
    ): Promise<ProductEntity[]> {
        return getManager()
            .getRepository(ProductEntity)
            .createQueryBuilder('products')
            .where(params)
            .leftJoinAndSelect('products.images', 'images')
            .leftJoinAndSelect('products.priceForAnotherSize', 'priceForAnotherSize')
            .leftJoinAndSelect('products.textiles', 'textiles')
            .take(limit)
            .getMany();
    }

    async filterByParams(
        params: Partial<IProductExtends>,
        price: number,
        limit: number,
    ): Promise<ProductEntity[]> {
        return getManager()
            .getRepository(ProductEntity)
            .createQueryBuilder('products')
            .where(params)
            .andWhere('products.price < :price', { price })
            .leftJoinAndSelect('products.images', 'images')
            .leftJoinAndSelect('products.priceForAnotherSize', 'priceForAnotherSize')
            .leftJoinAndSelect('products.textiles', 'textiles')
            .take(limit)
            .getMany();
    }

    async sortByParams(
        sortParams: string,
        order: 'ASC' | 'DESC' | undefined,
        price: number,
        params: Partial<IProduct>,
        limit: number,
    ): Promise<ProductEntity[]> {
        return getManager()
            .getRepository(ProductEntity)
            .createQueryBuilder('products')
            .leftJoinAndSelect('products.images', 'images')
            .leftJoinAndSelect('products.priceForAnotherSize', 'priceForAnotherSize')
            .leftJoinAndSelect('products.textiles', 'textiles')
            .orderBy(`products.${sortParams}`, order)
            .andWhere('products.price < :price', { price })
            .andWhere(params)
            .take(limit)
            .getMany();
    }

    async updateById(id: number, data: Partial<IProduct>): Promise<UpdateResult> {
        return getManager().getRepository(ProductEntity).update({ id }, data);
    }

    async deleteById(id: number): Promise<void> {
        await getManager().getRepository(ProductEntity).delete({ id });
    }
}

export const productRepository = new ProductRepository();
