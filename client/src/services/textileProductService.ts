import { axiosService } from './axiosService';
import { urls } from '../config';

export const textileProductService = {
    save: (data: {textiles: number[], productId: number}) => axiosService.post(urls.PRODUCT_TEXTILE, data).then(),
    update: (productId: number, data: object) => axiosService.patch(`${urls.PRODUCT_TEXTILE}/${productId}`, data).then(),
};
