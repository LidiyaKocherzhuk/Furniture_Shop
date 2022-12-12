import Joi from 'joi';

export const paramsValidator = {
    checkOneId: Joi.object({
        id: Joi.string()
            .required(),
    }),

    checkMoreId: Joi.object({
        id: Joi.string()
            .required(),
        userId: Joi.string()
            .required(),
    }),

    checkLimit: Joi.object({
        limit: Joi.string()
            .required(),
    }),
};
