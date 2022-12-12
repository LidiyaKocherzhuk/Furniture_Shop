import { urls } from '../config';
import { axiosService } from './axiosService';
import { IImage } from '../interfaces';

export const imagesService = {

    getAll: () => axiosService.get(urls.IMAGES).then(),

    save: (data: FormData) => axiosService({
        method: 'post',
        url: urls.IMAGES,
        data: data,
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(),

    getByParams: (data: Partial<IImage>) => axiosService.post(urls.IMAGES + '/params', data).then(),

    update: (data: FormData) => axiosService({
        method: 'patch',
        url: urls.IMAGES,
        data: data,
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(),

}
