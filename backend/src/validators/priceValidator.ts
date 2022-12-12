import Joi from 'joi';

export const priceValidator = {
    save: Joi.object({
        size140_200: Joi.string()
            .max(250)
            .allow(''),

        size160_200: Joi.string()
            .max(250)
            .allow(''),

        size180_200: Joi.string()
            .max(250)
            .allow(''),

        size200_200: Joi.string()
            .max(250)
            .allow(''),

        bedId: Joi.number()
            .required(),
    }),

    update: Joi.object({
        size140_200: Joi.string()
            .max(250)
            .allow(''),

        size160_200: Joi.string()
            .max(250)
            .allow(''),

        size180_200: Joi.string()
            .max(250)
            .allow(''),

        size200_200: Joi.string()
            .max(250)
            .allow(''),

        bedId: Joi.number(),
    }),
};
