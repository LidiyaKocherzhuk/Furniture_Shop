import nodemailer, { SentMessageInfo } from 'nodemailer';
import EmailTemplate from 'email-templates';
import path from 'path';

import { config } from '../config';
import { EmailActionEnum } from '../config/enums';
import { emailContent } from '../config/emailContent';

class EmailService {
    templateRenderer = new EmailTemplate({
        views: {
            // @ts-ignore
            root: path.join(__dirname, '../', 'emailTemplates'),
        },
    });

    async sendMail(
        userEmail: string | undefined,
        action: EmailActionEnum | undefined,
        context: {},
    ): Promise<SentMessageInfo> {
        try {
            // @ts-ignore
            const { subject, templateName } = await emailContent[action];

            Object.assign(context);
            const html = await this.templateRenderer.render(templateName, context);

            const emailTransporter = nodemailer.createTransport({
                from: 'User',
                service: 'gmail',
                auth: {
                    user: config.GOOGLE_APPLICATION_EMAIL,
                    pass: config.GOOGLE_APPLICATION_PASSWORD,
                },
            });

            return emailTransporter.sendMail({
                to: userEmail,
                subject,
                html,
            });
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async getMeetingMail(
        action: EmailActionEnum | undefined,
        context: {},
    ): Promise<SentMessageInfo> {
        try {
            console.log('54', action, context);
            // @ts-ignore
            const { subject, templateName } = await emailContent[action];

            Object.assign(context);
            const html = await this.templateRenderer.render(templateName, context);

            const emailTransporter = nodemailer.createTransport({
                from: 'User',
                service: 'gmail',
                auth: {
                    user: config.GOOGLE_APPLICATION_EMAIL,
                    pass: config.GOOGLE_APPLICATION_PASSWORD,
                },
            });

            return emailTransporter.sendMail({
                to: config.GOOGLE_APPLICATION_EMAIL,
                subject,
                html,
            });
        } catch (e) {
            console.log('email75', e);
            return e;
        }
    }
}

export const emailService = new EmailService();
