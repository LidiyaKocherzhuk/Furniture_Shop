import { ICommonFields } from './commonFieldsEntity';
import { IProduct } from './productInterface';

export interface IBasketExtends extends ICommonFields {
    productId: number;
    userId: number;
    productCount:number;
    productCountPrice:number;
}

export interface IBasket {
    productId: number;
    userId: number;
    productCount:number;
    productCountPrice:number;
}

export interface IBasketProdukt extends IBasketExtends{
    product: IProduct;
}
