import Joi from 'joi';

export const TextileValidator = Joi.object({
    manufacturer: Joi.string()
        .required()
        .trim()
        .messages({
            'string.empty': 'Це поле повинно бути заповнене!',
        }),

    textileName: Joi.string()
        .required()
        .trim()
        .messages({
            'string.empty': 'Це поле повинно бути заповнене!',
        }),

    types: Joi.string()
        .required()
        .trim()
        .messages({
            'string.empty': 'Це поле повинно бути заповнене!',
        }),

    numberOfShades: Joi.string()
        .allow('')
        .trim(),

    antiClaw: Joi.boolean()
        .allow(''),

    waterRepellent: Joi.boolean()
        .allow(''),

    easyToCare: Joi.boolean()
        .allow(''),

    durability: Joi.string()
        .allow('')
        .trim(),

    anotherDetails: Joi.string()
        .allow('')
        .trim(),

});
