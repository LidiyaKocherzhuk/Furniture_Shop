import Joi from 'joi';

export const textileValidator = {
    save: Joi.object({
        productId: Joi.number()
            .integer(),

        manufacturer: Joi.string()
            .required()
            .max(250)
            .min(2),

        textileName: Joi.string()
            .required()
            .max(250)
            .min(2),

        types: Joi.string()
            .required()
            .max(250)
            .min(2),

        numberOfShades: Joi.string()
            .allow('')
            .max(250)
            .min(2),

        antiClaw: Joi.string()
            .allow('')
            .max(250)
            .min(2),

        waterRepellent: Joi.string()
            .allow('')
            .max(250)
            .min(2),

        easyToCare: Joi.string()
            .allow('')
            .max(250)
            .min(2),

        durability: Joi.string()
            .allow('')
            .max(250)
            .min(2),

        anotherDetails: Joi.string()
            .allow('')
            .max(250)
            .min(2),
    }),

    checkParams: Joi.object({
        id: Joi.number()
            .integer(),

        productId: Joi.number()
            .integer(),

        manufacturer: Joi.string()
            .allow('')
            .max(250)
            .min(2),

        textileName: Joi.string()
            .allow('')
            .max(250)
            .min(2),

        types: Joi.string()
            .allow('')
            .max(250)
            .min(2),

        numberOfShades: Joi.number()
            .integer(),

        antiClaw: Joi.string()
            .allow('')
            .max(250)
            .min(2),

        waterRepellent: Joi.string()
            .allow('')
            .max(250)
            .min(2),

        easyToCare: Joi.string()
            .allow('')
            .max(250)
            .min(2),

        durability: Joi.string()
            .allow('')
            .max(250)
            .min(2),

        anotherDetails: Joi.string()
            .allow('')
            .max(250)
            .min(2),

    }),

};
