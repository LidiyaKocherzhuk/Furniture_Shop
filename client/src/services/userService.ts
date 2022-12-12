import { axiosService } from './axiosService';
import { urls } from '../config';
import { IUser } from '../interfaces';

export const userService = {
    getAll: (limit: number) => axiosService.get(`${urls.USERS}`, { data: { limit } }).then(),

    getUser: (id: number) => axiosService.get(`${urls.USERS}/${id}`).then(),

    update: (id: number, data: Partial<IUser>) =>
        axiosService.post(`${urls.USERS}/${id}`, data).then(),

    delete: (id: number) => axiosService.delete(`${urls.USERS}/${id}`).then(),
}
