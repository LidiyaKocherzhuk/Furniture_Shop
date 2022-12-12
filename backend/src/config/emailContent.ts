import { EmailActionEnum } from './enums';

export const emailContent = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Soft.Life.Lviv',
        templateName: 'welcome',
    },
    [EmailActionEnum.CONFIRM]: {
        subject: 'Soft.Life.Lviv',
        templateName: 'confirmationEmail',
    },
    [EmailActionEnum.FORGOT_PASSWORD]: {
        subject: 'Soft.Life.Lviv',
        templateName: 'forgotPassword',
    },
    [EmailActionEnum.MEETING]: {
        subject: 'Soft.Life.Lviv',
        templateName: 'meeting',
    },
};
