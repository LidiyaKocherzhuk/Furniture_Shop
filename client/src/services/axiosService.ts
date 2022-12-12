import axios from 'axios';
import { createBrowserHistory } from 'history'

import { urls } from '../config';
import { authService } from './authService';
// import { useAppDispatch } from '../hooks';

export const history = createBrowserHistory();

export const axiosApi = axios.create({
    baseURL: urls.BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:80',
    }, });
const axiosService = axios.create({
    baseURL: urls.BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:80',
    },
});

axiosService.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    }
    return config;
});

axiosService.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401 && !error.config._isRetry) {
        originalRequest._isRetry = true;

        try {
            const response = await authService.refresh({
                refreshToken: localStorage.getItem('refreshToken')
            });

            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            originalRequest._isRetry = false;
            return axiosService.request(originalRequest);

        } catch (e) {
            localStorage.clear();
            originalRequest._isRetry = false;
            history.replace('/logIn');
            throw new Error('Користувач не авторизований!!')
        }

    }
    // localStorage.clear();
    // history.replace('/logIn');
    return Promise.reject(error);
});

export {
    axiosService,
};
