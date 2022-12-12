import { axiosService } from './axiosService';
import { urls } from '../config';

export const madeOfService = {
    save: (data: {material:string}) => axiosService.post(urls.PRODUCT_MATERIAL, data)
        .then(),
    getAll: () => axiosService.get(urls.PRODUCT_MATERIAL)
        .then(),
}
