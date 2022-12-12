import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';

import {
    IProduct,
    ITextile,
    IUser,
    IUserExtends,
} from '../entity';
import { IVerifyToken } from './tokensIntefaces';

export interface IRequest extends Request {
    userBody?: IUser;
    user?: IUserExtends;
    role?: string;
    verifyToken?: IVerifyToken;
    product?: IProduct;
    updateProduct?: Partial<IProduct>;
    image?: UploadedFile[];
    textile?: ITextile;
}
