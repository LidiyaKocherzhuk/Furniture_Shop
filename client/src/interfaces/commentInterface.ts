import { ICommonFields } from './commonFieldsEntity';

export interface ICommentExtends extends ICommonFields {
    userId: number;
    message: string;
    username: string;
    surname: string;
    image: string;
    productId: number;
    product_model: string;
    product_type: string;
    product_image: string;
}

export interface IComment {
    userId: number;
    message: string;
    username: string;
    surname: string;
    image: string;
    productId: number;
    product_model: string;
    product_type: string;
    product_image: string;
}
