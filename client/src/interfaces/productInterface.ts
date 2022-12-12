import { ICommonFields } from './commonFieldsEntity';
import { IImage } from './imageInterface';
import { IBedPriceExtends } from './bedPriceInterface';

export interface IProduct extends ICommonFields{
    model: string;
    slats?: string;
    decor?: string;
    price: string;
    headboardHeight?: string;
    sidewallsHeight?: string;
    dimensionsOfTheProduct?: string;
    legs?: string;
    mechanism?: string;
    isNovelty?: string;
    isPopular?: string;
    anotherDetails?: string;
    type: string;
    materials?: string;
    images: IImage[];
    priceForAnotherSize: IBedPriceExtends[];
    textiles: IProductTextile[];
}

export interface ISortProduct {
    sortParam: string;
    orderParam: 'ASC' | 'DESC' | undefined;
    price: string;
    params: Partial<IProduct>;
    limit: number;
}

export interface IProductLimit extends IProduct{
    limit: number;
}

export interface IProductTextile extends ICommonFields {
    productId: number;
    textileId: number;
}
