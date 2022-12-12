import { axiosService } from './axiosService';
import { urls } from '../config';
import { IOrdered } from '../interfaces/orderedtInterface';

export const orderedService= {
    save: (data: IOrdered) => axiosService.post(urls.ORDERED, data)
        .then(),
    delete: (id: number, userId: number) =>
        axiosService.post(urls.ORDERED + '/' + id + '/' + userId)
            .then(),
}
