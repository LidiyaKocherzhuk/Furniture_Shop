import { IMeeting, MeetingEntity } from '../../entity';

export interface IMeetingRepo {
    save(meetingData: IMeeting): Promise<MeetingEntity>;
    getAll(): Promise<MeetingEntity[]>;
}
