import { urls } from '../config';
import { axiosService } from './axiosService';
import { IBedPriceToDB, IProduct, IProductLimit, ISortProduct } from '../interfaces';

export const productsService = {
    save: (data: FormData) => axiosService({
        method: 'post',
        url: urls.PRODUCTS,
        data: data,
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(),

    saveBedPrice: (data: IBedPriceToDB) => axiosService.post(urls.BED_PRICE, data).then(),

    getAll: (limit: number) => axiosService.get(urls.PRODUCTS + '/limit' + limit).then(),

    getByParams: (params: Partial<IProductLimit>) => axiosService.post(
        urls.PRODUCTS + '/params',
        params,
    ).then(),

    getById: (id: number) => axiosService.get(`${urls.PRODUCTS}/${id}`).then(),

    filterByParams: (params: Partial<IProductLimit>) =>
        axiosService.post(urls.PRODUCTS + '/filter', params).then(),

    sortByParams: (params: ISortProduct) =>
        axiosService.post(urls.PRODUCTS + '/sort', params).then(),

    getBaskets: (id:number) =>
        axiosService.post(urls.PRODUCTS + '/basket/' + id).then(),

    getOrdered: (id:number) =>
        axiosService.post(urls.PRODUCTS + '/ordered/' + id).then(),

    getLikes: (id:number) =>
        axiosService.post(urls.PRODUCTS + '/likes/' + id).then(),

    updateById: (id:number, userId: number, updateData: Partial<IProduct>) =>
        axiosService.patch(urls.PRODUCTS + '/update/' + id + '/' + userId, updateData).then(),

    updateBedPrice: (priceId: number, userId: number, data: object) =>
        axiosService.patch(urls.BED_PRICE + '/' +priceId + '/' + userId, data).then(),

    updateImages: (productId: number, userId: number, data: FormData) =>
        axiosService.patch(urls.PRODUCT_IMAGES + '/' + productId + '/' + userId, data).then(),

    deleteById: (id:number, userId:number) =>
        axiosService.delete(urls.PRODUCTS + '/' + id + '/' + userId).then(),

    deleteImage: (id: number, userId: number) =>
        axiosService.delete(urls.PRODUCT_IMAGES + '/' + id + '/' + userId ).then(),

}
