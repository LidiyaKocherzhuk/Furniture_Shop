import { getManager } from 'typeorm';

import { IMeeting, MeetingEntity } from '../../entity';
import { IMeetingRepo } from './meetingRepoInterface';

class MeetingRepository implements IMeetingRepo {
    save(meetingData: IMeeting): Promise<MeetingEntity> {
        return getManager()
            .getRepository(MeetingEntity)
            .save(meetingData);
    }

    getAll(): Promise<MeetingEntity[]> {
        return getManager()
            .getRepository(MeetingEntity)
            .find();
    }
}

export const meetingRepository = new MeetingRepository();
