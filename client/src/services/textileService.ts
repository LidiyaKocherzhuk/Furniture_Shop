import { axiosService } from './axiosService';
import { urls } from '../config';
import { ITextileExtends } from '../interfaces';

export const textileService = {
    save: (data: FormData) => axiosService.post(urls.TEXTILE, data)
        .then(),

    getAll: () => axiosService.get(urls.TEXTILE)
        .then(),

    getByParams: (data: Partial<ITextileExtends>) =>
        axiosService.post(urls.TEXTILE + '/getByParams', data)
            .then(),

    update: (id: number, userId: number, data: Partial<ITextileExtends>) =>
        axiosService.patch(`${urls.TEXTILE}/${id}/${userId}`, data)
            .then(),

    updateImages: (textileId: number, userId: number, data: FormData) =>
        axiosService.post(urls.TEXTILE_IMAGES + '/' + textileId + '/' + userId, data).then(),

    delete: (id: number, userId: number) =>
        axiosService.delete(`${urls.TEXTILE}/${id}/${userId}`)
            .then(),

    deleteImage: (id: number, userId: number) =>
        axiosService.delete(urls.TEXTILE_IMAGES + '/' + id + '/' + userId ).then(),
}
