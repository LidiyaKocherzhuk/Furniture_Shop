import { axiosService } from './axiosService';
import { urls } from '../config';
import { IIsLike } from '../interfaces/isLikeInterface';

export const isLikeService = {
    save: (data: IIsLike) => axiosService.post(urls.IS_LIKE, data).then(),
    delete: (data: Partial<IIsLike>) => axiosService.post(urls.IS_LIKE +'/delete', data),
}
