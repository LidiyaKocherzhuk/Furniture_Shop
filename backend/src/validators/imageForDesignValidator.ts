import Joi from 'joi';

export const imageForDesignValidator = {
    save: Joi.object({
        location: Joi.string()
            .trim()
            .allow('')
            .min(2)
            .max(250),

        description: Joi.string()
            .trim()
            .allow('')
            .min(2)
            .max(2500),
    }),

    getByParams: Joi.object({
        id: Joi.number(),

        location: Joi.string()
            .trim()
            .allow('')
            .min(2)
            .max(250),

        description: Joi.string()
            .trim()
            .allow('')
            .min(2)
            .max(2500),
    }),

    update: Joi.object({
        id: Joi.number(),

        image: Joi.string()
            .max(250),

        location: Joi.string()
            .trim()
            .allow('')
            .min(2)
            .max(250),

        description: Joi.string()
            .trim()
            .allow('')
            .min(2)
            .max(2500),
    }),
};
