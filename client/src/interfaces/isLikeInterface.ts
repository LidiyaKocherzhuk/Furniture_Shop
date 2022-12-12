import { ICommonFields } from './commonFieldsEntity';
import { IProduct } from './productInterface';

export interface IIsLikeExtends extends ICommonFields{
    userId: number;
    productId: number;
    isLike: boolean;
}

export interface IIsLike {
    userId: number;
    productId: number;
    isLike: boolean;
}

export interface IIsLikeProducts extends IIsLikeExtends {
    product: IProduct;
}
