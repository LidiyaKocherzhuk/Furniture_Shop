import Joi from 'joi';

export const ProductValidator = Joi.object({
    model: Joi.string()
        .required()
        .trim()
        .max(250),

    slats: Joi.string()
        .allow('')
        .trim()
        .max(250),

    decor: Joi.string()
        .allow('')
        .trim()
        .max(250),

    price: Joi.number()
        .integer()
        .required()
        .min(1),

    headboardHeight: Joi.number()
        .allow(''),

    sidewallsHeight: Joi.number()
        .allow(''),

    dimensionsOfTheProduct: Joi.string()
        .allow('')
        .trim()
        .max(250),

    legs: Joi.string()
        .allow('')
        .trim()
        .max(250),

    mechanism: Joi.boolean(),

    isNovelty: Joi.boolean(),

    isPopular: Joi.boolean(),

    anotherDetails: Joi.string()
        .allow('')
        .trim()
        .max(250),

});

export const ProductUpdateValidator = Joi.object({
    model: Joi.string()
        .allow('')
        .trim()
        .max(250),

    slats: Joi.string()
        .forbidden()
        .trim()
        .max(250),

    decor: Joi.string()
        .allow('')
        .trim()
        .max(250),

    price: Joi.number()
        .integer()
        .allow('')
        .min(1),

    headboardHeight: Joi.number()
        .allow(''),

    sidewallsHeight: Joi.number()
        .allow(''),

    dimensionsOfTheProduct: Joi.string()
        .allow('')
        .trim()
        .max(250),

    legs: Joi.string()
        .allow('')
        .trim()
        .max(250),

    mechanism: Joi.boolean(),

    isNovelty: Joi.boolean(),

    isPopular: Joi.boolean(),

    anotherDetails: Joi.string()
        .allow('')
        .trim()
        .max(250),

});
