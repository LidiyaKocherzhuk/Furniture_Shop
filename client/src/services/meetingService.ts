import { axiosService } from './axiosService';
import { IMeeting } from '../interfaces/meetingInterface';
import { urls } from '../config';

export const meetingService = {
    save: (data: IMeeting) => axiosService.post(urls.MEETING, data).then(),
    getAll: () => axiosService.get(urls.MEETING).then(),
};
