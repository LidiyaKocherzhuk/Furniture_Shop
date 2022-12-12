import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { emailService } from '../services';
import { EmailActionEnum } from '../config/enums';
import { meetingRepository } from '../repositiries';

class MeetingController {
    async saveMeeting(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {
                userName,
                userSurname,
                meetingMessage,
                userPhone,
                userEmail,
            } = req.body;

            await emailService.getMeetingMail(EmailActionEnum.MEETING, {
                userName,
                userSurname,
                meetingMessage,
                userPhone,
                userEmail,
            });

            await meetingRepository.save(req.body);
        } catch (e) {
            next(e);
        }
    }

    async getAll(
        req: IRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const meetings = await meetingRepository.getAll();

            res.json(meetings);
        } catch (e) {
            next(e);
        }
    }
}

export const meetingController = new MeetingController();
