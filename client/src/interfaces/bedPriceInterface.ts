import { ICommonFields } from './commonFieldsEntity';

export interface IBedPriceExtends extends ICommonFields{
    size140_200?: string;
    size160_200?: string;
    size180_200?: string;
    size200_200?: string;
    bedId: number;
}

export interface IBedPriceToDB{
    size140_200?: string;
    size160_200?: string;
    size180_200?: string;
    size200_200?: string;
    bedId: number;
}

export interface IBedPrice {
    size140_200?: string;
    size160_200?: string;
    size180_200?: string;
    size200_200?: string;
}
