import { IUser, IUserExtends } from './userInteface';

export interface IToken {
    userId: number;
    role: string;
    accessToken: string;
    refreshToken: string;
    user: IUserExtends;
    confirmCode: number;
}
