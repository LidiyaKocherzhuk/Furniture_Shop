import { ICommonFields } from './commonFieldsEntity';

export interface IMeetingExtends extends ICommonFields{
    userId:number;
    productId:number;
    isViewed:boolean;
    userPhone:string;
    meetingMessage:string;
    userEmail:string;
    userName:string;
    userSurname:string;
}

export interface IMeeting {
    userId:number;
    productId:number;
    isViewed:boolean;
    userPhone:string;
    meetingMessage:string;
    userEmail:string;
    userName:string;
    userSurname:string;
}
