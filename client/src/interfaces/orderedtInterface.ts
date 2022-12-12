import { ICommonFields } from './commonFieldsEntity';
import { IProduct } from './productInterface';

export interface IOrderedExtends extends ICommonFields {
    productId: number;
    userId: number;
    productCount:number;
    productCountPrice:number;
}

export interface IOrdered {
    productId: number;
    userId: number;
    productCount:number;
    productCountPrice:number;
}

export interface IOrderedProdukt extends IOrderedExtends{
    product: IProduct;
}
