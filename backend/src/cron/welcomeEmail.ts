import cron from 'node-cron';

import { userRepository } from '../repositiries';
import { IUserExtends } from '../entity';
import { emailService } from '../services/emailService';
import { EmailActionEnum } from '../config/enums';

export const CronWelcomeEmail = () => {
    cron.schedule('*/10 * * * * *', async () => {
        const newUsers = await userRepository.getNewUsers();

        const sendWelcomeMail = newUsers.map((user: IUserExtends) => emailService.sendMail(
            user.email,
            EmailActionEnum.WELCOME,
            { email: user.email },
        ));
        await Promise.all(sendWelcomeMail);
    });
};
