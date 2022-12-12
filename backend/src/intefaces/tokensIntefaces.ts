import { IUserExtends } from '../entity';

export interface IUserPayload {
    id: number;
    email: string;
    role: string;
}

export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
    userId: number;
    role: string,
}

export interface IVerifyToken {
    token: string;
    type: string;
}

export interface ITokenData {
    user: IUserExtends
}
