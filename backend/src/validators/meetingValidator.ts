import Joi from 'joi';

export const meetingValidator = {
    save: Joi.object({
        userId: Joi.number()
            .required(),

        productId: Joi.number()
            .required(),

        isViewed: Joi.boolean()
            .required(),

        userPhone: Joi.string()
            .required(),

        meetingMessage: Joi.string()
            .required(),

        userEmail: Joi.string()
            .required(),

        userName: Joi.string()
            .required(),

        userSurname: Joi.string()
            .allow(''),
    }),
};
