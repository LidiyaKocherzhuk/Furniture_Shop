import { UpdateResult } from 'typeorm';
import { ProductEntity, IProduct, IProductExtends } from '../../entity';

export interface IProductRepo{
    getAll(skip: number): Promise<ProductEntity[]>;
    save(bed: IProduct): Promise<ProductEntity>;
    getByParams(params: Partial<IProductExtends>): Promise<ProductEntity | undefined>;
    getById(id: Partial<IProductExtends>): Promise<ProductEntity | undefined>

    getManyByParams(
        params: Partial<IProductExtends>,
        limit: number,
    ):Promise<ProductEntity[]>;

    filterByParams(
        params: Partial<IProductExtends>,
        price: number,
        limit: number,
    ):Promise<ProductEntity[]>;

    sortByParams(
        sortParams: string,
        order: 'ASC' | 'DESC' | undefined,
        price: number,
        params: Partial<IProduct> | {},
        limit: number,
    ): Promise<ProductEntity[]>;

    updateById(id: number, data: Partial<IProduct>): Promise<UpdateResult>;
    deleteById(id: number): Promise<void>;
}
