import Joi from 'joi';

export const basketValidator = {
    save: Joi.object({
        userId: Joi.number()
            .integer()
            .required(),

        productId: Joi.number()
            .integer()
            .required(),

        productCount: Joi.number()
            .integer()
            .required(),

        productCountPrice: Joi.number()
            .integer()
            .required(),
        ordered: Joi.string()
            .allow('')
            .max(250)
            .trim(),

    }),

    update: Joi.object({
        userId: Joi.number()
            .integer(),
        productId: Joi.number()
            .integer(),
        productCount: Joi.number()
            .integer(),
        productCountPrice: Joi.number()
            .integer(),
        ordered: Joi.string()
            .max(250)
            .allow(''),
    }),
};
