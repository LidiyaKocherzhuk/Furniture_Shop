import { ICommonFields } from './commonFieldsEntity';

export interface IImage extends ICommonFields {
    image: string;
    location?:string;
    description?: string;
}
