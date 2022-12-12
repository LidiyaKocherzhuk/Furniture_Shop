import { axiosApi, axiosService } from './axiosService';
import { urls } from '../config';
import { IRestoreResponse, IToken, IUserLogin } from '../interfaces';

export const authService = {
    registration: (data: FormData)=> axiosService.post<IToken>(`${urls.AUTH}/registration`, data).then(),
    logIn: (data:IUserLogin) => axiosService.post<IToken>(`${urls.AUTH}/login`, data).then(),
    logOut: (userId: number) => axiosService.delete<void>(`${urls.AUTH}/logOut/${userId}`).then(),
    refresh: (data: {refreshToken: string | null}) => axiosApi.post<IToken>(`${urls.AUTH}/refresh`, data).then(),
    forgotPassword: (data: {email: string}) => axiosApi.post<IRestoreResponse>(`${urls.AUTH}/forgotPassword`, data).then(),
}
