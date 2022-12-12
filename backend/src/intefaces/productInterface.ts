import { IUserExtends, ProductEntity } from '../entity';

export interface IProductBasket {
    user: IUserExtends;
    products: Partial<ProductEntity>[];
    basketPriceCount: number;
}

export interface IProductOrdered {
    user: IUserExtends;
    products: Partial<ProductEntity>[];
    orderedPriceCount: number;
}

export interface IProductLike {
    user: IUserExtends;
    products: Partial<ProductEntity>[];
}
