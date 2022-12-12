import { Router } from 'express';

import { meetingController } from '../controllers';
import { meetingMiddleware } from '../middlewares';

export const meetingRouter = Router();

meetingRouter.post('', meetingMiddleware.isValidSaveBody, meetingController.saveMeeting);
meetingRouter.get('', meetingController.getAll);
