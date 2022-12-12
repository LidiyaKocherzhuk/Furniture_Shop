import { ICommonFields } from './commonFieldsEntity';

export interface ITextileExtends extends ICommonFields{
    productId?: number;
    manufacturer: string;
    textileName: string;
    types: string;
    numberOfShades?: string;
    antiClaw?: string;
    waterRepellent?: string;
    easyToCare?: string;
    durability?: string;
    anotherDetails?: string;
    images: ITextileImages[];
}

export interface ITextile{
    productId?: number;
    manufacturer: string;
    textileName: string;
    types: string;
    numberOfShades?: string;
    antiClaw?: string;
    waterRepellent?: string;
    easyToCare?: string;
    durability?: string;
    anotherDetails?: string;
}

export interface ITextileImages extends ICommonFields{
    image: string;
    textileId: number;
}
