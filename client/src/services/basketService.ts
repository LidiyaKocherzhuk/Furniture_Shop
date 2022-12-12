import { axiosService } from './axiosService';
import { urls } from '../config';
import { IBasket } from '../interfaces';

export const basketService= {
    save: (data: IBasket) => axiosService.post(urls.BASKET, data)
        .then(),
    update: (data: Partial<IBasket>, id: number) => axiosService.patch(urls.BASKET + '/' + id, data)
        .then(),
    delete: (id: number, userId:number) =>
        axiosService.post(urls.BASKET + '/' + id + '/' + userId)
            .then(),
}
