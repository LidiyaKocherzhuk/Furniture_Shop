import {
    Column, Entity, JoinTable, ManyToOne,
} from 'typeorm';

import { config } from '../config';
import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';
import { UserEntity } from './userEntity';

interface IMeetingExtends extends ICommonFields{
    userId:number;
    productId:number;
    isViewed:boolean;
    userPhone:string;
    meetingMessage:string;
    userEmail:string;
    userName:string;
    userSurname:string;
}

export interface IMeeting{
    userId:number;
    productId:number;
    isViewed:boolean;
    userPhone:string;
    meetingMessage:string;
    userEmail:string;
    userName:string;
    userSurname:string;
}

@Entity('meeting', { database: config.DATABASE_NAME })
export class MeetingEntity extends CommonFieldsEntity implements IMeetingExtends {
    @Column({
        type: 'int',
        nullable: false,
    })
        userId:number;

   @Column({
       type: 'int',
       nullable: false,
   })
       productId:number;

   @Column({
       type: 'boolean',
       default: false,
       nullable: false,
   })
       isViewed:boolean;

   @Column({
       type: 'varchar',
       nullable: false,
   })
       userPhone:string;

   @Column({
       type: 'varchar',
       nullable: false,
   })
       userEmail:string;

   @Column({
       type: 'varchar',
       nullable: false,
   })
       userName:string;

   @Column({
       type: 'varchar',
       nullable: false,
   })
       userSurname:string;

   @Column({
       type: 'varchar',
       nullable: false,
   })
       meetingMessage:string;

    @ManyToOne(
        () => UserEntity,
        (user) => user.meetings,
        { onDelete: 'CASCADE' },
    )
    @JoinTable({ name: 'userId' })
        user: UserEntity;
}
