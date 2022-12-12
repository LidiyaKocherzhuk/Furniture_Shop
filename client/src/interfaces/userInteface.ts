import { ICommonFields } from './commonFieldsEntity';
import { IBasketExtends } from './basketInterface';
import { IIsLikeExtends } from './isLikeInterface';
import { IMeetingExtends } from './meetingInterface';
import { ICommentExtends } from './commentInterface';
import { IOrderedExtends } from './orderedtInterface';

export interface IUserExtends extends ICommonFields{
    username: string;
    surname?: string;
    email: string;
    password: string;
    phone?: string;
    age?: number;
    city?: string;
    image?: string;
    role: string;
    basket: IBasketExtends[];
    ordered: IOrderedExtends[];
    likes: IIsLikeExtends[];
    meetings: IMeetingExtends[];
    comments: ICommentExtends[];
}

export interface IUser {
    username: string;
    surname?: string;
    email: string;
    password: string;
    phone?: string;
    age?: number;
    city?: string;
    image?: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserWithToken extends IUserExtends{
    tokenPair: {
        accessToken: string;
        refreshToken: string;
    }
}
export interface IUserFromStorage {
    id: number,
    basket: IBasketExtends[],
    ordered?: IOrderedExtends[],
    likes: IIsLikeExtends[],
}

export interface IUserFromStorage2 {
    id: number,
    username: string,
    surname: string,
    email: string,
}

export interface IRestoreResponse {
    user: IUserExtends;
    confirmCode: number;
}
